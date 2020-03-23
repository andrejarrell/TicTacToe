module.exports = join = (data, io, socket, room) => {
    let info = data.game.find(room);
    if (info && socket.id !== info.host.id) {
        let oldRoom = Object.keys(socket.rooms)[0];
        socket.leave(oldRoom);
        socket.join(room);
        socket.emit('reset');
        io.to(room).emit('message', 'success', `Both players are ready! Host starts!`);
        io.to(room).emit('total', 2);
        socket.emit('room', room);
        socket.emit('player', 'guest');
        info.guest.id = socket.id;
        info.ready = true;
        info.host.turn = true;
    } else {
        socket.emit('message', 'warning', 'Invalid code!');
    };
};