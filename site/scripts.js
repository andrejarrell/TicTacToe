let socket = io();

let join = () => socket.emit('join', prompt('Enter your room ID!'));
let create = () => socket.emit('create');
let play = position => socket.emit('play', position);

socket.on('members', number => $('#members').text(`👥 ${number}/2`));

socket.on('room', room => $('#room').text(`🔑 ${room}`));

socket.on('player', name => $('#player').text(`👤 ${name}`));

socket.on('play', (position, player) => {
    let picture = player === 'host' ? 'images/x.png' : 'images/o.png';
    $(`#${position}`).prepend(`<img class="picture" src="${picture}">`);
});

socket.on('message', (type, string) => {
    let emoji = type === 'success' ? '💬' : '⚠️';
    $('#message').attr('class', `alert alert-${type}`);
    $('#message').text(`${emoji} ${string}`);
});

socket.on('erase', () => $('.picture').remove());