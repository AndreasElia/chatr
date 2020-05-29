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
db.defaults({
  rooms: [],
  messages: [],
  count: 0
}).write()

io.on('connection', (socket) => {
  socket.on('register', (user) => {
    console.log('register', user)

    socket.user = user.name

    socket.emit('rooms', db.get('rooms').value())

    return { id: socket.id }
  })

  socket.on('join', (slug) => {
    console.log('join', slug)

    socket.room = slug

    socket.join(slug)

    var messages = db.get('messages')
      .filter({ room: socket.room })
      .value()

    socket.emit('messages', messages)
  })

  socket.on('room', (slug) => {
    console.log('room', slug)

    return db.get('rooms')
      .find({ slug: slug })
      .value()
  })

  socket.on('authenticate', (payload) => {
    console.log('authenticate', payload)

    socket.emit('auth', {
      jwt: 'Generated JWT Token'
    })
  })

  socket.on('message', (data) => {
    console.log('message', data)
    console.log('message', socket.user)

    db.get('messages')
      .push({
        user: socket.user,
        room: socket.room,
        message: data
      })
      .write()

    io.to(socket.room).emit('message', data)
  })
})
