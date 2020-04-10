let socket = io();

let create = () => socket.emit('create');
let join = code => socket.emit('join', code);
let rematch = () => socket.emit('rematch');
let play = position => socket.emit('play', position);

socket.on('clear', () => $('.picture').remove());
socket.on('request', () => $('#rematch').modal('show'));
socket.on('user', name => $('#user').text(`👤 ${name}`));
socket.on('room', room => $('#room').text(`🔑 ${room}`));
socket.on('end', () => $('#rematch-button').removeAttr('hidden'));
socket.on('players', number => $('#players').text(`👥 ${number}/2`));
socket.on('restart', () => $('#rematch-button').attr('hidden', 'true'));

socket.on('play', (position, user) => {
    $(`#${position}`).prepend(`<img class="picture" src="images/${user}.png">`);
});

socket.on('create', room => {
    let link = `${document.location.origin}?i=${room}`;
    $('#message').attr('class', `alert alert-success`);
    $('#message').html(`💬 Created game: ${room}<br>
    🔗 Created invite link: <a target="_blank" href="${link}">${room}</a>`);
});

socket.on('message', (type, string) => {
    let emoji = type === 'success' ? '💬' : '⚠️';
    $('#message').attr('class', `alert alert-${type}`);
    $('#message').text(`${emoji} ${string}`);
});

rematch = {
    request: () => socket.emit('rematch', 'request'),
    accept: () => socket.emit('rematch', 'accept')
};

let invite = document.location.search.substring(3);
if (invite) {
    $('#invite-code').text(`You've been invited to a game!`);
    $('#invite').modal('show');
    $('#invite-button').attr('onclick', `join('${invite}')`);
};

// Dark Mode
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