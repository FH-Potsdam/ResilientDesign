// *********************************************************************
// MAPBOX STREETS
// *********************************************************************

// =====================================================================
// FONTS
// =====================================================================

// Language
@name: '[name]';

// set up font sets for various weights and styles
@sans_lt:           "Mark Offc Pro Regular","Arial Unicode MS Regular";
@sans_lt_italic:    "Mark Offc Pro Italic","Arial Unicode MS Regular";
@sans:              "Mark Offc Pro Medium","Arial Unicode MS Regular";
@sans_bold:         "Mark Offc Pro Bold","Arial Unicode MS Regular";
@sans_italic:       "Mark Offc Pro Bold Italic","Arial Unicode MS Regular";
@sans_bold_italic:  "Mark Offc Pro Heavy Italic","Arial Unicode MS Regular";

/*@sans_lt:           "Gotham Narrow Light","Arial Unicode MS Regular";
@sans_lt_italic:    "Gotham Narrow Light Italic","Arial Unicode MS Regular";
@sans:              "Gotham Narrow Book","Arial Unicode MS Regular";
@sans_italic:       "Gotham Narrow Book Italic","Arial Unicode MS Regular";
@sans_bold:         "Gotham Narrow Medium","Arial Unicode MS Regular";
@sans_bold_italic:  "Gotham Narrow Medium Italic","Arial Unicode MS Regular";*/

// =====================================================================
// LANDUSE & LANDCOVER COLORS
// =====================================================================

//@land:              #ecf0f1;

@land:              #1f232f;
@road:              #212121;

@water:             #476486;
@grass:             #363f53;
@sand:              #7f8c8d;
@rock:              #D8D7D5;
@park:              @grass; //#C8DF9F;
@cemetery:          @grass; //#D5DCC2;
@wooded:            @grass; //#3A6;
@industrial:        @land; //#DDDCDC;
@agriculture:       @land; //#EAE0D0;
@snow:              @land; //#EDE5DD;

@building:          #2e3852;//darken(@land, 8);
@hospital:          @building; //mix(#cd3d2e, @land, 20); //#e8d4d9; //@land; //#F2E3E1;
@school:            mix(@water, @land, 80); //mix(#f19e0f, @land, 40); //#cec2ad; //@land; //#F2EAB8;
@pitch:             @grass; //#CAE6A9;
@sports:            @park;

@parking:           fadeout(@road_fill, 75%);


// =====================================================================
// ROAD COLORS
// =====================================================================

// For each class of road there are three color variables:
// - line: for lower zoomlevels when the road is represented by a
//         single solid line.
// - case: for higher zoomlevels, this color is for the road's
//         casing (outline).
// - fill: for higher zoomlevels, this color is for the road's
//         inner fill (inline).

@motorway_line:     @road;//#fff;
@motorway_fill:     @road;//#fff;
@motorway_case:     @road;//#000;

@main_line:     @road;//#fff;
@main_fill:     @road;//#fff;
@main_case:     #000;

@road_line:     @road;//#fff;
@road_fill:     @road;//#fff;
@road_case:     #000;

@pedestrian_line:   @road;//#fff;
@pedestrian_fill:   @pedestrian_line;
@pedestrian_case:   @road_case;

@path_line:     @road;//#fff;
@path_fill:     @road;//#fff;
@path_case:     @land;

@rail_line:     #f1c40f; //#aaa;
@rail_fill:     #fff;
@rail_case:     @land;

@bridge_case:   #999;

@aeroway:       lighten(@industrial,5);

// =====================================================================
// BOUNDARY COLORS
// =====================================================================

@admin_2:           #234;
@admin_3:           #345;
@admin_4:           #345;

// =====================================================================
// LABEL COLORS
// =====================================================================

// We set up a default halo color for places so you can edit them all
// at once or override each individually.
@place_text:        #fff;
@place_halo:        #111;//#fff;

@country_text:      @place_text;//@land * 0.2;
@country_halo:      @place_halo;

@state_text:        @place_text;//#666;
@state_halo:        @place_halo;

@city_text:         @place_text;//@land * 0.1;
@city_halo:         @place_halo;

@town_text:         @place_text;//@land * 0.2;
@town_halo:         @place_halo;

@poi_text:          @poi_text;  

@road_text:         @place_text;//#666;
@road_halo:         @place_halo;//#fff;

@other_text:        darken(@land,50)*0.8;
@other_halo:        @place_halo;

@locality_text:     @place_text;//#aaa;
@locality_halo:     @place_halo;//@land;

// Also used for other small places: hamlets, suburbs, localities
@village_text:      @place_text;//#888;
@village_halo:      @place_halo;

@water_text:        @place_text;
@water_halo:        @place_halo;

@transport_text:    @place_text;//#445;
@transport_halo:    @place_halo;
/**/