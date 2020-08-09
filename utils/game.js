let _ = require('lodash');
let cache = require('./cache');

let wins = [
    ['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'],
    ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'],
    ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'],
    ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
];

module.exports = {
    keyGen() {
        let entries = [];
        let combos = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
        for (let x = 0; x < 5; x++) {
            let random = combos[Math.floor(Math.random() * combos.length)];
            entries.push(random.toString());
        }
        return entries.join('');
    },

    find(socket) {
        if (cache.all()) {
            let key = _.findKey(cache.all(), g => {
                return g.host.id === socket.id || g.guest.id === socket.id;
            })
            return cache.get(key);
        }
    },

    check: {
        tie(game) {
            let plays = [...game.host.plays, ...game.guest.plays];
            return plays.length === 9 || false;
        },

        win(game, player) {
            for (let combo of wins) {
                let plays = game[player].plays;
                let matches = plays.filter(position => {
                    return combo.includes(position);
                });
                if (matches.length === 3) return true;
            };
            return false;
        },

        play(game, position) {
            let plays = [...game.host.plays, ...game.guest.plays];
            return plays.includes(position) || false;
        },
    },

    end(key, io) {
        let game = cache.get(key);
        io.to(game.host.id).emit('end');
        game.ready = false;
        cache.set(game.key, game);
    }
}