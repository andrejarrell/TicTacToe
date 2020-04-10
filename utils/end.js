module.exports = (room, game, cache, io) => {
    io.to(game.host.id).emit('end');
    game.ready = false;
    cache.set(room, game);
};