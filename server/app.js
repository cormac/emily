var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server, {'log level': 2});

var SERVER_PORT = 8080;

server.listen(SERVER_PORT, function(){
  console.log('Server started at %s on port: %s', (new Date()).toUTCString(), SERVER_PORT);
});

app.configure(function(){
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

var players = {};
var noPlayers = 0;

io.on('connection', function (client) {
  noPlayers = noPlayers + 1;
  players[noPlayers] = setUpPlayer(client, noPlayers);
  //TODO we have to create a bird
});

function setUpPlayer(client, playerPos){
  var player = {};
  player.id = playerPos;
  client.emit('youAre', {who: player.id});
  //client.broadcast.emit('connected', {who: player.id, cause: 'connected'});
  client.on('disconnect', function(){
    delete players[player.id];
    //TODO we have to delete a Bird
  });
  client.on('coordinates', function (msg) {
    client.broadcast.emit('coordinates', msg);
    //TODO we have to create a bird
  });

  return player;
}

