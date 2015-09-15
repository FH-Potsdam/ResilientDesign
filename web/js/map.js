//////////
// MASK
//////////    

// Polygon created with http://geojson.io/
var tempelhof = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              13.376820087432861,
              52.461540053532474
            ],
            [
              13.375425338745117,
              52.455551741825815
            ],
            [
              13.376605510711668,
              52.45424414186043
            ],
            [
              13.379781246185303,
              52.45536868016808
            ],
            [
              13.380725383758545,
              52.45492409868811
            ],
            [
              13.384137153625488,
              52.45462334984769
            ],
            [
              13.383944034576416,
              52.45576095421711
            ],
            [
              13.386840820312498,
              52.456440887624154
            ],
            [
              13.38735580444336,
              52.45882057187122
            ],
            [
              13.387699127197264,
              52.45887287117959
            ],
            [
              13.387892246246338,
              52.459042843502665
            ],
            [
              13.387763500213623,
              52.45929126340994
            ],
            [
              13.387506008148193,
              52.45939586084633
            ],
            [
              13.387763500213623,
              52.460559490566915
            ],
            [
              13.381733894348145,
              52.46112168267169
            ],
            [
              13.381626605987549,
              52.461330868599035
            ],
            [
              13.381218910217285,
              52.46142238712973
            ],
            [
              13.380961418151854,
              52.4613439426865
            ],
            [
              13.38083267211914,
              52.4612132016372
            ],
            [
              13.376820087432861,
              52.461540053532474
            ]
          ]
        ]
      }
    }
  ]
};


////////////////////
// Initialize map
////////////////////

var map = L.map('map').setView([52.4548, 13.3815], 16);

// Add tile layer
L.tileLayer('http://{s}.tiles.mapbox.com/v3/jorditost.2116a83e/{z}/{x}/{y}.png', {
//L.tileLayer('http://{s}.tiles.mapbox.com/v3/cmuench.lehj4pcp/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://mapbox.com">Mapbox</a>',
    //attributionControl: false,
    zoomControl: false,
    maxZoom: 16,
    minZoom: 16
    //maxZoom: 18
}).addTo(map);


////////////
// Events
////////////

// Disable drag and zoom handlers.
map.dragging.disable();
map.touchZoom.disable();
map.doubleClickZoom.disable();
map.scrollWheelZoom.disable();

// Disable tap handler, if present.
if (map.tap) map.tap.disable();


//////////
// Mask
//////////

// transform geojson coordinates into an array of L.LatLng
var coordinates = tempelhof.features[0].geometry.coordinates[0];
var latLngs = [];
for (i=0; i<coordinates.length; i++) {
    latLngs.push(new L.LatLng(coordinates[i][1], coordinates[i][0]));
}

L.mask(latLngs).addTo(map);


/////////////
// Markers
/////////////

var layerProblems,
    layerSolutions;

function onMarkersDataLoaded() {

    for (var i=0; i<markersData['STD03'].markers.length; i++) {

        var markerObj = markersData['STD03'].markers[i];
        console.log(markerObj);

        // Add marker
        var marker = new L.marker([markerObj.lat, markerObj.lng]);
        marker.addTo(map);

        // Add popup
        var popup = new L.Popup();
        popup.setContent('<h4>'+markerObj.title+'</h4><p>'+markerObj.text+'</p>');
        marker.bindPopup(popup);

        

        // Simple Marker (Good for Performance)
        // var marker = new L.Circle([markerObj.lat, markerObj.lng], 20, {
        //     fillColor: "#ff7800",
        //     color: "#000",
        //     fillOpacity: 1.0
        // }).addTo(map);
    }

    // // Simple Marker (Good for Performance)
    // var marker = new L.Circle([52.459555,13.3820], 20, {
    //     fillColor: "#ff7800",
    //     color: "#000",
    //     fillOpacity: 1.0
    // }).addTo(map);

    // // Popups
    // marker.bindPopup("This is our house.");
}

var markersData = [];

$(document).ready(function (){

    $.getJSON( "data/RD_mapMarkers.json", function(data) {

        console.log("Markers data successfully loaded!")

        // Parse JSON
        $.each( data, function( key, item ) {
            markersData[item.id] = item;
        });

        onMarkersDataLoaded();
    });
});





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