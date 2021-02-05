let run = ({ socket, io, cache, utils, data: position }) => {
    let game = utils.find(socket, cache)
    if (!game) return socket.emit('alert', 'danger', 'Create or join a game!')
    if (!game.ready) return socket.emit('alert', 'danger', 'Game is not ready!')
    let player = game.host.turn ? 'host' : 'guest'
    if (game[player].id !== socket.id) 
        return socket.emit('alert', 'danger', 'It\'s not your turn!')
    if (utils.check.move(game, position)) 
        return socket.emit('alert', 'danger', 'That has already been played!')
    game[player].moves.push(position)
    game.host.turn = game.host.turn ? false : true
    if (utils.check.win(game, player)) {
        io.to(game.key).emit('move', position, player)
        io.to(game.key).emit('alert', 'info', `${utils.cap(player)} is the winner!`)
        utils.end(game.key, io, cache)
    } else if (utils.check.tie(game)) {
        io.to(game.key).emit('move', position, player)
        socket.emit('alert', 'info', 'It\'s a tie!')
        utils.end(game.key, io, cache)
    } else {
        io.to(game.key).emit('move', position, player)
        io.to(game.key).emit('alert', 'info', `${utils.cap(player)} played ${position}.`)
        cache.set(game.key, game)
    }
}

module.exports = {
    run, name: 'move'
}