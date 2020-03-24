let socket = io();

let join = code => socket.emit('join', code);
let create = () => socket.emit('create');
let play = position => socket.emit('play', position);

socket.on('reset', () => $('.picture').remove());
socket.on('room', room => $('#room').text(`🔑 ${room}`));
socket.on('player', name => $('#player').text(`👤 ${name}`));
socket.on('total', number => $('#total').text(`👥 ${number}/2`));

socket.on('play', (position, player) => {
    let picture = player === 'host' ? 'images/x.png' : 'images/o.png';
    $(`#${position}`).prepend(`<img class="picture" src="${picture}">`);
});

socket.on('invite', room => {
    let link = `${document.URL}?g=${room}`;
    $('#message').attr('class', `alert alert-success`);
    $('#message').html(`
        💬 Created game: ${room}<br>
        🔗 Created invite link: <a target="_blank" href="${link}">${room}</a>
    `);
});

socket.on('message', (type, string) => {
    let emoji = type === 'success' ? '💬' : '⚠️';
    $('#message').attr('class', `alert alert-${type}`);
    $('#message').text(`${emoji} ${string}`);
});

let getParam = item => {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (let i=0; i<vars.length; i++) {
        let pair = vars[i].split("=");
        if (pair[0] == item) return pair[1];
    };
    return false;
};

let invite = getParam('g');
if (invite) {
    $('#invite-code').text(`You've been invited to a game!`);
    $('#invite').modal({show: true});
    $('#invite-button').attr('onclick', `join('${invite}')`);
};