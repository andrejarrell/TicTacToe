let express = require('express');

let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('./public'));

let join = require('./events/join');
let play = require('./events/play');
let create = require('./events/create');
let rematch = require('./events/rematch');
let disconnect = require('./events/disconnect');

io.on('connection', socket => {
    socket.on('create', () => create(socket));
    socket.on('join', key => join(socket, io, key));
    socket.on('play', position => play(socket, io, position));
    socket.on('rematch', type => rematch(socket, io, type));
    socket.on('disconnect', () => disconnect(socket, io));
});

http.listen(3000, () => console.log('listening on *:3000'));