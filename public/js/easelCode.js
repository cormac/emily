//TODO (Jose) This needs to be an object exporting some methods
ED = ED || {};
ED.easel = ( function ( document, window, undefined ) {

  var stage;

  function startPainting(){
    stage = getStage ();
    console.log('all ready to paint');
    stage.mouseMoveOutside = true;

    createjs.Ticker.addListener(stage);
    stage.update();
    
  }
  var getStage = function () {
    if ( stage === undefined ) {
      stage = new createjs.Stage("gameCanvas");
    }
    return stage;
  };
  return {
    startPainting: startPainting,
    getStage: getStage
  };
} ( document, window ) );
