module.exports = data => {
    let { find, socket, cache, io } = data;
    let room = find.room(socket, cache);
    if (room) {
        let game = cache.get(room);
        let { host, guest } = game;
        if (socket.id === guest.id) {
            io.to(host.id).emit('players', 1);
            io.to(host.id).emit('message', 'warning', 'Guest left game!');
            cache.remove(room);
        } else {
            io.to(guest.id).emit('players', 1);
            io.to(guest.id).emit('message', 'warning', 'Host left game!');
            cache.remove(room);
        };
    };
};