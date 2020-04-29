module.exports = {
    room: (socket, cache) => {
        let room;
        cache.each((value, key) => {
            if (value.host.id === socket.id) room = key;
            if (value.guest.id === socket.id) room = key;
        });
        return room;
    },
    oldRoom: socket => {
        let rooms = Object.keys(socket.rooms);
        if (rooms.length > 1) {
            return rooms.filter(r => r !== socket.id);
        } else {
            return null;
        };
    }
}