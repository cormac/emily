ED = ED || {};
ED.start = ( function ( document, window, undefined ) {
  var load = function( e ) {
    console.log( 'load' );
    ED.sockets.startSockets();
    ED.easel.startPainting();
  };
  document.addEventListener("DOMContentLoaded", load, false);

} ( document, window ) );
