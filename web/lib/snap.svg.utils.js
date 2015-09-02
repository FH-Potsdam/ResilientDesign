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

/////////////////
// Class Utils
/////////////////

// SVGElement.prototype.hasClass = function (className) {
//   return new RegExp('(\\s|^)' + className + '(\\s|$)').test(this.getAttribute('class'));
// };

// SVGElement.prototype.addClass = function (className) {
//   if (!this.hasClass(className)) {
//     this.setAttribute('class', this.getAttribute('class') + ' ' + className);
//   }
// };

// SVGElement.prototype.removeClass = function (className) {
//   var removedClass = this.getAttribute('class').replace(new RegExp('(\\s|^)' + className + '(\\s|$)', 'g'), '$2');
//   if (this.hasClass(className)) {
//     this.setAttribute('class', removedClass);
//   }
// };

// SVGElement.prototype.toggleClass = function (className) {
//   if (this.hasClass(className)) {
//     this.removeClass(className);
//   } else {
//     this.addClass(className);
//   }
// };