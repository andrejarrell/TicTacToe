let _ = require('lodash');
let cache = require('../utils/cache');

module.exports = (socket, io, key) => {
    let game = cache.get(key);
    if (game && socket.id !== game.host.id) {
        let rooms = _.keys(socket.rooms);
        let oldRoom = rooms.filter(r => r !== socket.id);
        socket.join(key);
        socket.leave(oldRoom);
        socket.emit('clear');
        io.to(key).emit('message', 'info', 'Both players are ready! Host starts!');
        io.to(key).emit('players', 2);
        socket.emit('key', key);
        socket.emit('user', 'Guest');
        game.guest.id = socket.id;
        game.ready = true;
        cache.set(key, game);
    } else {
        socket.emit('message', 'danger', 'Invalid code!');
    };
};