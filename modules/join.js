module.exports = join = (data, io, socket, room) => {
    let game = data.game.find(room);
    if (game && socket.id !== game.host.id) {
        let oldRoom = Object.keys(socket.rooms)[0];
        socket.leave(oldRoom);
        socket.join(room);
        socket.emit('reset');
        io.to(room).emit('message', 'success', `Both players are ready! Host starts!`);
        io.to(room).emit('total', 2);
        socket.emit('room', room);
        socket.emit('player', 'guest');
        game.guest.id = socket.id;
        game.ready = true;
        game.host.turn = true;
    } else {
        socket.emit('message', 'warning', 'Invalid code!');
    };
};