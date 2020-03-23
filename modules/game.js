module.exports = game = {
    cache: {},
    wins: [
        ['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'],
        ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'],
        ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'],
        ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
    ],
    code: () => {
        let entries = [];
        let combos = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
        for (let x = 0; x < 5; x++) {
            let random = combos[Math.floor(Math.random() * combos.length)];
            entries.push(random.toString());
        };
        return entries.join('');
    },
    find: room => {
        let games = Object.keys(game.cache);
        return games.includes(room) ? game.cache[room] : null;
    },
    end: room => delete game.cache[room]
};