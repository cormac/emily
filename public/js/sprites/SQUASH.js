var ED = ED || {};
ED.Sprites = ( function( document, window, undefined ){
  var father = new Image( );
  father.src = '/img/father_test_02.png';
  var fatherSprite = {
    "animations": {
      "all": {
        "frames": [0, 1]
      },
      "left" : {
        "frames": [0]
      },
      "right" : {
        "frames": [1]
      }
    }, 
    "images": [father.src], 
    "frames": [[0, 0, 64, 128, 0, 0, 0], [64, 0, 64, 128, 0, 0, 0]]
  };
  return {
    father : fatherSprite,
  };

}( document, window ) );
