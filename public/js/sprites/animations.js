var ED = ED || {};
ED.Animations = ( function( document, window, undefined ){
  
  // VARIABLE DECLARATION 
  var playerImport = ED.Sprites.father, 
      playerSpriteSheet,
      playerAnimation;


  var getPlayerAnimation = function ( spriteName ) {
    spriteName = 'father';
    playerSpriteSheet = new createjs.SpriteSheet( ED.Sprites[spriteName] );
    createjs.SpriteSheetUtils.addFlippedFrames(playerSpriteSheet, true, false, false);
    playerAnimation  = new createjs.BitmapAnimation( playerSpriteSheet );
    playerAnimation.regX = playerAnimation.spriteSheet.frameWidth/2|0;
    playerAnimation.regY = playerAnimation.spriteSheet.frameHeight / 2 | 0;
    return playerAnimation;
  };




  return {
    getPlayerAnimation: getPlayerAnimation
  };
}( document, window ) );
