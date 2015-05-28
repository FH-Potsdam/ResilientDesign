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

// function onLoad() {

// }

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

    // // Load
    // $(window).load(onLoad);

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