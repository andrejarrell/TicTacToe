module.exports = (data, io, room) => {
    io.to(room).emit('clear');
    io.to(room).emit('rematch');
    let game = data.game.find(room);
    game.ready = true;
    io.to(room).emit('message', 'success', 'Rematch started!');
};