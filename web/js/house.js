window.onload = function () {

	var s = Snap("#house");
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
			lamp = f.select("#Lamp").drag();

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
		
		floor2.click(function() {
			animateTest();
		});

		boy1.click(function() {
			changeColor(this, "#fff", "#f00", 0.5);
		});

		boy2.click(function() {
			changeColor(this, "#fff", "#f00", 0.5);
		});

		girl.click(function() {
			changeColor(this, "#fff", "#f00", 0.5);
		});

		//top.add(gr);
		s.append(gr);
	});

	//////////////////////
	// Floor Navigation
	//////////////////////

	function animateTest() {
		
		var myMatrix = new Snap.Matrix();
		myMatrix.scale(1.2, 1.2);            // play with scaling before and after the rotate 
		myMatrix.translate(30,-250);      // this translate will not be applied to the rotation

		s.select('g').animate({ transform: myMatrix.toTransformString() },1000);  // probably not needed
	}
};