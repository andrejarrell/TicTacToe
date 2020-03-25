<div>
  <p>
    <a href="https://glitch.com/edit/#!/ws-ttt">
      <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fview-source%402x.png" height="33">
    </a>
    <a href="https://glitch.com/edit/#!/remix/ws-ttt">
      <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png" height="33">
    </a>
  </p>
</div>

# Welcome to TicTacToe

## Tools used:

⚒️ Back End: `socket.io` + `express`

⚒️ Front End: `jquery` + `bootstrap` + `socket.io`

## Setup for running locally:

1. Download repository

2. Install [Node.js](https://nodejs.org/en/download/)

3. Install dependencies: `npm i`

4. Run application

   - Production `npm run start`

   - Debug `npm run debug`

## Back End:

This game takes a modular approach with it's file structure.

All the modules are put into the data object.

```js
let data = {
    game: require('./modules/game.js'),
    join: require('./modules/join.js'),
    play: require('./modules/play.js'),
    check: require('./modules/check.js'),
    create: require('./modules/create.js'),
    rematch: require('./modules/rematch.js'),
    disconnect: require('./modules/disconnect')
};
```

🔄 `Event Listeners`

```
▪️ Join
▪️ Play
▪️ Create
▪️ Rematch
▪️ Disconnect
```

💾 `Data Structure`
```
data 
├── game 
│   ├── cache (object)
│   ├── wins (array)
│   ├── code (function)
│   ├── end (function)
│   ├── delete (function)
├── join (function)
├── play (function)
├── check (function)
│   ├── play (function)
│   ├── win (function)
│   ├── tie (function)
├── create (function)
├── rematch (function)
├── disconnect (function)
```

💾 `Cache Structure`
```
cache
├── room (string)
│   ├── ready (boolean)
│   ├── host
│   │   ├── turn (boolean)
│   │   ├── id (string)
│   │   ├── plays (array)
│   ├── guest
│   │   ├── id (string)
│   │   ├── plays (array)
```

## Front End:

🔄 `Event Listeners`

```
▪️ Clear
▪️ End
▪️ Player
▪️ Rematch
▪️ Total
▪️ Room
▪️ Play
▪️ Invite
▪️ Message
```