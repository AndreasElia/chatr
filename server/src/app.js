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
  socket.emit('success', {
    message: 'Server Working'
  })

  console.log('1')

  socket.on('authenticate', (payload) => {
    console.log('2')

    socket.emit('auth', {
      jwt: 'Generated JWT Token'
    })

    console.log('3')
  })

  console.log('4')
})
