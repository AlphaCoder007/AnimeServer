var socketio = require('socket.io');
var io;
var socketObject;
module.exports = {
listen :    function(server) {
  io = socketio.listen(server);
  io.on('connection', function(socket) {
   console.log('user connected');
   socketObject = socket;
   socket.on('disconnect', function () {
  console.log('user disconnect');
   })
// ... do something

});
 return io;
}
,
getIO : function () {
  return socketObject;
}

}
