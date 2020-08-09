let { find } = require('../utils/game');

module.exports = (socket, io, message) => {
    let game = find(socket);
    if (game) {
        let user = socket.id === game.host.id ? 'Host' : 'Guest';
        io.to(game.key).emit('chat', user, message);
    }
};