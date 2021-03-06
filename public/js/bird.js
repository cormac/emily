var ED = ED || {};
ED.bird = ( function (window, document, undefined) {
  var bird,
      birdList = [],
      birdContainer,
      stage,
      acceptAttack,
      callmove,
      ee = ED.events.ee;


  // constructor for bird
  bird = function(birdObject) {
    acceptAttack = true;
    this.addBirdToStage(birdObject);
  };

  bird.prototype.addBirdToStage = function (birdObject)  {
    stage = ED.easel.getStage();
    bird = ED.Animations.getPlayerAnimation("bird");
    birdContainer = new createjs.Container();
    //TODO check these positions, they are coming from the server
    birdContainer.x  = birdObject.x;
    birdContainer.y  = birdObject.y;
    birdContainer.addChild(bird);
    bird.gotoAndPlay( 'all' );
    stage.addChild(birdContainer);
    stage.update();

  };

  // player creation function
  createBird = function (birdObject) {
    newBird = new bird(birdObject);
    return newBird;
  };

  callMove = function (data) {
    birdContainer.x = data.x;
    birdContainer.y = data.y;
  };

  ee.addListener ( 'birdCoords', callMove );

  var attacked = function(attack){
    console.log('Player Id:', attack.playerId);
    if (Math.abs(birdContainer.x - attack.x) < 10){
      var sound = new Audio('./sound/BIrdIsHit.mp3');
      sound.play();
      ee.emitEvent( 'gotFeather', [attack] );
    }
  };

  ee.addListener ( 'attack', attacked );

  return {
    createBird: createBird
  };
}( window, document ) );
