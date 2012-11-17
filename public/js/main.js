ED = ED || {};
ED.start = ( function ( document, window, undefined ) {
  var load = function( e ) {
    console.log( 'load' );
    ED.sockets.startSockets();
    ED.easel.startPainting();
    ED.cavalier.create();
    
  };
  document.addEventListener("DOMContentLoaded", load, false);

} ( document, window ) );
