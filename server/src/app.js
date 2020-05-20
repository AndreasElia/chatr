let app = require('express')()
let http = require('http').Server(app)
let io = require('socket.io')(http)
let connectionHandler = require('./connection-handler')
let roomHandler = require('./room-handler')
let messageHandler = require('./message-handler')

http.listen(3000, () => {
  console.log('Listening on port 3000')
})

io.on('connection', (socket) => {
  connectionHandler(socket)
  roomHandler(socket)
  messageHandler(socket)
})
