module.exports = () => {
    let entries = [];
    let combos = [1, 2, 3, 4, 5, 'a', 'b', 'c', 'd', 'e'];
    for (let x = 0; x < 5; x++) {
        let random = combos[Math.floor(Math.random() * combos.length)];
         entries.push(random.toString());
    };
    return entries.join('');
};