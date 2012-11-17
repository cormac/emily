// PLAYER
//
// player object

var ED = ED || {};
ED.player = ( function (window, document, undefined) {
  var player,
      otherPlayer = {},
      offset = 3,
      playerContainer,
      stage,
      ee = ED.events.ee;


  // constructor for player
  player = function() {
    acceptAttack = true;
    this.addListeners();
    this.addPlayerToStage();
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

  player.prototype.addPlayerToStage = function ()  {
    stage = ED.easel.getStage();
    console.log( stage );
    console.log('addPlayerToStage');
    var circle = new createjs.Shape();
    console.log( circle );
    circle.graphics.beginFill("green").drawCircle(0, 0, 50);
    playerContainer = new createjs.Container();
    console.log( playerContainer );
    playerContainer.x = playerContainer.y = 100;
    playerContainer.addChild(circle);
    stage.addChild(playerContainer);
    stage.update();

  };


  // handle the key presses
  // limit the attack to 1 per second
  player.prototype.keyDown = function ( e ) {
      console.log ( e.keyCode );
      if ( e.keyCode === 87 ) { //w
        playerContainer.y = playerContainer.y - offset ;
      }
      if ( e.keyCode === 83 ) { //a
        playerContainer.y = playerContainer.y + offset;
      }
      if ( e.keyCode === 65 ) { //s
        playerContainer.x = playerContainer.x - offset;
      }
      if ( e.keyCode === 68 ) { //d
        playerContainer.x = playerContainer.x + offset ;
      }

      ED.sockets.sendMessage('coordinates', { 
        id: ED.who, 
        x: playerContainer.x, 
        y: playerContainer.y
      });
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


    //playerContainer.onPress = function(evt) {
      //var offset = {x:evt.target.x-evt.stageX, y:evt.target.y-evt.stageY};

      //evt.onMouseMove = function(ev) {
        //ev.target.x = ev.stageX+offset.x;

        //ev.target.y = ev.stageY+offset.y;
      //};
    //};


  // player creation function
  createPlayer = function () {
    newPlayer = new player();
    return newPlayer;
  };


  return {
    createPlayer: createPlayer
  };
}( window, document ) );
