<a href="https://glitch.com/edit/?utm_content=project_sockets-ttt&utm_source=remix_this&utm_medium=button&utm_campaign=glitchButton#!/remix/sockets-ttt">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix this" height="33">
</a>

# Welcome to TicTacToe

⚒️ This game was created with `socket.io` and `express`

`Data Structure`
```
data 
├── game 
│   ├── cache (object)
│   ├── wins (array)
│   ├── generate (function)
│   ├── find (function)
│   ├── end (function)
├── join (function)
├── play (function)
├── check (function)
│   ├── redundancy (function)
│   ├── winner (function)
│   ├── tie (function)
├── create
```

`Cache Structure`
```
cache
├── id (string)
│   ├── ready (boolean)
│   ├── host
│   │   ├── turn (boolean)
│   │   ├── id (string)
│   │   ├── plays (array)
│   ├── guest
│   │   ├── id (string)
│   │   ├── plays (array)
```