var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var io = require('./socketConnection').listen(app);


app.get('', function (req, res) {
  res.sendfile('showfile.html')

})

var client = 0;

io.on('connection', function (socket) {
  client++;
  console.log('user is connected');
  io.sockets.emit('boardcast', {name : 'ankit', age : client})
  socket.on('disconnect', function () {
    client--;
    console.log('User is disconnect');
  })
})


http.listen(8000, function() {
   console.log('listening on *:8000');
});
