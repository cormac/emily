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

var setPlayers = { 
  0: { free: true, name: 'father'},
  1: { free: true, name: 'mother'},
  2: { free: true, name: 'brother'},
  3: { free: true, name: 'sister'}
};

var players = {};
var birds = {};
var noPlayers = 0;
var noBirds = 0;

io.on('connection', function (client) {
  noPlayers = noPlayers + 1;
  noBirds = noBirds + 1;
  if (noPlayers > 4){
    console.log('No more positions');
    var player = {};
    player.name = 'No more positions!';
    player.id = -1;
    client.emit('youAre', {who: player});
    noPlayers = noPlayers -1;
  }
  else {
    for (var pl in setPlayers) {
      if (setPlayers[pl].free){
        players[pl] = setUpPlayer(client, pl);
        //birds[noBirds] = setUpBird(client, noBirds);
        break;
      }
    }
  }
});

function setUpPlayer(client, playerNo){
  var player = {};
  player.id = playerNo;
  player.name = setPlayers[playerNo].name;
  player.position = { x: (10 + (10 * playerNo)), y: (10 + (5 * playerNo))};
  setPlayers[playerNo].free = false;
  //Tell yourself who you are
  client.emit('youAre', {who: player});
  //Tell others you arrived
  client.broadcast.emit('player', {who: player});
  //Tell me all the other players around
  for (var pla in players){
    client.emit('others', { who : players[pla] });
  }

  client.on('disconnect', function(){
    // clear the position in the array of names
    delete players[player.id];
    noPlayers = noPlayers -1;
    setPlayers[playerNo].free = true;
    client.broadcast.emit('logout', {who: player});
    //TODO we have to delete a Bird
  });
  client.on('coordinates', function (msg) {
    client.broadcast.emit('coordinates', msg);
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
  
  var initialPos = 100;
  var forward = true;
  function generateBirdPos() {
    if (initialPos == 200)
      forward = false;

    if (initialPos == 10)
      forward = true;

    if (forward)
      return initialPos = initialPos + 1;
    else
      return initialPos = initialPos - 1;

  }
  console.log('Start bird animation on server for bird: ', bird.id);
  
  var birdFlyingInt = setInterval(bird.birdFlying, 1000);

  return bird;
}

