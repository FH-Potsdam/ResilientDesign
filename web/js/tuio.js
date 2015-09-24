jQuery(document).ready(function($) {
  var client = new Tuio.Client({
      host: "http://localhost:5000"
  }),

  onAddTuioCursor = function(cursor) {
    cursor.yPos = cursor.xPos;
    cursor.xPos = 1 - cursor.yPos;
    createTouchEvent('touchstart', cursor);
  },

  onUpdateTuioCursor = function(cursor) {
    cursor.yPos = cursor.xPos;
    cursor.xPos = 1 - cursor.yPos;
    createTouchEvent('touchmove', cursor);
  },

  onRemoveTuioCursor = function(cursor) {
    cursor.yPos = cursor.xPos;
    cursor.xPos = 1 - cursor.yPos;
    createTouchEvent('touchend', cursor);
  },

  createTouchEvent = function(eventName, cursor) {
    var touch = createTouch(cursor);
    var evt = document.createEvent('Event');

    evt.initEvent(eventName, true, true);
    evt.touches = createTouchList(touch, eventName);
    evt.targetTouches = getTargetTouches(touch.target);
    evt.changedTouches = [touch];

    if(touch.target) {
      touch.target.dispatchEvent(evt);
    } else {
      document.dispatchEvent(evt);
    }

    updateDebugTouches(touch, eventName);
  },

  touches = [],

  createTouch = function(cursor) {
    var data = {
      identifier: cursor.sessionId,
      screenX: getScreenX(cursor.xPos),
      screenY: getScreenY(cursor.yPos),
      pageX: getPageX(cursor.xPos),
      pageY: getPageY(cursor.yPos),
      clientX: getClientX(cursor.xPos),
      clientY: getClientY(cursor.yPos),
      target: getElement(cursor)
    };

    return data;
  },

  createTouchList = function(touch, eventName) {
    if(eventName === 'touchstart') {
      touches.push(touch);
    } else if(eventName === 'touchmove') {
      touches[_.findIndex(touches, 'identifier', touch.identifier)] = touch;
    } else if(eventName === 'touchend') {
      touches.splice(_.findIndex(touches, 'identifier',  touch.identifier), 1);
    }

    return touches;
  },

  getTargetTouches = function(element) {
    var targetTouches = [];
    for (var i = 0; i < touches.length; i++) {
      var touch = touches[i];
      if (touch.target === element) {
        targetTouches.push(touch);
      }
    }
    return targetTouches;
  },

  // Helper
  getElement = function(cursor) {
    return document.elementFromPoint(
      getClientX(cursor.xPos),
      getClientY(cursor.yPos)
    );
  },

  getPageX = function(point) {
    return getClientX(point) + $(window).scrollLeft();
  },

  getPageY = function(point) {
    return getClientY(point) + $(window).scrollTop();
  },

  getClientX = function(point) {
    return Math.round( point * $(window).innerWidth() );
  },

  getClientY = function(point) {
    return Math.round( point * $(window).innerHeight() );
  },

  getScreenX = function(point) {
    return Math.round( point * screen.width );
  },

  getScreenY = function(point) {
    return Math.round( point * screen.height );
  },

  updateDebugTouches= function(touch, eventName) {
    if(eventName === 'touchstart') {
      $('body').append('<div id="touch' + touch.identifier + '" style="position: absolute; background: rgba(215,61,47,0.3); width: 30px; height: 30px; border-radius: 50%; z-index:999; top: '+touch.pageY+'px; left: '+ touch.pageX+'px;"></div>');
    } else if(eventName === 'touchmove') {
      $('#touch'+touch.identifier).css({
        'top': touch.pageY,
        'left': touch.pageX
      });
    } else if(eventName === 'touchend') {
      $('#touch'+touch.identifier).remove();
    }
  };

  client.on("addTuioCursor", onAddTuioCursor);
  client.on("updateTuioCursor", onUpdateTuioCursor);
  client.on("removeTuioCursor", onRemoveTuioCursor);
  client.connect();


  // $('#wrap').hammer().bind("tap", function(e) {
  //   console.log('tap');
  // });
  // $('#wrap').data('hammer').get('tap').set({'threshold': 30});
});