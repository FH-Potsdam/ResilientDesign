
////////////////////////
// House View Scripts
////////////////////////

// SVG Vars
var svg,
	g,
	// Solutions
	boy1,
	boy2,
	girl,
	bottle,
	// Problems
	lamp,
	cabinetOp,
	cabinetCl,
	counterOp,
	counterCl,
	laptop,
	wc,
	sink;
	
// Floor vars
var $houseSlider,
	$floorNavItems,
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

		console.log("oldFloor: " + oldFloor);
		console.log("currentFloor: " + currentFloor);
		
		// Change view animation
		//changeView(currentView);

		//hideContent();
		updateContent(currentTime);

		goToFloor(currentFloor);

		e.preventDefault();
		return false;
	});
}

function goToFloor(strFloor) {

	// Animate slider
	$houseSlider.attr('class', strFloor + '-active');

	$houseSlider.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function(e) {
					
					//showContent(currentTime);

					// Reset old active floor
					//var $oldFloor = $floorNavItems.filter('.active').addClass('fadeOut')
					// $floorNavItems.filter('.active').removeClass('active');
					
					// Deactivate events for active floor
					//$floorNavItems.filter('a[href$="' + currentFloor + '"]').addClass('active');
					$(this).off(e);
				});
}


//////////////////
// Init on load
//////////////////

window.onload = function () {

	$houseSlider = $('#house-slider');

	// Floor navigation
	initFloorNavigation();

	// SVG Interaction
	svg = Snap("#house");
	// s.attr({
	//     //viewBox: [0, 0, 840, 600]
	//     width: "100%",
	//     height: "100%"
	// });

	// Snap.load("images/house/3rd_Floor_WG_Active.svg", function (f) {
	Snap.load("images/house/optimised.svg", function (f) {

		g 			= f.select("g"),
		//floor2  	= f.select("#apartment_x5F_Inactive"),

		// Solutions
		boy1 	 	= f.select("#Boy_x5F_1"),
		boy2 		= f.select("#Boy_x5F_2"),
		girl 		= f.select("#Girl"),
		bottle   	= f.select("#Bottle"),
		
		// Problems
		lamp 		= f.select("#Lamp"),
		cabinetOp 	= f.select("#Cabinet_x5F_Open"),
		cabinetCl 	= f.select("#Cabinet_x5F_Closed"),
		counterOp 	= f.select("#Counter_x5F_Open"),
		counterCl 	= f.select("#Counter_x5F_Closed"),
		laptop 		= f.select("#Laptop"),
		wc 			= f.select("#WC"),
		sink 		= f.select("#Sink");

		// console.log(g.getBBox().x);
		// console.log(g.getBBox().y);

		//g.drag();

		// Transform
		var myMatrix = new Snap.Matrix();
		myMatrix.scale(1.2, 1.2);            // play with scaling before and after the rotate 
		myMatrix.translate(30,50);      // this translate will not be applied to the rotation
		// myMatrix.rotate(45);            // rotate
		// g.animate({ transform: myMatrix.toTransformString() },1000);  // probably not needed
		g.attr({transform: myMatrix});

		/////////////////
		// Interaction
		/////////////////
		
		// floor2.click(function(e) {
		// 	animateTest();
		// });

		// Solutions
		boy1.click(onElementClicked);
		boy2.click(onElementClicked);
		girl.click(onElementClicked);
		bottle.click(onElementClicked);

		// Problems
		lamp.click(onElementClicked);
		cabinetOp.click(onElementClicked);
		counterOp.click(onElementClicked);
		laptop.click(onElementClicked);
		wc.click(onElementClicked);
		sink.click(onElementClicked);

		// Click on the whole graphic
		$(document).click(function(e) {
			$('.active-graphic').removeAttr("class");
			var $popupPane = $('.leaflet-popup-pane').remove();
		});

		// Add loaded graphic (g) to svg element (svg)
		//top.add(gr);
		svg.append(g);
	});
};

/////////////////////////
// Click Event Handler
/////////////////////////

var onElementClicked = function(evt) {

	activateGraphic(this);
	showPopup(this, evt);
	evt.stopPropagation();
	
	// Check http://snapsvg.io/docs/#Element.getBBox()
	//console.log("x: " + this.getBBox().x + ", y: " + this.getBBox().y);
	//console.log("Click coordinates - x: " + evt.x + ", y: " + evt.y);

	// var c = svg.circle(evt.x, evt.y, 10);
	// c.attr({
	//     fill: '#f00'
	// });
}

function showPopup(graphic, evt) {

	var $this = $(graphic.node),
		bbox  = $this[0].getBBox();

	// var c = svg.circle(bbox.x, bbox.y, 10);
	// c.attr({
	//     fill: '#f00'
	// });

	//console.log("Element coordinates - x: " + bbox.x + ", y: " + bbox.y);

	// Add popup in this position
	var x = evt.x - 185, // bbox.x,
		y = evt.y - 50; // bbox.y;

	// Remove old popups
	var $popupPane = $('.leaflet-popup-pane').remove();

	// Create new pane
	$popupPane = $('<div class="leaflet-popup-pane"><div class="leaflet-popup  leaflet-zoom-animated" style="opacity: 1; transform: translate3d('+x+'px, '+y+'px, 0px); bottom: 27px; left: -82px;"><a class="leaflet-popup-close-button" href="#close">×</a><div class="leaflet-popup-content-wrapper"><div class="leaflet-popup-content" style="width: 133px;"><h4>House</h4><p>This is our house!</p></div></div><div class="leaflet-popup-tip-container"><div class="leaflet-popup-tip"></div></div></div></div>');
		//$popup = $popupPane.find('leaflet-popup').css({left: evt.x+"px", top: evt.y+"px"});

	$('#house-view').append($popupPane);
}

///////////////////
// SVG Functions
///////////////////

function activateGraphic(graphic) {

	// Deactivate other active elements
	$('.active-graphic').removeAttr("class");

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

//////////////////////
// Floor Navigation
//////////////////////

function animateTest() {
	
	var myMatrix = new Snap.Matrix();
	myMatrix.scale(1.2, 1.2);            // play with scaling before and after the rotate 
	myMatrix.translate(30,-250);      // this translate will not be applied to the rotation

	s.select('g').animate({ transform: myMatrix.toTransformString() }, 1000);  // probably not needed
}