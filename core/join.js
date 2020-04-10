module.exports = (data, room) => {
    let { cache, socket, io, find, cap } = data;
    let game = cache.get(room);
    if (game && socket.id !== game.host.id) {
        let oldRoom = find.oldRoom(socket);
        socket.join(room);
        socket.emit('clear');
        io.to(room).emit('message', 'success', 'Both players are ready! Host starts!');
        io.to(room).emit('players', 2);
        socket.emit('room', room);
        socket.emit('user', cap('guest'));
        game.guest.id = socket.id;
        game.ready = true;
        game.host.turn = true;
        cache.set(room, game);
        socket.leave(oldRoom);
    } else {
        socket.emit('message', 'warning', 'Invalid code!');
    };
};