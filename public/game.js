let game = new Vue({
    el: '#game',
    data: {
        key: null,
        info: {
            user: 'N/A',
            key: 'N/A',
            players: 0
        },
        message: {
            unread: 0,
            content: '',
            total: []
        }
    },
    methods: {
        read() {
            this.message.unread = 0;
        },

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

        send() {
            socket.emit('chat', this.message.content);
        },

        onChat(user, content) {
            this.message.total.push({ user, content });
            user === this.info.user ? null : this.message.unread += 1;
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
            $('#msg').html(`<i class="fas fa-link"></i> Invite link: 
            <a href="${link}" target="_blank">${key}</a><br>
            <i class="fas fa-comment-alt"></i> New game created!`);
        },

        onAlert(type, msg) {
            let icon = type === 'info' ? 'comment-alt' : 'exclamation-triangle';
            $('#msg').attr('class', `alert alert-${type}`);
            $('#msg').html(`<i class="fas fa-${icon}"></i> ${msg}`);
        }
    },
});

// Vue.component('chat', {
//     template: `<div class="alert alert-info" role="alert">
//         <i class="fas fa-comment-alt mr-2"></i>
//         {{ msg.user }} - {{ msg.content }}
//     </div>`
// });

let socket = io();

socket.on('end', game.onEnd);
socket.on('play', game.onPlay);
socket.on('chat', game.onChat);
socket.on('clear', game.onClear);
socket.on('alert', game.onAlert);
socket.on('create', game.onCreate);
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