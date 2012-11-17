//TODO (Jose) This needs to be an object exporting some methods
var ED = ED || {};
ED.sockets = ( function ( document, window, undefined ) {
  var socket,
      ee = ED.events.ee;

  function startSockets(){
    //var socket = io.connect('http://192.168.2.92:8080');
    socket = io.connect('http://localhost:8080');
    socket.on('youAre', function (data) {
      console.log('You are: ', data);
      document.getElementById('gamer').innerHTML = 'Logged in as: ' + data.who.name;
      ED.who = data.who.id;
      ED.player.createPlayer (data);

      socket.emit('from_browser', { my: 'should send my name' });
    });

    socket.on('others', function (data) {
      console.log('other player in: ', data);
      ee.emitEvent( 'otherPlayerCreated', [data] );
    });

    socket.on('player', function (data) {
      console.log('player:', data);
      ee.emitEvent( 'otherPlayerCreated', [data] );
    });

    socket.on('coordinates', function (data) {
      console.log(data);
      ee.emitEvent( 'otherPlayerMove', [data] );
    });


    socket.on('logout', function (data) {
      console.log(data);
      ee.emitEvent( 'otherPlayerLogout', [data] );
    });

    socket.on('endGame', function (data) {
      console.log(data);
    });



    // Bird functionality
    socket.on('birdCoords', function (data) {
      console.log(data);
    });
  }

  function sendMessage(action, object) {
    socket.emit(action, object);
  }

  return {
    startSockets: startSockets,
    sendMessage: sendMessage
  };
} ( document, window ) );
