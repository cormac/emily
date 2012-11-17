// PLAYER
//
// player object

var ED = ED || {};
ED.player = ( function (window, document, undefined) {
  var player,
      otherPlayer,
      offset = 3,
      playerContainer,
      otherPlayerContainer,
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

  createOtherPlayer = function ( playerObject ) {
    otherPlayer = new otherPlayer ( playerObject );
    return otherPlayer;
  };

  otherPlayer = function ( playerObject ) {
    console.log ( playerObject );
    this.who = playerObject.who;
    this._addPlayerToScene ( playerObject );
    ee.addListener( 'otherPlayerMove', this._move );
  };

  otherPlayer.prototype._move = function ( playerObject ) {
    if ( playerObject.who === this.who ) {
      otherPlayerContainer.x = playerObject.position.x;
      otherPlayerContainer.y = playerObject.position.y;
    }

  };

  otherPlayer.prototype._addPlayerToScene = function ( playerObject ) {
    stage = ED.easel.getStage();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("red").drawCircle(0, 0, 50);
    otherPlayerContainer = new createjs.Container();
    otherPlayerContainer.x = playerObject.position.x;
    otherPlayerContainer.y = playerObject.position.y;
    otherPlayerContainer.addChild(circle);
    stage.addChild(otherPlayerContainer);
    stage.update();
  };

  return {
    createPlayer: createPlayer,
    createOtherPlayer: createOtherPlayer
  };
}( window, document ) );
