<a href="https://glitch.com/edit/?utm_content=project_sockets-ttt&utm_source=remix_this&utm_medium=button&utm_campaign=glitchButton#!/remix/sockets-ttt">
  <img src="https://cdn.glitch.com/2bdfb3f8-05ef-4035-a06e-2043962a3a13%2Fremix%402x.png?1513093958726" alt="remix this" height="33">
</a>

# Welcome to TicTacToe

Front End Includes: `socket.io` + `express`

Back End Includes: `jquery` + `bootstrap` + `socket.io`

`💾 Data Structure - Server`
```
data 
├── game 
│   ├── cache (object)
│   ├── wins (array)
│   ├── code (function)
│   ├── find (function)
│   ├── end (function)
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

`💾 Cache Structure - Server`
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