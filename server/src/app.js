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
  messages: []
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

    var room = db.get('rooms')
      .find({ slug: socket.room })
      .value()

    db.get('rooms')
      .find({ slug: socket.room })
      .assign({ online: room.online + 1 })
      .write()

    var messages = db.get('messages')
      .filter({ room: socket.room })
      .value()

    socket.emit('room', {
      room: room,
      messages: messages
    })

    socket.broadcast.in(socket.room).emit('online', {
      user: socket.user,
      count: room.online
    })
  })

  socket.on('offline', (data) => {
    console.log('offline', data)

    if (! socket.room) return

    var room = db.get('rooms')
      .find({ slug: socket.room })
      .value()

    db.get('rooms')
      .find({ slug: socket.room })
      .assign({ online: room.online - 1 })
      .write()

    socket.leave(socket.room)

    socket.broadcast.in(socket.room).emit('offline', { user: socket.user })
  })

  socket.on('message', (data) => {
    console.log('message', data)

    db.get('messages')
      .push({
        user: socket.user,
        room: socket.room,
        message: data.message
      })
      .write()

    io.to(socket.room).emit('message', {
      user: socket.user,
      message: data.message
    })
  })
})
