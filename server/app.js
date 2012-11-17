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
var birds = {};
var noPlayers = 0;
var noBirds = 0;

io.on('connection', function (client) {
  noPlayers = noPlayers + 1;
  noBirds = noBirds + 1;
  players[noPlayers] = setUpPlayer(client, noPlayers);
  //birds[noBirds] = setUpBird(client, noBirds);
});

function setUpPlayer(client, playerNo){
  var player = {};
  player.id = playerNo;
  player.position = { x: (10 + (100 * playerNo)), y: (10 + (50 * playerNo))};
  //Tell yourself who you are
  client.emit('youAre', {who: player});
  //Tell others you arrived
  client.broadcast.emit('player', {who: player});
  //Tell me all the other players around
  for (var pla in players){
    console.log(pla);
    client.emit('others', { who : players[pla] });
  }

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

function setUpBird(client, birdPos){
  var bird = {};
  bird.id = birdPos;
  bird.keepFlying = true;
  client.broadcast.emit('birdCreated', {bird: bird.id});
  client.on('deleteBird', function(){
    delete birds[bird.id];
    //TODO we have to delete a Bird
  });
  
  // When a bird is caught, then something happens?
  client.on('caughtBird', function (msg) {
    client.broadcast.emit('caughtBird', msg);
    //TODO probably something like stop the bird flying
  });

  bird.birdFlying = function(){
    var xpos = generateBirdPos();
    var ypos = generateBirdPos();
    client.broadcast.emit('birdCoords', { bird: bird.id, x: xpos, y: ypos});
    console.log({ bird: bird.id, x: xpos, y: ypos});
  }
  
  var initialPos = 10;
  var forward = true;
  function generateBirdPos() {
    if (initialPos < 20 && forward){
      forward = true;
      return initialPos = initialPos + 1;
    }
    else if (initialPos > 2) {
      forward = false;
      return initialPos = initialPos - 1;
    } else if (initialPos == 2) forward = true;
  }
  console.log('Start bird animation on server');
  
  //var birdFlyingInt = setInterval(bird.birdFlying, 1000);

  return bird;
}

