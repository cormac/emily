ED = ED || {};
ED.start = ( function ( document, window, undefined ) {
  var load = function( e ) {
    console.log( 'load' );
    ED.sockets.startSockets ();
    ED.easel.startPainting ();
    setTimeout( function () {
      $( '#emilymad1' ).addClass('showEmily');
      $( '#emilymad1' ).show();
      $( '#gameCanvas ').hide();
      var sound = new Audio('./sound/EmilyIsMad.mp3');
      sound.play();
      ee.emitEvent( 'gotFeather', [attack] );
    }, 42000);
  };
  document.addEventListener("DOMContentLoaded", load, false);

  

} ( document, window ) );
