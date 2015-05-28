
// Initialize map
var map = L.map('map').setView([52.4619, 13.3825], 14);

// Add tile layer
L.tileLayer('http://{s}.tiles.mapbox.com/v3/jorditost.2116a83e/{z}/{x}/{y}.png', {
//L.tileLayer('http://{s}.tiles.mapbox.com/v3/cmuench.lehj4pcp/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    //attributionControl: false,
    zoomControl: false
    //maxZoom: 18
}).addTo(map);

// Disable drag and zoom handlers.
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();

// Simple Marker (Good for Performance)
var marker = new L.Circle([52.459555,13.3820], 20, {
	fillColor: "#ff7800",
	color: "#000",
	fillOpacity: 1.0
}).addTo(map);

// Popups
marker.bindPopup("This is our house.");

/*// Marker
var marker = L.marker([51.5, -0.09]).addTo(map);

// Circle
var circle = L.circle([51.508, -0.11], 500, { // 500 is the radius in meters
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5
}).addTo(map);

// Polygon
var polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map);

// Popups
marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

// Popups as layer
var popup = L.popup()
    .setLatLng([51.5, -0.09])
    .setContent("I am a standalone popup.")
    .openOn(map);

// Events
function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);*/