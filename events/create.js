module.exports = ({ generate, find, socket, cache, cap }) => {
    let room = generate();
    let oldRoom = find.oldRoom(socket);
    socket.join(room);
    socket.leave(oldRoom);
    socket.emit('clear');
    socket.emit('create', room);
    socket.emit('players', 1);
    socket.emit('room', room);
    socket.emit('user', cap('host'));
    cache.set(room, {
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
    });
    cache.remove(oldRoom);
    socket.leave(oldRoom);
};