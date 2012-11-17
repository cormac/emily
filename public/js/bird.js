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
    console.log( stage );
    console.log('addBirdToStage');
    var bird = new createjs.Shape();
    console.log( bird );
    bird.graphics.beginFill("blue").drawCircle(0, 0, 20);
    birdContainer = new createjs.Container();
    //TODO check these positions, they are coming from the server
    birdContainer.x  = birdObject.x;
    birdContainer.y  = birdObject.y;
    birdContainer.addChild(bird);
    stage.addChild(birdContainer);
    stage.update();

  };

  // player creation function
  createBird = function (birdObject) {
    newBird = new bird(birdObject);
    return newBird;
  };

  callMove = function (data) {
    console.log('CALLED');
    birdContainer.x = data.x;
    birdContainer.y = data.y;
    console.log(birdContainer.y);
  };

  ee.addListener ( 'birdCoords', callMove );

  return {
    createBird: createBird
  };
}( window, document ) );
