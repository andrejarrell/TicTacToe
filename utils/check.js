module.exports = {
    play: (game, position) => {
        let plays = [...game.host.plays, ...game.guest.plays];
        return plays.includes(position) || false;
    },
    win: (game, player) => {
        let wins = [
            ['a1', 'a2', 'a3'], ['b1', 'b2', 'b3'],
            ['c1', 'c2', 'c3'], ['a1', 'b1', 'c1'],
            ['a2', 'b2', 'c2'], ['a3', 'b3', 'c3'],
            ['a1', 'b2', 'c3'], ['a3', 'b2', 'c1']
        ];
        for (let combo of wins) {
            let plays = game[player].plays;
            let matches = plays.filter(position => {
                return combo.includes(position);
            });
            if (matches.length === 3) return true;
        };
        return false;
    },
    tie: game => {
        let plays = [...game.host.plays, ...game.guest.plays];
        return plays.length === 9 || false;
    }
};