// this function makes it easy to add an external SVG and apply some basic styling to it. 
// you can append the SVg to a svg or div tag via its id.

// this is an example of how to call the function:
// addSVG("exampleSVG","#testID_01","red","blue",0.5);

function addSVG(svgSource,appendTo,strokeColor,fillColor,fillOpacity)	{
	
	var s = Snap(appendTo);
	
	Snap.load(svgSource, function (f) {

	    f.selectAll("line").attr({fill:fillColor, "fill-opacity":fillOpacity, stroke:strokeColor});
	    f.selectAll("path").attr({fill:fillColor, "fill-opacity":fillOpacity, stroke:strokeColor});
	    f.selectAll("polygon").attr({fill:fillColor, "fill-opacity":fillOpacity, stroke:strokeColor});
	    f.selectAll("polyline").attr({stroke: strokeColor, stroke:strokeColor});

	    var g = f.select("g");
	    s.append(g);
	});

	return s;
}

function changeColor(f, strokeColor, fillColor, fillOpacity) {

	f.selectAll("line").attr({fill:fillColor, "fill-opacity":fillOpacity, stroke:strokeColor});
	f.selectAll("path").attr({fill:fillColor, "fill-opacity":fillOpacity, stroke:strokeColor});
	f.selectAll("polygon").attr({fill:fillColor, "fill-opacity":fillOpacity, stroke:strokeColor});
	f.selectAll("polyline").attr({stroke: strokeColor, stroke:strokeColor});
}