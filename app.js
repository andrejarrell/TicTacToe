let express = require('express');
let app = express();
let http = require('http').createServer(app);
let io = require('socket.io')(http);
let fs = require('fs');

app.use('/', express.static(__dirname + '/site'));

io.on('connection', socket => {
    let data = {
        io: io,
        socket: socket,
        cache: require('store'),
        cap: require('capital-case').capitalCase
    };

    let utils = fs.readdirSync('./utils');
    let events = fs.readdirSync('./events');
    utils.forEach(file => data[file.slice(0, -3)] = require(`./utils/${file}`));
    events.forEach(file => data[file.slice(0, -3)] = require(`./events/${file}`));

    socket.on('create', () => data.create(data));
    socket.on('rematch', type => data.rematch(data, type));
    socket.on('join', room => data.join(data, room));
    socket.on('disconnect', () => data.disconnect(data));
    socket.on('play', position => data.play(data, position));
});

http.listen(3000, () => console.log('listening on *:3000'));