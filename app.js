let express = require('express');

let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);

app.use(express.static('./public'));

let join = require('./events/join');
let chat = require('./events/chat');
let play = require('./events/play');
let create = require('./events/create');
let rematch = require('./events/rematch');
let disconnect = require('./events/disconnect');

io.on('connection', socket => {
    socket.on('create', () => create(socket));
    socket.on('join', key => join(socket, io, key));
    socket.on('disconnect', () => disconnect(socket, io));
    socket.on('rematch', type => rematch(socket, io, type));
    socket.on('chat', message => chat(socket, io, message));
    socket.on('play', position => play(socket, io, position));
});

http.listen(3000, () => console.log('listening on *:3000'));

process.on('unhandledRejection', e => console.log(e));
process.on('uncaughtException', e => console.log(e));