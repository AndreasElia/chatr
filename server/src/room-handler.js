module.exports = (socket) => {
  socket.on('join room', (data) => {
    socket.join(data.room)

    socket.to(data.room).emit('user joined', data.user)
  })

  socket.on('leave room', (data) => {
    socket.leave(data.room)

    socket.to(data.room).emit('user left', data.user)
  })
}
