let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/public'));

const wins = [
    ['a1', 'a2', 'a3'],
    ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'],
    ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'],
    ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'],
    ['a3', 'b2', 'c1']
];

const generateCode = () => {
    let entries = [];
    let combos = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
    for (let x = 0; x < 5; x++) {
        let random = combos[Math.floor(Math.random() * combos.length)];
        entries.push(random.toString());
    }
    return entries.join('');
};

io.on('connection', socket => {
    console.log('A user connected');

    socket.on('create', () => {
        let code = generateCode();
        socket.join(code);
        console.log(`Host joined room: ${code}`);
        io.to(code).emit('response', `Created game code: ${code}`);
        let rooms = Object.keys(socket.rooms);
        if (rooms.length > 1) {
            let oldRoom = rooms[rooms.length - 1];
            socket.leave(oldRoom);
            console.log(`Host left room: ${oldRoom}`);
        };
    });

    socket.on('join', code => {
        let rooms = Object.keys(socket.rooms);
        if (!rooms.includes(code)) {
            console.log(`Room doesn't exist: ${code}`);
        } else if (rooms.length > 1) {
            let oldRoom = rooms[rooms.length - 1];
            socket.leave(oldRoom);
            console.log(`Guest left room: ${oldRoom}`);
            socket.join(code);
            console.log(`Guest joined room: ${code}`);
        } else if (rooms.length === 1) {
            socket.join(code);
            console.log(`Guest joined room: ${code}`);
        };
    });

    socket.on('play', position => {
        //
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});
