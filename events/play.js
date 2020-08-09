let _ = require('lodash');
let cache = require('../utils/cache');
let { find, check, end } = require('../utils/game');

module.exports = (socket, io, position) => {
    let game = find(socket);
    if (!game) return socket.emit('message', 'danger', 'Create or join a game!');
    if (!game.ready) return socket.emit('message', 'danger', 'Game is not ready!');
    let player = game.host.turn ? 'host' : 'guest';
    if (game[player].id !== socket.id) return socket.emit('message', 'danger', 'It\'s not your turn!');
    if (check.play(game, position)) return socket.emit('message', 'danger', 'That has already been played!');
    game[player].plays.push(position);
    game.host.turn = game.host.turn ? false : true;
    if (check.win(game, player)) {
        io.to(game.key).emit('play', position, player);
        io.to(game.key).emit('message', 'info', `${_.capitalize(player)} is the winner!`);
        end(game.key, io);
    } else if (check.tie(game)) {
        io.to(game.key).emit('play', position, player);
        socket.emit('message', 'info', 'It\'s a tie!');
        end(game.key, io);
    } else {
        io.to(game.key).emit('play', position, player);
        io.to(game.key).emit('message', 'info', `${_.capitalize(player)} played ${position}.`);
        cache.set(game.key, game);
    };
};