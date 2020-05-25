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
db.defaults({ rooms: [], users: [], count: 0 }).write()

io.on('connection', (socket) => {
  socket.emit('rooms', db.get('rooms').value())

  socket.on('register', (user) => {
    console.log('register', user)

    db.get('users')
      .push({ ...user, id: socket.id })
      .write()

    return { id: socket.id }
  })

  socket.on('join', (slug) => {
    console.log('join', slug)

    socket.room = slug

    socket.join(slug)
  })

  socket.on('authenticate', (payload) => {
    console.log('authenticate', payload)

    socket.emit('auth', {
      jwt: 'Generated JWT Token'
    })
  })

  socket.on('message', (data) => {
    console.log('message', data)

    io.to(socket.room).emit('message', data)
  })
})
