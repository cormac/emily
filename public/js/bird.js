var ED = ED || {};
ED.bird = ( function ( document, window, undefined ) {
  var createBird,
      birdList = {},
      ee = ED.events.ee;

  updateBird = function ( birdObject ) {

    var newBird = new bird ( birdObject );
  };

  bird  = function ( birdObject ) {
    this._addToScene( birdObject );

  };

  bird.prototype._addToScene = function ( birdObject ) {
    var birdContainer;
    stage = ED.easel.getStage();
    var circle = new createjs.Shape();
    circle.graphics.beginFill("blue").drawCircle(0, 0, 20);
    birdContainer = new createjs.Container();
    birdContainer.x = birdObject.x;
    birdContainer.y = birdObject.y;
    birdContainer.addChild(circle);
    stage.addChild(birdContainer);
    stage.update();
    birdList[bird] = birdContainer;
  };

  return {
    createBird: createBird
  };
} ( document, window ) );
