module.exports = (data, io, socket, room, position) => {
    let game = data.game.find(room);
    if (!game) return socket.emit('message', 'warning', 'Create or join a game!');
    if (!game.ready) return socket.emit('message', 'warning', 'Game is not ready!');
    let { host, guest } = game;
    if (host.turn) {
        if (host.id !== socket.id) return socket.emit('message', 'warning', 'It\'s not your turn!');
        if (data.check.play(game, position)) return socket.emit('message', 'warning', 'That has already been played!');
        host.plays.push(position);
        host.turn = false;
        if (data.check.tie(game)) {
            io.to(room).emit('play', position, 'host');
            data.game.end(room);
            return socket.emit('message', 'warning', 'It\'s a tie!');
        };
        if (data.check.win(game, data.game.wins, 'host')) {
            io.to(room).emit('message', 'success', `Host is the winner!`);
            io.to(room).emit('play', position, 'host');
            data.game.end(room, io);
        } else {
            io.to(room).emit('play', position, 'host');
            io.to(room).emit('message', 'success', `Host played ${position}. Guest it\'s your turn!`);
        };
    } else {
        if (guest.id !== socket.id) return socket.emit('message', 'warning', 'It\'s not your turn!');
        if (data.check.play(game, position)) return socket.emit('message', 'warning', 'That has already been played!');
        guest.plays.push(position);
        host.turn = true;
        if (data.check.win(game, data.game.wins, 'guest')) {
            io.to(room).emit('message', 'success', `Guest is the winner!`);
            io.to(room).emit('play', position, 'guest');
            data.game.end(room, io);
        } else {
            io.to(room).emit('play', position, 'guest');
            io.to(room).emit('message', 'success', `Guest played ${position}. Host it\'s your turn!`);
        };
    };
};