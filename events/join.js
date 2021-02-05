let run = ({ socket, io, cache, data: key }) => {
    let game = cache.get(key)
    if (game && socket.id !== game.host.id) {
        let oldRoom = [...socket.rooms]
            .filter(room => room !== socket.id)
        socket.join(key)
        socket.leave(oldRoom)
        socket.emit('clear')
        io.to(key).emit('alert', 'info', 'Both players are ready! Host starts!')
        io.to(key).emit('players', 2)
        socket.emit('key', key)
        socket.emit('user', 'Guest')
        game.guest.id = socket.id
        game.ready = true
        cache.set(key, game)
    } else {
        socket.emit('alert', 'danger', 'Invalid code!')
    }
}

module.exports = {
    run, name: 'join'
}