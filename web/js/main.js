// remap jQuery to $
(function($){})(window.jQuery);

var $window,
    $scrollElement,
    
    $nav,
    $navItems,
    $container,
    $viewSlider,
    $views,

    $slider,
    $guides,
    $timeline,
    $timelineValue,

    $contentWrap,
    $content,
    $contentMap,
    $problemsContent,
    $solutionsContent,
    $contentHouse,
    $floorProfileContent,
    $floorProblemsContent,

    $mapProblemBars,
    $mapSolutionBars,
    $houseProblemBars,
    $houseSolutionBars,

    $footer,

    initView = 'map-view',
    currentView = '',
    oldView = '',

    windowWidth,
    windowHeight;

var siteContentMap   = [],
    siteContentHouse = [];

var siteContentMapFile   = "data/RD_contentTableMap_export01.json",
    siteContentHouseFile = "data/RD_contentTablePersona_export01.json";

var initTime    = 0,
    currentTime = initTime,
    timeValues  = [0, 3, 6, 12, 24, 48];



//////////
// Data
//////////

function loadData() {

    // This triggers when both JSON files
    $.when(
        $.getJSON(siteContentMapFile),
        $.getJSON(siteContentHouseFile)
    ).done(function(mapResponse, houseResponse) {

        var mapData = $.parseJSON(mapResponse[2].responseText),
            houseData = $.parseJSON(houseResponse[2].responseText);

        console.log(mapData);
        console.log(houseData);

        // Parse JSON
        $.each( mapData, function( key, item ) {
            siteContentMap[item.id] = item;
        });

        $.each( houseData, function( key, item ) {
            siteContentHouse[item.id] = item;
        });

        console.log(">>> Site content successfully loaded!");

        onSiteDataLoaded();
    });
}


/////////////////////
// View Navigation
/////////////////////

function initViewNavigation() {
    
    // Start view
    //currentView = $viewSlider.attr('class').replace('-active', '');

    // Click events
    $navItems.click(function(e) {

        var nextViewID = e.target.hash;
        
        oldView = currentView;
        currentView = nextViewID.replace('#','');

        // Change view animation
        changeView(currentView);

        e.preventDefault();
        return false;
    });
}

function changeView(strView) {

    // Change navigation
    $navItems.parents('li').removeClass('active');
    $navItems.filter('.' + strView).parent('li').addClass('active');

    // Content Wrapper Actions

    // Hide timeline
    if (currentView == 'intro-view') {
        hideContentWrap();
    
    // Reset and show timeline
    } else if (oldView == 'intro-view') {
        showContentWrap();
        initViewContent(initTime);
    }

    hideContentWrap();
    setTimeout(function() {
        showContentWrap();
    }, 400);

    // Show house view
    if (currentView == 'house-view' && oldView == 'map-view') {

        $contentMap.fadeOut(350, function() {
            showContent(currentTime);
            $contentHouse.fadeIn({opacity: 1}, 350);
        });

    // Show map view
    } else if (currentView == 'map-view' && oldView == 'house-view') {

        $contentHouse.fadeOut(350, function() {
            showMarkers(currentTime);
            showContent(currentTime);
            $contentMap.fadeIn({opacity: 1}, 350);
        });
    }

    // Animate view change
    $viewSlider.attr('class', strView + '-active');
}


/////////////////////////
// Timeline Navigation
/////////////////////////

function initTimeline() {
    
    $timeline = $('#timeline');
    $guides = $('#guides > div');
    $timelineValue = $("#timeline-value");

    var values = timeValues;
    $slider = $("#slider").slider({
        orientation: 'horizontal',
        range: true,
        min: 0,
        max: 60,
        values: [0, 3],
        step: 1,
        animate: false,
        create: function(event, ui) {
            //console.log("+++ Create timeline slider");
            //$slider.slider('values', 1, 0);

            //$(this).slider( "option", { disabled: true } );
        },
        slide: function(event, ui) {
            var includeLeft = event.keyCode != $.ui.keyCode.RIGHT;
            var includeRight = event.keyCode != $.ui.keyCode.LEFT;
            
            // Update slider values
            var value = findNearest(includeLeft, includeRight, ui.value);

            if (ui.value == ui.values[0]) {
                $slider.slider('values', 0, value);
            }
            else {
                $slider.slider('values', 1, value);
            }
            
            //$timelineValue.html($slider.slider('values', 1) + " hours");
            //$("#amount").html(slider.slider('values', 0) + ' - ' + slider.slider('values', 1) + " hours");
            return false;
        },
        start: function(event, ui) {

            if (currentView == 'house-view') {
                oldFloor = currentFloor;
            }

            hideContent();
        },
        stop: function(event, ui) { 
        //change: function(event, ui) { 

            // Check active value
            currentTime = $slider.slider('values', 1);
            
            //console.log(">>>> New timeline value - " + currentTime);

            // Control active values
            $guides.removeClass('active')
                   .filter('.g' + currentTime).addClass('active');

            // Update content
            showContent(currentTime);

            // Show markers if map view
            if (currentView == 'map-view') {
                showMarkers(currentTime);
            }
        }
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

        return nearest;
    }
}

///////////////////////
// Content Functions
///////////////////////

function initViewContent(time) {

    // Update current time
    currentTime = time;

    hideContent();

    $slider.slider('values', 1, time);
    
    // Control active values
    $guides.removeClass('active')
           .filter('.g' + currentTime).addClass('active');

    if (currentView == 'map-view') {
        $contentMap.show();
        $contentHouse.hide();

    } else if (currentView == 'house-view') {
        showMarkers(currentTime);
        $contentHouse.show();    
        $contentMap.hide();
    }   

    // Update content
    showContent(currentTime);
}

function hideContent() {

    if (currentView == 'map-view') {
        $problemsContent.stop(true, true)
                        .animate({opacity: 0}, 250);

        $solutionsContent.stop(true, true)
                         .animate({opacity: 0}, 250);
    } else if (currentView == 'house-view') {

        // TO DO: if different floor
        if (oldFloor != '' && currentFloor != oldFloor) {
            $floorProfileContent.stop(true, true)
                               .animate({opacity: 0}, 250);
        }

        $floorProblemsContent.stop(true, true)
                            .animate({opacity: 0}, 250);
    }
}

function showContent(value) {

    //var siteContent = (currentView == 'map-view') ? siteContentMap : siteContentHouse;

    value = (value < 10) ? "0" + value : value;

    // Map view
    if (currentView == 'map-view') {

        // Problems content
        $problemsContent.stop(true, true)
                        .html(siteContentMap['STD'+value].problemtext)
                        .animate({opacity: 1}, 250);

        // Solutions content
        $solutionsContent.stop(true, true)
                         .html(siteContentMap['STD'+value].solutionstext)
                         .animate({opacity: 1}, 250);

        // Update vars
        $mapProblemBars.find('#probbarverkehrschaos .progress-bar > div').css('width', siteContentMap['STD'+value].probbarverkehrschaos + "%");
        $mapProblemBars.find('#probbarmedizinischenotfaelle .progress-bar > div').css('width', siteContentMap['STD'+value].probbarmedizinischenotfaelle + "%");
        $mapProblemBars.find('#probbarkriminalitaet .progress-bar > div').css('width', siteContentMap['STD'+value].probbarkriminalitaet + "%");
        $mapProblemBars.find('#probbarpanik .progress-bar > div').css('width', siteContentMap['STD'+value].probbarpanik + "%");

        $mapSolutionBars.find('#resbarkommunikation .progress-bar > div').css('width', siteContentMap['STD'+value].resbarkommunikation + "%");
        $mapSolutionBars.find('#resbarversorgung .progress-bar > div').css('width', siteContentMap['STD'+value].resbarversorgung + "%");
        $mapSolutionBars.find('#resbarwhatever .progress-bar > div').css('width', siteContentMap['STD'+value].resbarwhatever + "%");
        $mapSolutionBars.find('#resbarsozialerzusammenhalt .progress-bar > div').css('width', siteContentMap['STD'+value].resbarsozialerzusammenhalt + "%");
    
    // House view
    } else if (currentView == 'house-view') {

        // Profile content
        $floorProfileContent.stop(true, true)
                            .html(getFloorProfileContent(currentFloor))

        if (oldFloor != '' && currentFloor != oldFloor) {
            
            $floorProfileContent.animate({opacity: 1}, 250);
        }

        // Solutions content
        $floorProblemsContent.stop(true, true)
                            .html(getFloorProblemsContent(currentFloor, value))
                            .animate({opacity: 1}, 250);

        // Update vars
        // $houseProblemBars.find('#probbarverkehrschaos .progress-bar > div').css('width', siteContent['STD'+value].probbarverkehrschaos + "%");
        // $houseProblemBars.find('#probbarmedizinischenotfaelle .progress-bar > div').css('width', siteContent['STD'+value].probbarmedizinischenotfaelle + "%");
        // $houseProblemBars.find('#probbarkriminalitaet .progress-bar > div').css('width', siteContent['STD'+value].probbarkriminalitaet + "%");
        // $houseProblemBars.find('#probbarpanik .progress-bar > div').css('width', siteContent['STD'+value].probbarpanik + "%");

        // $houseSolutionBars.find('#resbarkommunikation .progress-bar > div').css('width', siteContent['STD'+value].resbarkommunikation + "%");
        // $houseSolutionBars.find('#resbarversorgung .progress-bar > div').css('width', siteContent['STD'+value].resbarversorgung + "%");
        // $houseSolutionBars.find('#resbarwhatever .progress-bar > div').css('width', siteContent['STD'+value].resbarwhatever + "%");
        // $houseSolutionBars.find('#resbarsozialerzusammenhalt .progress-bar > div').css('width', siteContent['STD'+value].resbarsozialerzusammenhalt + "%");
    }
}

function updateContent(value) {

    hideContent();
    showContent(value);
}

/////////////////////////////
// House Content Functions
/////////////////////////////

function getFloorProfileContent(floor) {
    
    var content = '';

    if (floor == 'floor-1') {
        content = siteContentHouse['Steckbrief'].mutter;
    } else if (floor == 'floor-2') {
        content = siteContentHouse['Steckbrief'].altedame;
    } else if (floor == 'floor-3') {
        content = siteContentHouse['Steckbrief'].wg;
    }

    return content;
}

function getFloorProblemsContent(floor, time) {
    
    var content = '';

    if (floor == 'floor-1') {
        content = siteContentHouse['STD'+time].mutter;
    } else if (floor == 'floor-2') {
        content = siteContentHouse['STD'+time].altedame;
    } else if (floor == 'floor-3') {
        content = siteContentHouse['STD'+time].wg;
    }

    return content;
}

///////////////////////////////
// Content Wrapper Functions
///////////////////////////////

function showContentWrap() {

    $contentWrap.removeClass('hidden');

    // $contentWrap.css({top: 0});
}

function hideContentWrap() {
    
    $contentWrap.addClass('hidden');
    
    // $contentWrap.css({top: $contentWrap.outerHeight() + $timeline.outerHeight() + $footer.outerHeight() + $slider.find('.ui-slider-handle').outerHeight()});
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

    initViewNavigation();
    initTimeline();
    
    // Load site data (view content + markers)    
    loadData();
}

function onSiteDataLoaded() {

    // Init timeline
    // Content will be loaded by currentView
    initViewContent(initTime);
}

/////////////
// onReady
/////////////

$(document).ready(function () {

    $window         = $(window);
    $scrollElement  = $('html, body').scrollTop(0);
    //$wrapper        = $('#wrap');

    $nav            = $('#view-nav');
    $navItems       = $nav.find('a');

    $container      = $('#container');
    $viewSlider     = $container.find('#view-slider');
    $views          = $viewSlider.find('section');

    $contentWrap    = $('#content-wrap');
    $content        = $contentWrap.find('#content');
    $contentMap     = $content.find('#content-map');
    $contentHouse   = $content.find('#content-house');

    // Content
    $problemsContent    = $content.find('#problems-content');
    $solutionsContent   = $content.find('#solutions-content');

    $floorProfileContent  = $content.find('#floor-profile-content');
    $floorProblemsContent = $content.find('#floor-problems-content');

    // Progress bars
    $mapProblemBars      = $content.find('#map-problem-bars');
    $mapSolutionBars     = $content.find('#map-solution-bars');

    $houseProblemBars    = $content.find('#house-problem-bars');
    $houseSolutionBars   = $content.find('#house-solution-bars');

    // Footer
    $footer             = $('footer');

    // Resize
    resizeSite();
    $(window).resize(resizeSite);

    // Set current view
    currentView = initView;
    changeView(currentView);

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