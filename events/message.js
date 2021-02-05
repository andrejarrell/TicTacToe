let run = ({ socket, io, utils, cache, data: message }) => {
    let game = utils.find(socket, cache)
    if (game) {
        let user = socket.id === game.host.id ? 'Host' : 'Guest'
        io.to(game.key).emit('message', user, message)
    }
}

module.exports = {
    run, name: 'message'
}