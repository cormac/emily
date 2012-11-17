// PLAYER
//
// player object

var ED = ED || {};
ED.player = ( function (window, document, undefined) {
  var player,
      playerContainer,
      playerFrame,
      playerDirection,
      playerList = [],
      otherPlayer,
      offset = 17,
      getCurrentFrame,
      newPlayer,
      otherPlayerContainers = {},
      stage,
      ee = ED.events.ee;


  // constructor for player
  player = function(playerObject) {
    acceptAttack = true;
    this.addListeners();
    this.addPlayerToStage(playerObject);
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


  player.prototype.addPlayerToStage = function (playerObject)  {
    stage = ED.easel.getStage();
    player = ED.Animations.getPlayerAnimation(playerObject.name);
    playerFrame = "left";
    playerContainer = new createjs.Container();
    playerContainer.x  = playerObject.who.position.x;
    playerContainer.y  = playerObject.who.position.y;
    playerContainer.addChild( player );
    stage.addChild(playerContainer);
    player.gotoAndPlay( getCurrentFrame(playerFrame) );
    stage.update();
  };

  getCurrentFrame = function ( frame ) {
    if ( frame === "left" )
       return "right";
    else 
       return "left";
  };


  // handle the key presses
  // limit the attack to 1 per second
  player.prototype.keyDown = function ( e ) {
      console.log ( e.keyCode );
      if ( e.keyCode === 87 ) { //w
        playerContainer.y = playerContainer.y - offset ;
      }
      if ( e.keyCode === 83 ) { //s
        playerContainer.y = playerContainer.y + offset;
      }
      if ( e.keyCode === 65 ) { //a
        playerContainer.x = playerContainer.x - offset;
        playerDirection = 'left';
      }
      if ( e.keyCode === 68 ) { //d
        playerContainer.x = playerContainer.x + offset ;
        direction = 'right';
      }
      if ( e.keyCode === 32 ) { //space
        this.triggerAttack ( {x: playerContainer.x, y: playerContainer.y} );
      }

      playerFrame = getCurrentFrame( playerFrame );
      player.gotoAndPlay( playerFrame );

      ED.sockets.sendMessage('coordinates', { 
        id: ED.who, 
        x: playerContainer.x, 
        y: playerContainer.y
      });
  };


  // fire the attack event
  player.prototype.triggerAttack = function ( xandy ) {
    ee.emitEvent( 'attack', [xandy] );
  };

  // remove the keydown listener
  player.prototype.removeEventListener = function () {
    document.removeEventListener( 'keydown', keyListener, false );
  };




  // player creation function
  createPlayer = function (playerObject) {
    newPlayer = new player(playerObject);
    return newPlayer;
  };
  ///////////////////////////////////////////////////////////////////////
  // Handle other players
  ///////////////////////////////////////////////////////////////////////


  createOtherPlayer = function ( playerObject ) {
    console.log ( playerObject );
    var anotherPlayer;
    anotherPlayer = new otherPlayer ( playerObject );
    return anotherPlayer;
  };

  destroyOtherPlayer = function ( playerObject ) {
    console.log ( playerObject );
    stage = ED.easel.getStage();
    stage.removeChild( otherPlayerContainers[playerObject.who.id] );

  };

  ee.addListener ( 'otherPlayerCreated', createOtherPlayer );
  ee.addListener ( 'otherPlayerLogout', destroyOtherPlayer );

  otherPlayer = function ( playerObject ) {
    var callMove,
        self = this;

    console.log ( playerObject );
    this.who = playerObject.who.id;
    this._addPlayerToScene ( playerObject );

    callMove = function (data) {
      self._move.call ( self, data );
    };
    ee.addListener( 'otherPlayerMove', callMove );
  };

  otherPlayer.prototype._move = function ( playerObject ) {
    otherPlayerContainers[playerObject.id].direction = 
      getCurrentFrame( otherPlayerContainers[playerObject.id].direction );
    otherPlayerContainers[playerObject.id].playerContainer.x = playerObject.x;
    otherPlayerContainers[playerObject.id].playerContainer.y = playerObject.y;
    otherPlayerContainers[playerObject.id].player.gotoAndPlay( 
      otherPlayerContainers[playerObject.id].direction ) ;

  };

  otherPlayer.prototype._addPlayerToScene = function ( playerObject ) {
    var otherPlayerContainer,
        otherPlayer;

    stage = ED.easel.getStage();
    otherPlayer = ED.Animations.getPlayerAnimation(playerObject.name);
    otherPlayerContainer = new createjs.Container();
    otherPlayerContainer.x = playerObject.who.position.x;
    otherPlayerContainer.y = playerObject.who.position.y;
    otherPlayerContainer.addChild(otherPlayer);
    stage.addChild(otherPlayerContainer);

    otherPlayer.gotoAndPlay( getCurrentFrame(playerFrame) );
    stage.update();
    otherPlayerContainers[playerObject.who.id] =  {
      playerContainer: otherPlayerContainer,
      player : otherPlayer,
      direction : 'left'
    };
  };

  return {
    createPlayer: createPlayer,
    createOtherPlayer: createOtherPlayer
  };
}( window, document ) );
