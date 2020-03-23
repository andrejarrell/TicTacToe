let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use('/', express.static(__dirname + '/site'));

let data = {
    game: require('./modules/game.js'),
    join: require('./modules/join.js'),
    play: require('./modules/play.js'),
    check: require('./modules/check.js'),
    create: require('./modules/create.js')
};

io.on('connection', socket => {
    socket.on('create', () => data.create(data, socket));
    socket.on('join', room => data.join(data, io, socket, room));
    socket.on('play', position => data.play(data, io, socket, position));
});

http.listen(3000, () => console.log('listening on *:3000'));