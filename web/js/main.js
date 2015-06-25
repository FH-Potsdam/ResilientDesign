// remap jQuery to $
(function($){})(window.jQuery);

var $window,
    $scrollElement,
    
    $nav,
    $navItems,
    $container,
    $viewSlider,
    $views,

    $contentBox,

    currentView = '',
    lastView = '',

    windowWidth,
    windowHeight;


////////////////
// Navigation
////////////////

function initNavigation() {
    
    // Start view
    currentView = $viewSlider.attr('class').replace('-active', '');

    // Click events
    $navItems.click(function(e) {

        var nextViewID = e.target.hash;
        
        oldView = currentView;
        currentView = nextViewID.replace('#','');

        // Change navigation
        $navItems.filter('.'+oldView).parent('li').removeClass('active');
        $navItems.filter(e.target).parent('li').addClass('active');

        // Animate views
        $viewSlider.removeClass(oldView + '-active')
                   .addClass(currentView + '-active');

        e.preventDefault();
        return false;
    });
}


//////////////
// Timeline
//////////////

function initTimeline() {
    
    var $guides = $('#guides > div'),
        $timelineValue = $("#timeline-value");

    var values = [0, 3, 6, 12, 24, 48];
    var $slider = $("#slider").slider({
        orientation: 'horizontal',
        range: true,
        min: 0,
        max: 60,
        //value: 0,
        values: [0, 3],
        step: 1,
        animate: false,
        slide: function(event, ui) {
            var includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
            var includeRight = event.keyCode != $.ui.keyCode.LEFT;
            console.log("left:  "+ includeLeft + ", right: "+ includeRight);
            var value = findNearest(includeLeft, includeRight, ui.value);
            if (ui.value == ui.values[0]) {
                $slider.slider('values', 0, value);
            }
            else {
                $slider.slider('values', 1, value);
            }
            
            $guides.removeClass('active')
                   .filter('.g' + $slider.slider('values', 1)).addClass('active');
            
            //$timelineValue.html($slider.slider('values', 1) + " hours");
            //$("#amount").html(slider.slider('values', 0) + ' - ' + slider.slider('values', 1) + " hours");
            return false;
        }/*,
        change: function(event, ui) { 
            getHomeListings();
        }*/
    });

    function findNearest(includeLeft, includeRight, value) {
        var nearest = null;
        var diff = null;
        for (var i = 0; i < values.length; i++) {
            if ((includeLeft && values[i] <= value) || (includeRight && values[i] >= value)) {
                var newDiff = Math.abs(value - values[i]);
                if (diff == null || newDiff < diff) {
                    nearest = values[i];
                    diff = newDiff;
                }
            }
        }
        
        // if (nearest < 3)
        //     nearest = 3;

        return nearest;
    }

    // var values = [0, 3, 6, 12, 24, 48];
    // var $slider = $( "#slider" ).slider({
    //     orientation: 'horizontal',
    //     value: 0,
    //     min: 0,
    //     max: 48,
    //     animate: "slow",
    //     //step: 50,
    //     //values: [0,3,6,12,24,48],
    //     slide: function( event, ui ) {

    //         var includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
    //         var includeRight = event.keyCode != $.ui.keyCode.LEFT;
            
    //         var value = findNearest(includeLeft, includeRight, ui.value);

    //         $slider.slider('value', value);

    //         // if (ui.value == ui.values[0]) {
    //         //     slider.slider('values', 0, value);
    //         // }
    //         // else {
    //         //     slider.slider('values', 1, value);
    //         // }
        
    //         $( "#amount" ).html(ui.value + " hours");
    //         return false;
    //     }
    // });
    // $( "#amount" ).html($( "#slider" ).slider( "value" ) + " hours");


    // function findNearest(includeLeft, includeRight, value) {
    //     var nearest = null;
    //     var diff = null;
    //     for (var i = 0; i < values.length; i++) {
    //         if ((includeLeft && values[i] <= value) || (includeRight && values[i] >= value)) {
    //             var newDiff = Math.abs(value - values[i]);
    //             if (diff == null || newDiff < diff) {
    //                 nearest = values[i];
    //                 diff = newDiff;
    //             }
    //         }
    //     }
    //     return nearest;
    // }
}



//////////////
// onScroll
//////////////

// function onScroll() {

//     scrollTop = $window.scrollTop();
// }

/////////////
// Resize
/////////////

function resizeSite() {

    windowWidth  = $window.width();
    windowHeight = $window.height();

}

////////////
// onLoad
////////////

function onLoad() {
    initTimeline();
}

/////////////
// onReady
/////////////

$(document).ready(function (){

    $window         = $(window);
    $scrollElement  = $('html, body').scrollTop(0);
    //$wrapper        = $('#wrap');

    $nav            = $('#view-nav');
    $navItems       = $nav.find('a');

    $container      = $('#container');
    $viewSlider     = $container.find('#view-slider');
    $views          = $viewSlider.find('section');
    $contentBox     = $container.find('#content-box');

    // Resize
    resizeSite();

    $(window).resize(resizeSite);
    // if ( isMobile ) {
    //     window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', resizeSite, false);
    // }
    // else {
    //     $(window).resize(resizeSite);
    // }

    initNavigation();

    // // Init onScroll handler
    // $(window).scroll(onScroll).trigger("scroll");

    // Load
    $(window).load(onLoad);

    // // Strings
    // siteStrings = $.parseJSON(siteVars.siteStrings);
});


////////////
// Utils
////////////

function mapInRange(value, min, max, a, b) {
    return (((b - a)*(value - min) ) / (max - min)) + a;
}

////////////////////////////
// Custom Easing Extends
////////////////////////////

// extend jQuery UI slider widget's _mouseCapture function to allow disabling handles
// _mouseCapture function copied from jQuery UI v1.10.3
$.widget("ui.slider", $.ui.slider, {
    _mouseCapture: function (event) {
        console.log("hey hey hey");
        var position, normValue, distance, closestHandle, index, allowed, offset, mouseOverHandle,
        that = this,
            o = this.options;

        if (o.disabled) {
            return false;
        }

        this.elementSize = {
            width: this.element.outerWidth(),
            height: this.element.outerHeight()
        };
        this.elementOffset = this.element.offset();

        position = {
            x: event.pageX,
            y: event.pageY
        };
        normValue = this._normValueFromMouse(position);
        distance = this._valueMax() - this._valueMin() + 1;
        this.handles.each(function (i) {
            // Added condition to skip closestHandle test if this handle is disabled.
            // This prevents disabled handles from being moved or selected with the mouse.
            if (!$(this).hasClass("ui-slider-handle-disabled")) {
                var thisDistance = Math.abs(normValue - that.values(i));
                if ((distance > thisDistance) || (distance === thisDistance && (i === that._lastChangedValue || that.values(i) === o.min))) {
                    distance = thisDistance;
                    closestHandle = $(this);
                    index = i;
                }
            }
        });

        // Added check to exit gracefully if, for some reason, all handles are disabled
        if(typeof closestHandle === 'undefined')
            return false;

        allowed = this._start(event, index);
        if (allowed === false) {
            return false;
        }
        this._mouseSliding = true;

        this._handleIndex = index;

        closestHandle.addClass("ui-state-active")
            .focus();

        offset = closestHandle.offset();
        // Added extra condition to check if the handle currently under the mouse cursor is disabled.
        // This ensures that if a disabled handle is clicked, the nearest handle will remain under the mouse cursor while dragged.
        mouseOverHandle = !$(event.target).parents().addBack().is(".ui-slider-handle") || $(event.target).parents().addBack().is(".ui-slider-handle-disabled");
        this._clickOffset = mouseOverHandle ? {
            left: 0,
            top: 0
        } : {
            left: event.pageX - offset.left - (closestHandle.width() / 2),
            top: event.pageY - offset.top - (closestHandle.height() / 2) - (parseInt(closestHandle.css("borderTopWidth"), 10) || 0) - (parseInt(closestHandle.css("borderBottomWidth"), 10) || 0) + (parseInt(closestHandle.css("marginTop"), 10) || 0)
        };

        if (!this.handles.hasClass("ui-state-hover")) {
            this._slide(event, index, normValue);
        }
        this._animateOff = true;
        return true;
    }
});


////////////////////////////
// Custom Easing Extends
////////////////////////////

$.extend($.easing,
{
    def: 'easeOutQuad',
    swing: function (x, t, b, c, d) {
        return $.easing[$.easing.def](x, t, b, c, d);
    },

    easeInQuad: function (x, t, b, c, d) {
        return c*(t/=d)*t + b;
    },
    easeOutQuad: function (x, t, b, c, d) {
        return -c *(t/=d)*(t-2) + b;
    },
    easeInOutQuad: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t + b;
        return -c/2 * ((--t)*(t-2) - 1) + b;
    },
    easeInCubic: function (x, t, b, c, d) {
        return c*(t/=d)*t*t + b;
    },
    easeOutCubic: function (x, t, b, c, d) {
        return c*((t=t/d-1)*t*t + 1) + b;
    },
    easeInOutCubic: function (x, t, b, c, d) {
        if ((t/=d/2) < 1) return c/2*t*t*t + b;
        return c/2*((t-=2)*t*t + 2) + b;
    }
});