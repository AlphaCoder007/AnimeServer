var dotenv = require('dotenv');
dotenv.load();
var app = require('express')();
const morgan = require('morgan');
var mongoose = require('mongoose');
var connection = mongoose.connection;
var model = require('./mongoModel/test_model');
const kitsu = require('kitsu');
const bodyParser = require('body-parser');
var mongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var animeroutes = require('./anime_routes/anime_adding_routes');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var checkIndex = require('./anime_routes/checkindex');
var controllers = require('./controll');
var CronJob = require('cron').CronJob;
const GoogleImages = require('google-images');
const kitsu_gener = require('kitsu');
var fotology = require("fotology");      //  AIzaSyBZwC1ddzvwlO_y6vIneoMaMcXD7OhXjJ0 // AIzaSyDLPU1PzmR-5Gt9Ta9P3Z6sUQeVA73xyzQ
//var GoogleImageSearch = require('free-google-image-search')
const gClient = new GoogleImages('015901990557044801007:kvkkubodwga', 'AIzaSyBZwC1ddzvwlO_y6vIneoMaMcXD7OhXjJ0');
var imageSearch = require('node-google-image-search');
var Search = require('bing.search');
var util = require('util');
var gis = require('g-i-s');
/*new CronJob('2 * * * * *', function() {
  console.log('You will see this message every second');
}, null, true, null);*/
//controllers.io.listen(http);
// GoogleImageSearch from 'free-google-image-search'
const kitsu_api = new kitsu_gener({
  baseURL: 'https://kitsu.io/api',
  version: 2
});

var url = 'mongodb://localhost:27017/AniTest';
var client = 0;
mongoose.connect('mongodb://localhost/AniTest', { useMongoClient: true });
mongoose.Promise = global.Promise;
/*mongoose.connection.once('open', function () {
  console.log("connection with mongodb has been establised");
}).on('error', function (error) {
  console.log('There is a problem in mongodb');
})*/

/*
** To know that connection with mongodb is establised or not
** If connection has some eror @error is callback is called
 */
connection.on('error', function (error) {
   console.log('There is a problem while connecting with mongodb');
})

connection.once('open', function () {
  console.log("connection with mongodb has been establised");
})

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/root', animeroutes);
app.use('/ak', checkIndex);

const api = new kitsu({
  baseURL: 'https://kitsu.io/api',
  version: 2
})
//https://kitsu.io/api/edge/anime?page[limit]=20&page[offset]=0



var insertedDocument = function (db, res,callback) {
  var collection = db.collection('Animax');

  collection.insertMany([res[0], res[1], res[2], res[3], res[4], res[5],res[6], res[7], res[8], res[9], res[10], res[11], res[12], res[13], res[14], res[15], res[16],
res[17], res[18], res[19]], function (err, result) {
  if (!err) {
      console.log('files has been saved');
    }
    else {
      console.log(err);
    }

    callback(result);
  })

}

/*io.on('connection', function (socket) {
  client++;
  console.log('user is connected');
  io.sockets.emit('boardcast', {name : 'ankit', age : client})
  socket.on('disconnect', function () {
    client--;
    console.log('User is disconnect');
  })
})*/

app.get('/', function (req,res) {
console.log(process.env.NAME);
/*var results = imageSearch('car', callback, 0, 5);

function callback(results) {
    console.log(results);
    res.send(results)
}*/
gis('dragon ball super episode 1', logResults);

function logResults(error, results) {
  if (error) {
    console.log(error);
  }
  else {
    console.log(JSON.stringify(results[0], null, '  '));
  }
}

})

app.post('/getset', function (req, res) {
  req.body.name='hlalal';
  req.body.set="same"
  console.log(req.body.name);
  console.log(req.body.set);
})

http.listen(8000, function () {
  console.log('server is listening');
})
module.exports = io;
