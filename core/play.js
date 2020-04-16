module.exports = ({ find, cache, socket, check, io, cap, end }, position) => {
    let room = find.room(socket, cache);
    let game = cache.get(room);
    if (!game) return socket.emit('message', 'warning', 'Create or join a game!');
    if (!game.ready) return socket.emit('message', 'warning', 'Game is not ready!');
    let player = game.host.turn ? 'host' : 'guest';
    if (game[player].id !== socket.id) return socket.emit('message', 'warning', 'It\'s not your turn!');
    if (check.play(game, position)) return socket.emit('message', 'warning', 'That has already been played!');
    game[player].plays.push(position);
    game.host.turn = game.host.turn ? false : true;
    if (check.win(game, player)) {
        io.to(room).emit('play', position, player);
        io.to(room).emit('message', 'success', `${cap(player)} is the winner!`);
        end(room, game, cache, io);
    } else if (check.tie(game)) {
        io.to(room).emit('play', position, player);
        socket.emit('message', 'warning', 'It\'s a tie!');
        end(room, game, cache, io);
    } else {
        io.to(room).emit('play', position, player);
        io.to(room).emit('message', 'success', `${cap(player)} played ${position}.`);
        cache.set(room, game);
    };
};