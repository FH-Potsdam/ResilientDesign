
////////////////////////
// House View Scripts
////////////////////////

// SVG Vars
var svg,
	svgFile,
	g;
	
	// Solutions
	// boy1, $boy1Hit,
	// boy2, $boy2Hit,
	// girl, $girlHit,
	// bottle, $bottleHit,
	
	// // Problems
	// lamp, $lampHit,
	// cabinet, $cabinetHit,
	// counter, $counterHit,
	// laptop, $laptopHit,
	// wc, $wcHit,
	// sink, $sinkHit;
	
// Floor vars
var $houseView,
	$houseSlider,
	$floorNavItems,
	$popupPane,
	currentFloor = 'floor-3',
	oldFloor = '';


//////////////////////
// Floor Navigation
//////////////////////

function initFloorNavigation() {

	//oldFloor = currentFloor;

	$floorNavItems = $("#svg-nav > a");

	// Navigate to current floor
	goToFloor(currentFloor);

	$floorNavItems.click(function(e) {

		var nextFloorID = e.target.hash;
		
		oldFloor = currentFloor;
		currentFloor = nextFloorID.replace('#','');

		// Remove old popups
		removePopups();

		// Deactivate active graphics
		deactivateActiveGraphics();

		//hideContent();
		updateContent(currentTime);

		goToFloor(currentFloor);

		e.preventDefault();
		return false;
	});
}

function goToFloor(strFloor) {

	var $oldFloor = $floorNavItems.filter('.active'),//.removeClass('active')
		$currentFloor = $floorNavItems.filter('a[href$="#' + strFloor + '"]');

	// Deactivate old floor
	$oldFloor.removeClass('active');

	// Animate slider
	$houseSlider.attr('class', strFloor + '-active');

	var transitionEnded = false;

	// $currentFloor.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
	$currentFloor.one("transitionend", function(e) {

		if (transitionEnded) return false;

		// Deactivate events for active floor
		$currentFloor.addClass('active');
		
		$(this).off(e);

		transitionEnded = true;
	});
}


//////////////////
// Init on load
//////////////////

window.onload = function () {

	$houseView = $('#house-view');
	$houseSlider = $('#house-slider');

	// Init popup pane
	$popupPane = $('<div class="leaflet-container leaflet-popup-pane leaflet-fade-anim"></div>');
	$houseSlider.append($popupPane);

	// Floor navigation
	initFloorNavigation();

	// SVG
	svg = Snap("#house");

	//Snap.load("images/house/3rd_Floor_WG_Active.svg", function (f) {
	Snap.load("images/house/House_View_all_floors_2.svg", function (f) {

		console.log("svg image loaded");

		svgFile = f;

		g = svgFile.select("g");
		
		// Transform
		var myMatrix = new Snap.Matrix();
		myMatrix.scale(1.2, 1.2);            // play with scaling before and after the rotate 
		myMatrix.translate(30,50);      // this translate will not be applied to the rotation
		// myMatrix.rotate(45);            // rotate
		// g.animate({ transform: myMatrix.toTransformString() },1000);  // probably not needed
		g.attr({transform: myMatrix});

		initHitAreas();

		// Add loaded graphic (g) to svg element (svg)
		//top.add(gr);
		svg.append(g);
	});
};

////////////////
// Hit Events
////////////////

var $hitAreas;

function initHitAreas() {

	$hitAreas = $('#svg-hit-areas a').each(function(e) {
		
		var $hitArea   = $(this);
			//graphicID  = this.hash;//hitAreaHash.replace('#',''),
			//svgGraphic = svgFile.select(graphicID);

		// console.log("hit area: " + $hitArea.attr('id') + ", graphic: " + graphicID);

		$hitArea.click(function(e) {
			
			var graphicID  = this.hash,
				$svgGraphic = $(graphicID);

			console.log("area clicked!: " + graphicID);

			// Deactivate other active elements
			deactivateActiveGraphics();

			// Activate current svg graphic
			$svgGraphic.attr("class", "active-graphic");

			//activateGraphic(svgGraphic);
			showPopup($hitArea);

			e.stopPropagation();
			e.preventDefault();
			return false;
		});
	});

	// Remove active areas when clicking on the whole graphic
	$(document).click(function(e) {
		$('.active-graphic').removeAttr("class");
		//var $popupPane = $('.leaflet-popup-pane').remove();

		// Remove old popups
		$popupPane.html('');
	});

	// // Solutions
	// boy1 	 	= svgFile.select("#Boy_x5F_1"),
	// boy2 		= svgFile.select("#Boy_x5F_2"),
	// girl 		= svgFile.select("#Girl"),
	// bottle   	= svgFile.select("#Bottle"),
	
	// // Problems
	// lamp 		= svgFile.select("#Lamp"),
	// cabinet 	= svgFile.select("#Cabinet_x5F_Open"),
	// counter 	= svgFile.select("#Counter_x5F_Open"),
	// laptop 		= svgFile.select("#Laptop"),
	// wc 			= svgFile.select("#WC"),
	// sink 		= svgFile.select("#Sink");

	// // Solutions
	// boy1.click(onElementClicked);
	// boy2.click(onElementClicked);
	// girl.click(onElementClicked);
	// bottle.click(onElementClicked);

	// // Problems
	// lamp.click(onElementClicked);
	// cabinet.click(onElementClicked);
	// counter.click(onElementClicked);
	// laptop.click(onElementClicked);
	// wc.click(onElementClicked);
	// sink.click(onElementClicked);
}

function deactivateActiveGraphics() {
	$('.active-graphic').removeAttr("class");
}

function showPopup($area) {

	// Add popup in this position
	var x = $area.position().left + 0.35*$area.width(),
		y = $area.position().top;

	console.log("show popup for area: " + $area.attr('id') + ", x: " + x + ", y: " + y);
	
	// Remove old popups
	removePopups();

	// Create new popup
	var $popup = $('<div class="leaflet-popup leaflet-zoom-animated" style="transform: translate3d('+x+'px, '+y+'px, 0px); bottom: 27px; left: -82px;"><a class="leaflet-popup-close-button" href="#close">×</a><div class="leaflet-popup-content-wrapper"><div class="leaflet-popup-content" style="width: 133px;"><h4>House</h4><p>This is our house!</p></div></div><div class="leaflet-popup-tip-container"><div class="leaflet-popup-tip"></div></div></div>');
	$popupPane.html($popup);

	setTimeout(function() {
		$popup.css({opacity: 1});
	}, 0);
}

function removePopups() {
	$popupPane.html('');
}

////////////////////////////////
// SVG Functions - DEPRECATED
////////////////////////////////

var onElementClicked = function(evt) {

	// Deactivate other active elements
	$('.active-graphic').removeAttr("class");

	activateGraphic(this);
	
	showPopup(this, evt);
	evt.stopPropagation();
}

// function showPopup(graphic, evt) {

// 	//alert("show popup");

// 	var $this = $(graphic.node),
// 		bbox  = $this[0].getBBox();

// 	// var c = svg.circle(bbox.x, bbox.y, 10);
// 	// c.attr({
// 	//     fill: '#f00'
// 	// });

// 	//console.log("Element coordinates - x: " + bbox.x + ", y: " + bbox.y);

// 	// Add popup in this position
// 	var x = evt.x - 185, // bbox.x,
// 		y = evt.y - 50; // bbox.y;
	
// 	// Remove old popups
// 	$popupPane.html('');

// 	// Create new popup
// 	$popupPane.append('<div class="leaflet-popup leaflet-zoom-animated" style="opacity: 1; transform: translate3d('+x+'px, '+y+'px, 0px); bottom: 27px; left: -82px;"><a class="leaflet-popup-close-button" href="#close">×</a><div class="leaflet-popup-content-wrapper"><div class="leaflet-popup-content" style="width: 133px;"><h4>House</h4><p>This is our house!</p></div></div><div class="leaflet-popup-tip-container"><div class="leaflet-popup-tip"></div></div></div>');
// }

function activateGraphic(graphic) {

	// "node" selects the DOM element. 
	// then we can wrap it into a jQuery element ($)
	var $this = $(graphic.node);
	$this.attr("class", "active-graphic");

	//console.log($this[0].getBBox());
	// console.log("$this - x: " + $this.offset.x + ", y: " + $this.offset.y);

	//changeColor(graphic, selectedStroke, selectedFill, selectedFillOpacity);
	// var trans = new Snap.Matrix();
	// trans.translate(0, -200);
	// graphic.select('g').animate({ transform: transform.toTransformString() }, 500);
}

function animateTest() {
	
	var myMatrix = new Snap.Matrix();
	myMatrix.scale(1.2, 1.2);            // play with scaling before and after the rotate 
	myMatrix.translate(30,-250);      // this translate will not be applied to the rotation

	s.select('g').animate({ transform: myMatrix.toTransformString() }, 1000);  // probably not needed
}