ED = ED || {};
ED.start = ( function ( document, window, undefined ) {
  var load = function( e ) {
    console.log( 'load' );
    ED.sockets.startSockets();
    ED.easel.startPainting();
<<<<<<< HEAD
=======
    ED.cavalier.create();
    
>>>>>>> 8cd8514b06d7f11f7b6d7185efce5bb7591528f5
  };
  document.addEventListener("DOMContentLoaded", load, false);

} ( document, window ) );
