let fs = require('fs')
let http = require('http')
let utils = require('./utils')
let express = require('express')
let socketio = require('socket.io')

let app = express()
let server = http.createServer(app)
let io = socketio(server)

let cache = new Map()
let events = fs.readdirSync('events')
    .map(file => require(`./events/${file}`))

io.on('connection', socket => {
    events.forEach(event => {
        socket.on(event.name, data => {
            event.run({ socket, io, cache, data, utils })
        })
    })
})

app.use(express.static('./public'))

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.render('pages/index'))

server.listen(process.env.PORT ?? 80, () => {
    console.log('⚡ Running on localhost')
})

process.on('uncaughtException', console.error)
process.on('unhandledRejection', console.error)