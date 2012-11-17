//TODO (Jose) This needs to be an object exporting some methods
var ED = ED || {};
ED.sockets = ( function ( document, window, undefined ) {
  function startSockets(){
    var socket = io.connect('http://localhost:8080');
    socket.on('youAre', function (data) {
      console.log(data);
      console.log('You are: ', data.who);
      document.getElementById('gamer').innerHTML = 'Logged in as: ' + data.who;

      socket.emit('from_browser', { my: 'should send my name' });
    });
    socket.on('endGame', function (data) {
      console.log(data);
    });
  }

  return {
    startSockets: startSockets
  };
} ( document, window ) );
