module.exports = create = (data, socket) => {
    let room = data.game.code();
    let oldRoom = Object.keys(socket.rooms)[0];
    socket.leave(oldRoom);
    socket.join(room);
    socket.emit('reset');
    socket.emit('invite', room);
    socket.emit('total', 1);
    socket.emit('room', room);
    socket.emit('player', 'host');
    data.game.cache[room] = {
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