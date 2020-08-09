let _ = require('lodash');
let cache = require('../utils/cache');
let { keyGen } = require('../utils/game');

module.exports = socket => {
    let key = keyGen();
    socket.emit('clear');
    socket.emit('create', key);
    socket.emit('players', 1);
    socket.emit('key', key);
    socket.emit('user', 'Host');
    let rooms = _.keys(socket.rooms);
    let oldRoom = rooms.filter(r => r !== socket.id);
    socket.leave(oldRoom);
    socket.join(key);
    cache.set(key, {
        key,
        ready: false,
        host: {
            turn: true,
            id: socket.id,
            plays: []
        },
        guest: {
            id: null,
            plays: []
        }
    });
    cache.delete(oldRoom);
};