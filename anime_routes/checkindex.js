var express = require('express');
var router = express.Router();
var index = require('../index');
var controllers = require('../controll');

router.get('/same',function (req, res) {
  console.log('user ennterd',index);
  var io = controllers.io.getIO();
  io.sockets.emit('boardcast', {name : 'ankit', age : 20})
  res.send('thhankas');
})
module.exports = router;
