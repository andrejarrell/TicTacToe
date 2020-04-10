let socket = io();

let create = () => socket.emit('create');
let join = room => {
    clearQuery();
    socket.emit('join', room.toLowerCase());
};
let play = position => socket.emit('play', position);
let rematch = {
    request: () => socket.emit('rematch', 'request'),
    accept: () => socket.emit('rematch', 'accept')
};

socket.on('request', () => $('#rematch').modal('show'));
socket.on('user', name => $('#user').text(`👤 ${name}`));
socket.on('room', room => $('#room').text(`🔑 ${room}`));
socket.on('end', () => $('#rematch-button').removeAttr('hidden'));
socket.on('players', number => $('#players').text(`👥 ${number}/2`));

socket.on('clear', () => {
    $('.picture').remove();
    $('#rematch-button').attr('hidden', 'true');
});

socket.on('play', (position, user) => {
    $(`#${position}`).prepend(`<img class="picture" src="images/${user}.png">`);
});

socket.on('create', room => {
    let link = `${document.location.origin}?i=${room}`;
    $('#message').attr('class', `alert alert-success`);
    $('#message').html(`💬 New game created!<br>
    🔗 Invite link: <a target="_blank" href="${link}">${room}</a>`);
});

socket.on('message', (type, string) => {
    let emoji = type === 'success' ? '💬' : '⚠️';
    $('#message').attr('class', `alert alert-${type}`);
    $('#message').text(`${emoji} ${string}`);
});

let clearQuery = () => window.history.pushState(null, 'Tic Tac Toe', '/');

let invite = document.location.search.substring(3);
if (invite) {
    $('#invite-code').text(`You've been invited to a game!`);
    $('#invite').modal('show');
    $('#invite-button').attr('onclick', `join('${invite}')`);
};

if (localStorage.theme === 'dark') {
    $('#theme').text('🌙 Toggle Theme');
    $('body').attr('data-theme', 'dark');
};

let toggle = () => {
    if (localStorage.theme === 'light') {
        $('#theme').text('🌙 Toggle Theme');
        $('body').attr('data-theme', 'dark');
        localStorage.theme = 'dark';
    } else {
        $('#theme').text('☀️ Toggle Theme');
        $('body').attr('data-theme', 'light');
        localStorage.theme = 'light';
    };
};