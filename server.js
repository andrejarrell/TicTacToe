let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/site'));

const wins = [
    ['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
];

let check = {
    redundancy: (data, position) => {
        let plays = data.host.plays.concat(data.guest.plays);
        return plays.includes(position) ? true : false;
    },
    winner: (data, player) => {
        for (let combo of wins) {
            let plays = data[player].plays;
            matches = [];
            for (let position of plays) {
                if (combo.includes(position)) matches.push(position);
            };
            if (matches.length === 3) return true;
        }
        return false;
    },
    tie: data => {
        let plays = data.host.plays.concat(data.guest.plays);
        return plays.length === 9 ? true : false;
    }
};

let game = {
    data: {},
    generate: () => {
        let entries = [];
        let combos = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
        for (let x = 0; x < 5; x++) {
            let random = combos[Math.floor(Math.random() * combos.length)];
            entries.push(random.toString());
        };
        return entries.join('');
    },
    find: room => {
        let games = Object.keys(game.data);
        return games.includes(room) ? game.data[room] : null;
    },
    end: room => {
        delete game.data[room];
    }
};

let create = socket => {
    let room = game.generate();
    let oldRoom = Object.keys(socket.rooms)[0];
    socket.leave(oldRoom);
    socket.join(room);
    socket.emit('erase');
    socket.emit('message', 'success', `Created game: ${room}`);
    socket.emit('members', 1);
    socket.emit('room', room);
    socket.emit('player', 'host');
    game.data[room] = {
        ready: false,
        host: {
            turn: false,
            id: socket.id,
            plays: []
        },
        guest: {
            id: null,
            plays: []
        }
    };
};

let join = (io, socket, room) => {
    var data = game.find(room);
    if (data && socket.id !== data.host.id) {
        let oldRoom = Object.keys(socket.rooms)[0];
        socket.leave(oldRoom);
        socket.join(room);
        socket.emit('erase');
        io.to(room).emit('message', 'success', `Both players are ready! Host starts!`);
        io.to(room).emit('members', 2);
        socket.emit('room', room);
        socket.emit('player', 'guest');
        data.guest.id = socket.id;
        data.ready = true;
        data.host.turn = true;
    } else {
        socket.emit('message', 'warning', 'Invalid code!');
    };
};

let play = (io, socket, position) => {
    let room = Object.keys(socket.rooms)[0];
    let data = game.find(room);
    if (!data) return socket.emit('message', 'warning', 'Create or join a game!');
    if (!data.ready) return socket.emit('message', 'warning', 'Waiting for guest to join!');
    let { host, guest } = data;
    if (host.turn) {
        if (host.id !== socket.id) return socket.emit('message', 'warning', 'It\'s not your turn!');
        if (check.redundancy(data, position)) return socket.emit('message', 'warning', 'That has already been played!');
        host.plays.push(position);
        host.turn = false;
        if (check.tie(data)) {
            io.to(room).emit('play', position, 'host');
            game.end(room);
            return socket.emit('message', 'warning', 'It\'s a tie!');
        };
        if (check.winner(data, 'host')) {
            io.to(room).emit('message', 'success', `Host is the winner!`);
            io.to(room).emit('play', position, 'host');
            game.end(room);
        } else {
            io.to(room).emit('play', position, 'host');
            io.to(room).emit('message', 'success', `Host played ${position}. Guest it\'s your turn!`);
        };
        console.log(data);
    } else {
        if (guest.id !== socket.id) return socket.emit('message', 'warning', 'It\'s not your turn!');
        if (check.redundancy(data, position)) return socket.emit('message', 'warning', 'That has already been played!');
        guest.plays.push(position);
        host.turn = true;
        if (check.winner(data, 'guest')) {
            io.to(room).emit('message', 'success', `Guest is the winner!`);
            io.to(room).emit('play', position, 'host');
            game.end(room);
        } else {
            io.to(room).emit('play', position, 'guest');
            io.to(room).emit('message', 'success', `Guest played ${position}. Host it\'s your turn!`);
        };
        console.log(data);
    };
};

io.on('connection', socket => {
    socket.on('create', () => create(socket));
    socket.on('join', room => join(io, socket, room));
    socket.on('play', position => play(io, socket, position))
});

http.listen(3000, () => console.log('listening on *:3000'));