var ED = ED || {};
ED.Sprites = ( function( document, window, undefined ){
  var father = new Image( );
  father.src = '/img/father.png';
  var fatherSprite = {
    "animations": {
      "hit": {
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

  var motherSprite = {
    "animations": {
      "left": {
        "frames": [0, 1, 2]
        },
      "right": {
        "frames": [0, 1, 2]
        }
      }, 
      "images": ["/img/mother_01.png"], 
      "frames": [[0, 0, 64, 128, 0, 0, 0], [64, 0, 64, 128, 0, 0, 0], [128, 0, 64, 128, 0, 0, 0], [192, 0, 64, 128, 0, 0, 0], [256, 0, 64, 128, 0, 0, 0]]};

  var sisterSprite = {"frames": [[0, 0, 64, 128, 0, 0, 0], [64, 0, 64, 128, 0, 0, 0], [128, 0, 64, 128, 0, 0, 0], [192, 0, 64, 128, 0, 0, 0]], 
    "animations": {
      "left": {
        "frames": [0]

        },
      "right": {
        "frames": [1]
        }
      }, "images": ["/img/sister.png"]};

  var brotherSprite = {"frames": [[0, 0, 64, 64, 0, 0, 0], [64, 0, 64, 64, 0, 0, 0], [128, 0, 64, 64, 0, 0, 0], [192, 0, 64, 64, 0, 0, 0], [256, 0, 64, 64, 0, 0, 0]], 
  "animations": {
    "left": {
      "frames": [0]
      },
    "right": {
      "frames": [1]
      }
    }, "images": ["/img/brother.png"]};
  var birdSprite  = {
    "images": ["/img/bird.png"], 
    "frames": [[0, 0, 32, 16, 0, 0, 0], [32, 0, 32, 16, 0, 0, 0]], 
    "animations": {
      "all": {
        "frames": [0, 1]
      }
    }};

  return {
    father : fatherSprite,
    mother : motherSprite,
    brother: brotherSprite,
    bird   : birdSprite,
    sister : sisterSprite
  };

}( document, window ) );
