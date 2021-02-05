let run = ({ socket, io, utils, cache }) => {
    let game = utils.find(socket, cache)
    if (game) {
        let { host, guest, key } = game
        if (socket.id === guest.id) {
            io.to(host.id).emit('players', 1)
            io.to(host.id).emit('alert', 'danger', 'Guest left game!')
            cache.delete(key)
        } else {
            io.to(guest.id).emit('players', 1)
            io.to(guest.id).emit('alert', 'danger', 'Host left game!')
            cache.delete(key)
        }
    }
}

module.exports = {
    run, name: 'disconnect'
}