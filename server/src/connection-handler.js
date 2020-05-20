module.exports = (socket) => {
  socket.on('connect', (data) => {
    console.log('join', data)

    socket.broadcast.emit('connect', data)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })
}
