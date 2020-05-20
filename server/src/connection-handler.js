module.exports = (socket) => {
  socket.on('join', (data) => {
    console.log('join', data)

    if (socket.username && socket.username.length) {
      socket.emit('error', 'You are already registered')
      return
    }

    var regExp = new RegExp(/^[a-zA-Z0-9]+$/g)

    if (! regExp.test(data.username)) {
      socket.emit('error', 'Invalid username')
      return
    }

    socket.broadcast.emit('join', data)
  })

  socket.on('leave', (data) => {
    console.log('leave', data)

    socket.broadcast.emit('leave', data)
  })

  socket.on('disconnect', () => {
    console.log('disconnect')
  })
}
