module.exports = (socket) => {
  socket.on('message', (data) => {
    console.log('message')
    socket.broadcast.emit('message', data)
  })
}
