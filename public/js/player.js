// PLAYER
//
// player object

var ED = ED || {};
ED.player = ( function (window, document, undefined) {
  var player,
      playerList = [],
      otherPlayer,
      offset = 3,
      playerContainer,
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
    console.log( stage );
    console.log('addPlayerToStage');
    var circle = new createjs.Shape();
    console.log( circle );
    circle.graphics.beginFill("green").drawCircle(0, 0, 50);
    playerContainer = new createjs.Container();
    console.log( playerContainer );
    playerContainer.x  = playerObject.who.position.x;
    playerContainer.y  = playerObject.who.position.y;
    playerContainer.addChild(circle);
    stage.addChild(playerContainer);
    stage.update();

  };


  // handle the key presses
  // limit the attack to 1 per second
  player.prototype.keyDown = function ( e ) {
      console.log ( e.keyCode );
      var direction;
      if ( e.keyCode === 87 ) { //w
        playerContainer.y = playerContainer.y - offset ;
        direction = 'up';
      }
      if ( e.keyCode === 83 ) { //s
        playerContainer.y = playerContainer.y + offset;
        direction = 'down';
      }
      if ( e.keyCode === 65 ) { //a
        playerContainer.x = playerContainer.x - offset;
        direction = 'left';
      }
      if ( e.keyCode === 68 ) { //d
        playerContainer.x = playerContainer.x + offset ;
        direction = 'right';
      }
      if ( e.keyCode === 32 ) { //space
        this.triggerAttack ( direction );
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




  // player creation function
  createPlayer = function (playerObject) {
    newPlayer = new player(playerObject);
    return newPlayer;
  };
  ///////////////////////////////////////////////////////////////////////
  // Handle other players
  ///////////////////////////////////////////////////////////////////////


  createOtherPlayer = function ( playerObject ) {
    var anotherPlayer;
    anotherPlayer = new otherPlayer ( playerObject );
    return anotherPlayer;
  };

  ee.addListener ( 'otherPlayerCreated', createOtherPlayer );

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
    console.log ( playerObject );
    console.log ( this );

    if ( playerObject.id === this.who ) {
      for ( var index in otherPlayerContainers ) {
        console.log ( otherPlayerContainers );

        otherPlayerContainer.x = playerObject.x;
        otherPlayerContainer.y = playerObject.y;
      }
    }

  };

  otherPlayer.prototype._addPlayerToScene = function ( playerObject ) {
    var otherPlayerContainer;
    console.log( 'add other player' );

    stage = ED.easel.getStage();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    otherPlayerContainer = new createjs.Container();
    otherPlayerContainer.x = playerObject.who.position.x;
    otherPlayerContainer.y = playerObject.who.position.y;
    otherPlayerContainer.addChild(circle);
    stage.addChild(otherPlayerContainer);
    stage.update();
    otherPlayerContainers[playerObject.who.id] =  otherPlayerContainer;
  };

  return {
    createPlayer: createPlayer,
    createOtherPlayer: createOtherPlayer
  };
}( window, document ) );
