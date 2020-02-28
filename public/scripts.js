let socket = io();

let join = () => {
    let code = prompt('Enter your game code!');
    socket.emit('join', code);
};

let create = () => {
    socket.emit('create');
};

socket.on('response', string => $('.msg').text(string));