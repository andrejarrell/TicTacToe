module.exports = {
    play: (game, position) => {
        let plays = [...game.host.plays, ...game.guest.plays];
        return plays.includes(position) || false;
    },
    win: (game, wins, player) => {
        for (let combo of wins) {
            let plays = game[player].plays;
            matches = [];
            for (let position of plays) {
                if (combo.includes(position)) matches.push(position);
            };
            if (matches.length === 3) return true;
        }
        return false;
    },
    tie: game => {
        let plays = [...game.host.plays, ...game.guest.plays];
        return plays.length === 9 || false;
    }
};