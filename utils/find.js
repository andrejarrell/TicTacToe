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
            let index = rooms.indexOf(socket.id);
            rooms.splice(index, 1);
            return rooms[0];
        } else {
            return null;
        };
    }
}