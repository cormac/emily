var express = require('express'),
    http = require('http'),
    app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server, {'log level': 2});

var SERVER_PORT = 8080;

server.listen(SERVER_PORT, function(){
  console.log('Server started at %s', (new Date()).toUTCString());
});

app.configure(function(){
  app.set('views', __dirname + '/../views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/../public'));
});

var theCavalier = {
  free: true
};
var theWarriors = [];

io.on('connection', function (client) {
  if (theCavalier.free){ 
    console.log('Cavalier is free: ', theCavalier.free);
    theCavalier = setUpCavalier(client)
    return;
  }

  if (theWarriors.length < 3)
    theWarriors[theWarriors.length] = setUpWarrior(client, theWarriors.length);
  else
    allPositionsTaken(client);
});

function setUpCavalier(client){
  cavalier = {}
  cavalier.free = false;
  client.emit('youAre', {who: 'Cavalier'});
  client.on('disconnect', function(){
    cavalier.free = true;
    // We need another cavalier
    console.log('The game has to stop now!');
    client.emit('endGame', {cause: 'disconnect'});
    client.broadcast.emit('endGame', {cause: 'disconnect'});
    theCavalier.free = true;
  });

  return cavalier;
}

function setUpWarrior(client, warriorPos){
  var warrior = {};
  warrior.id = warriorPos + 1;
  client.emit('youAre', {who: warrior.id});
  client.on('disconnect', function(){
    warrior.id = -1;
    //TODO (Jose) We need to clear the pos in the array
    console.log('The game has to stop now!'); 
    client.emit('endGame', {cause: 'disconnect'});
    client.broadcast.emit('endGame', {cause: 'disconnect'});
    theWarriors = [];
  });

  return warrior;
}

function allPositionsTaken(client){
  client.emit('youAre', {who: false});
}
