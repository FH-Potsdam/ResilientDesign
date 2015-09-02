
//////////////
// SVG Vars
//////////////

var s;

////////////
// Colors
////////////

var problemsStroke 		 = "#F3C262",
	problemsFill   		 = "#99622D",
	problemsFillOpacity  = 1,

	solutionsStroke 	 = "#46B177",
	solutionsFill   	 = "#518265",
	solutionsFillOpacity = 1,

	selectedStroke		 = "#FFF",
	selectedFill		 = "#CCC",
	selectedFillOpacity	 = 1;

//////////////////
// Init on load
//////////////////

window.onload = function () {

	s = Snap("#house");
	s.attr({
	    //viewBox: [0, 0, 840, 600]
	    width: "100%",
	    height: "100%"
	});

	// Snap.load("images/mascot.svg", function (f) {
	Snap.load("images/house/3rd_Floor_WG_Active.svg", function (f) {

		var gr = f.select("g"),
			floor2 = f.select("#apartment_x5F_Inactive");
			boy1 = f.select("#Boy_x5F_1"),
			boy2 = f.select("#Boy_x5F_2"),
			girl = f.select("#Girl"),
			lamp = f.select("#Lamp");

			//top = s.g();

		//gr.drag();

		// Transform
		var myMatrix = new Snap.Matrix();
		myMatrix.scale(1.2, 1.2);            // play with scaling before and after the rotate 
		myMatrix.translate(30,50);      // this translate will not be applied to the rotation
		// myMatrix.rotate(45);            // rotate
		// gr.animate({ transform: myMatrix.toTransformString() },1000);  // probably not needed
		gr.attr({transform: myMatrix});

		/////////////////
		// Interaction
		/////////////////
		
		floor2.click(function(e) {
			animateTest();
		});

		boy1.click(function(e) {
			activateGraphic(this);

			// var mySVG = document.querySelector('#Boy_x5F_1');
			// mySVG.addClass("active-graphic");

			e.stopPropagation();
		});

		boy2.click(function(e) {
			activateGraphic(this);
			e.stopPropagation();
		});

		girl.click(function(e) {
			activateGraphic(this);
			e.stopPropagation();
		});

		$(this).click(function(e) {

		});

		//top.add(gr);
		s.append(gr);
	});
};

///////////////////
// SVG Functions
///////////////////

function activateGraphic(graphic, activate) {

	if (typeof activate === 'undefined') activate = true;

	if (activate) {
		changeColor(graphic, selectedStroke, selectedFill, selectedFillOpacity);

		// var trans = new Snap.Matrix();
		// trans.translate(0, -200);
		// graphic.select('g').animate({ transform: transform.toTransformString() }, 500);
	} else {
		changeColor(graphic, solutionsStroke, solutionsFill, solutionsFillOpacity);
	}
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