module.exports = (data, type) => {
    let { find, socket, cache, io } = data;
    let room = find.room(socket, cache);
    let game = cache.get(room);
    let { host, guest } = game;
    if (type === 'request') {
        if (game.ready) return;
        if (socket.id !== host.id) return;
        io.to(guest.id).emit('request');
        io.to(host.id).emit('message', 'success', 'Rematch request sent!');
        game.rematch = 'requested';
        cache.set(room, game);
    } else if (type === 'accept') {
        if (game.ready) return;
        if (socket.id !== guest.id) return;
        if (game.rematch !== 'requested') return;
        io.to(room).emit('clear');
        io.to(room).emit('message', 'success', 'Rematch started! Host starts!');
        host.turn = true;
        host.plays = [];
        guest.plays = [];
        game.ready = true;
        delete game.rematch;
        cache.set(room, game);
    };
};