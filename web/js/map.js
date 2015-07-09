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

// credits: https://github.com/turban/Leaflet.Mask
L.Mask = L.Polygon.extend({
    options: {
        stroke: false,
        color: '#333',
        fillOpacity: 0.5,
        clickable: true,

        outerBounds: new L.LatLngBounds([-90, -360], [90, 360])
    },

    initialize: function (latLngs, options) {
        
         var outerBoundsLatLngs = [
            this.options.outerBounds.getSouthWest(),
            this.options.outerBounds.getNorthWest(),
            this.options.outerBounds.getNorthEast(),
            this.options.outerBounds.getSouthEast()
        ];
        L.Polygon.prototype.initialize.call(this, [outerBoundsLatLngs, latLngs], options);  
    },

});
L.mask = function (latLngs, options) {
    return new L.Mask(latLngs, options);
};



// Initialize map
var map = L.map('map').setView([52.4574, 13.3820], 16);

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

// transform geojson coordinates into an array of L.LatLng
var coordinates = tempelhof.features[0].geometry.coordinates[0];
var latLngs = [];
for (i=0; i<coordinates.length; i++) {
    latLngs.push(new L.LatLng(coordinates[i][1], coordinates[i][0]));
}

L.mask(latLngs).addTo(map);
    


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