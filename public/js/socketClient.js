//TODO (Jose) This needs to be an object exporting some methods
var ED = ED || {};
ED.sockets = ( function ( document, window, undefined ) {
  var socket;

  function startSockets(){
    //var socket = io.connect('http://192.168.2.92:8080');
    socket = io.connect('http://localhost:8080');
    socket.on('youAre', function (data) {
      console.log(data);
      console.log('You are: ', data.who);
      document.getElementById('gamer').innerHTML = 'Logged in as: ' + data.who;
      ED.who = data.who;

      socket.emit('from_browser', { my: 'should send my name' });
    });

    socket.on('coordinates', function (data) {
      console.log(data);
    });

    socket.on('endGame', function (data) {
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
