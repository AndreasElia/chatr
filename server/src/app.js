let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)

http.listen(3000, () => {
  console.log('Listening on port 3000')
})

const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('db.json')
const db = low(adapter)

let count = {}

// Set some defaults
db.defaults({ rooms: [], user: {}, count: 0 }).write()

io.on('connection', (socket) => {
  console.log('connection')

  socket.on('rooms', (data) => {
    var allrooms = db.get('rooms').value()

    console.log('allrooms', allrooms)

    socket.broadcast.emit('allrooms', allrooms)
  })

  socket.on('register', (data) => {
    console.log('register', data)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })

  socket.on('message', (data) => {
    console.log('message', data)
  })
})
