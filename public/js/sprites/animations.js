var ED = ED || {};
ED.Animations = ( function( document, window, undefined ){
  
  // VARIABLE DECLARATION 
  var playerImport = ED.Sprites.father, 
      playerSpriteSheet,
      playerAnimation;


  var getPlayerAnimation = function ( spriteName ) {
  var playerImport = ED.Sprites.father, 
      playerSpriteSheet,
      playerAnimation;
      console.log( spriteName ); 
    playerSpriteSheet = new createjs.SpriteSheet( ED.Sprites[spriteName] );
    //createjs.SpriteSheetUtils.addFlippedFrames(playerSpriteSheet, true, false, false);
    playerAnimation  = new createjs.BitmapAnimation( playerSpriteSheet );
    return playerAnimation;
  };




  return {
    getPlayerAnimation: getPlayerAnimation
  };
}( document, window ) );
