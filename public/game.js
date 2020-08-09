let game = new Vue({
    el: '#game',
    data: {
        key: null,
        info: {
            user: 'N/A',
            key: 'N/A',
            players: 0
        },
    },
    methods: {
        rematch(type) {
            socket.emit('rematch', type);
        },

        join() {
            clearParams();
            socket.emit('join', this.key);
        },

        create() {
            socket.emit('create');
        },

        play(event) {
            socket.emit('play', event.target.id);
        },

        onClear() {
            $('.img').remove();
            $('#rematch-btn').attr('hidden', 'true');
        },

        onEnd() {
            $('#rematch-btn').removeAttr('hidden');
        },

        onRequest() {
            $('#rematch').modal('show');
        },

        onPlay(position, user) {
            $(`#${position}`).prepend(`<img class="img" src="images/${user}.png">`);
        },

        onCreate(key) {
            let link = `${location.origin}?i=${key}`;
            $('#msg').attr('class', `alert alert-info`);
            $('#msg').html(`🔗 Invite link: 
            <a href="${link}" target="_blank">
            ${key}</a><br>💬 New game created!`);
        },

        onMessage(type, string) {
            let emoji = type === 'info' ? '💬' : '⚠️';
            $('#msg').attr('class', `alert alert-${type}`);
            $('#msg').text(`${emoji} ${string}`);
        }
    }
});

let socket = io();

socket.on('end', game.onEnd);
socket.on('play', game.onPlay);
socket.on('clear', game.onClear);
socket.on('create', game.onCreate);
socket.on('message', game.onMessage);
socket.on('request', game.onRequest);

let { info } = game;
socket.on('user', user => info.user = user);
socket.on('key', key => info.key = key);
socket.on('players', number => info.players = number);

socket.on('log', data => console.log(data));

let params = new URLSearchParams(location.search);

if (params.has('i')) {
    $('#invite').modal('show');
    game.key = params.get('i');
};

let clearParams = () => history.pushState({}, document.title, '/');