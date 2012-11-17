CK = CK || {};
CK.start = ( function ( document, window, undefined ) {
  var load = function( e ) {
    console.log( 'load' );
    CK.sockets.startSockets();
    CK.easel.startPainting();
    CK.cavalier.create();
    
  };
  document.addEventListener("DOMContentLoaded", load, false);

} ( document, window ) );
