let cache = require('../utils/cache');
let { find } = require('../utils/game');

module.exports = (socket, io, type) => {
    let game = find(socket);
    let { host, guest } = game;
    if (type === 'request') {
        if (game.ready) return;
        if (socket.id !== host.id) return;
        io.to(guest.id).emit('request');
        io.to(host.id).emit('alert', 'info', 'Rematch request sent!');
        game.rematch = 'requested';
        cache.set(game.key, game);
    } else if (type === 'accept') {
        if (game.ready) return;
        if (socket.id !== guest.id) return;
        if (game.rematch !== 'requested') return;
        io.to(game.key).emit('clear');
        io.to(game.key).emit('alert', 'info', 'Rematch started! Host starts!');
        host.turn = true;
        host.plays = [];
        guest.plays = [];
        game.ready = true;
        game.rematch = null;
        cache.set(game.key, game);
    };
};