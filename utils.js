let wins = [
    ['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
]

module.exports = {
    cap(string) {
        let array = string.split('')
        array[0] = string[0].toUpperCase()
        return array.join('')
    },

    keyGen() {
        let entries = [];
        let combos = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
        for (x = 0; x < 5; x++) {
            let random = Math.floor(Math.random() * combos.length)
            entries.push(combos[random].toString())
        }
        return entries.join('')
    },

    find(socket, cache) {
        let key;
        if (cache.size) {
            cache.forEach(game => {
                if (game.host.id === socket.id || 
                    game.guest.id === socket.id) {
                        key = cache.get(game.key)
                    }
            })
        }
        return key ?? null
    },

    check: {
        tie(game) {
            let plays = [...game.host.moves, ...game.guest.moves]
            return plays.length === 9 || false
        },

        win(game, player) {
            for (let combo of wins) {
                let moves = game[player].moves
                let matches = moves.filter(position => {
                    return combo.includes(position)
                });
                if (matches.length === 3) return true
            };
            return false
        },

        move(game, position) {
            let moves = [...game.host.moves, ...game.guest.moves]
            return moves.includes(position) || false
        },
    },

    end(key, io, cache) {
        let game = cache.get(key)
        io.to(game.host.id).emit('end')
        game.ready = false
        cache.set(game.key, game)
    }
}