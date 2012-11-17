// PLAYER
//
// player object

var ED = ED || {};
ED.player = ( function (window, document, undefined) {
  var player,
      ee = ED.events.ee;


  // constructor for player
  player = function() {
    acceptAttack = true;
    this.addListeners();
  };

  // implement a keylistener function
  // this calls the keyDown function passing the newly created player
  // instance in as context, it also passes the keydown event along as 
  // a parameter
  keyListener = function ( e ) {
    newPlayer.keyDown.call(newPlayer, e);
  };

  // add event listener for player keypresses
  player.prototype.addListeners = function () {
    document.addEventListener( 'keydown', keyListener, false );
  };


  // handle the key presses
  // limit the attack to 1 per second
  player.prototype.keyDown = function ( e ) {
    if ( acceptAttack === true ) {
      if ( e.keyCode === 65 ) {
        this.triggerAttack('shield attack');
      }
      if ( e.keyCode === 83 ) {
        this.triggerAttack('sword attack');
      }
      if ( e.keyCode === 68 ) {
        this.triggerAttack('mace attack');
      }

      // todo ( cormac ) separate this function to handle defensive moves
      window.setTimeout(processAttack, attackDelay);

      acceptAttack = false;
      attackSuccess = true;
    }
  };


  // fire the attack event
  player.prototype.triggerAttack = function ( attackType ) {
    currentAttack = attackType;
    ee.emitEvent( attackType );
  };

  // remove the keydown listener
  player.prototype.removeEventListener = function () {
    document.removeEventListener( 'keydown', keyListener, false );
  };

  ///////////////////////////////////////////////////////////////////////
  // Observe the attack and deal with the results
  ///////////////////////////////////////////////////////////////////////



  // player creation function
  createPlayer = function () {
    newPlayer = new player();
    return newPlayer;
  };


  return {
    create: createPlayer
  };
}( window, document ) );
