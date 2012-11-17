describe( 'Cavalier', function() {
  var myCavalier,
      ee,
      e;

  beforeEach( function() {
    ee = CK.events.ee;
    myCavalier = CK.cavalier.create();
    e = {
      keyCode: 65
    };
  } );
  afterEach( function() {
    myCavalier.removeEventListener();
    myCavalier = null;
  } );


  it ( 'should do the shield attack', function() {
    spyOn( myCavalier, 'triggerAttack' );
    myCavalier.keyDown( e );
    expect( myCavalier.triggerAttack ).toHaveBeenCalled();
    expect( myCavalier.triggerAttack ).toHaveBeenCalledWith( 'shield attack' );
  });

  it ( 'should subscribe to the key pressed event', function () {
    spyOn( myCavalier, 'keyDown' );
    fireKeyEvent( 0 );
    expect( myCavalier.keyDown ).toHaveBeenCalled();
  });

  it ( 'an attack should fire a game event', function() {
    var shield = {
      listener: function() {
      }
    };
    spyOn( shield, 'listener');
    ee.addListener( 'shield attack', shield.listener ); 
    myCavalier.keyDown( e );
    expect( shield.listener ).toHaveBeenCalled();
  } );

  it ( 'should have an attack blocked by the correct defence', function() {
    var block = {
      listener: function() {
      }
    };
    myCavalier.keyDown( e );
    spyOn( block, 'listener' );
    ee.addListener('attack blocked', block.listener);
    ee.emitEvent( 'shield defence' );
    expect( block.listener ).toHaveBeenCalled();

  } );

  it ( 'an unblocked attack should be successful', function () {
    var flag = false
    var attack = {
      listener: function() {
        flag = true;
      }
    };
    spyOn( attack, 'listener' ).andCallThrough();
    runs( function() {
      myCavalier.keyDown( e );
      ee.addListener( 'shield success', attack.listener );
    } );
    waitsFor ( function() {
      return flag;
    }, 'success listener to be called', 1000 );

    runs( function () {
      expect( attack.listener ).toHaveBeenCalled();
    } );

  } );

});

// helper functio to fire keypress events
var fireKeyEvent = function ( keyCode ) {
  var evt = document.createEvent("KeyboardEvent");
  evt.initKeyboardEvent(                
    "keydown",        //  in DOMString typeArg, 
     true,            //  in boolean canBubbleArg,
     true,            //  in boolean cancelableArg,
     null,            //  in nsIDOMAbstractView viewArg,
     false,           //  in beolean ctrlKeyArg,
     false,           //  in boolean altKeyArg,
     false,           //  in boolean shiftKeyArg,
     false,           //  in boolean metaKeyArg,
     keyCode,         //  in unsigned long keyCodeArg,
     0                //  in unsigned long charCodeArg);
  );
  var element = document.getElementsByTagName('body')[0];
  element.dispatchEvent( evt );
}

