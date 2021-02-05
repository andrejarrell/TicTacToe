let run = ({ socket, utils, cache }) => {
    let key = utils.keyGen()
    socket.emit('clear')
    socket.emit('create', key)
    socket.emit('players', 1)
    socket.emit('key', key)
    socket.emit('user', 'Host')
    let oldRoom = [...socket.rooms]
        .filter(room => room !== socket.id)
    socket.leave(oldRoom)
    socket.join(key)
    cache.set(key, {
        key,
        ready: false,
        host: {
            turn: true,
            id: socket.id,
            moves: []
        },
        guest: {
            id: null,
            moves: []
        }
    })
    cache.delete(oldRoom)
}

module.exports = {
    run, name: 'create'
}