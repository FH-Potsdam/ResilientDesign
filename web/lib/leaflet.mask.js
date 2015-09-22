// credits: https://github.com/turban/Leaflet.Mask
L.Mask = L.Polygon.extend({
    options: {
        stroke: false,
        color: '#000',
        fillOpacity: 0.5,
        clickable: false,

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