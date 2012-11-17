//TODO (Jose) This needs to be an object exporting some methods
var CK = CK || {};
CK.sockets = ( function ( document, window, undefined ) {
  function startSockets(){
    var socket = io.connect('http://localhost:8080');
    socket.on('youAre', function (data) {
      console.log(data);
      console.log('You are: ', data.who);
      if (data.who)
        document.getElementById('gamer').innerHTML = 'Logged in as: ' + data.who;
      else
        document.getElementById('gamer').innerHTML = 'All spots are taken!';

      socket.emit('from_browser', { my: 'should send my name' });
    });
    socket.on('endGame', function (data) {
      console.log(data);
        document.getElementById('gamer').innerHTML = 'Lost connection: Game ended!';
    });
  }

  return {
    startSockets: startSockets
  };
} ( document, window ) );
