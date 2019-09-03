// Create the tile layer that will be the background of our map
var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
});

// Initialize all of the LayerGroups we'll be using
var layers = {
  POSSIBLE_INJURY: new L.LayerGroup(),
  EVIDENT_INJURY: new L.LayerGroup(),
  NO_INJURY: new L.LayerGroup(),
  DISABLING_INJURY: new L.LayerGroup(),
  KILLED: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [35.91, -79.05],
  zoom: 12,
  layers: [
    layers.POSSIBLE_INJURY,
    layers.EVIDENT_INJURY,
    layers.NO_INJURY,
    layers.DISABLING_INJURY,
    layers.KILLED
  ]
});

// Add our 'lightmap' tile layer to the map
lightmap.addTo(map);

// Create an overlays object to add to the layer control
var overlays = {
  "Possible Injury": layers.POSSIBLE_INJURY,
  "Evident Injury": layers.EVIDENT_INJURY,
  "No Injury": layers.NO_INJURY,
  "Disabling Injury": layers.DISABLING_INJURY,
  "Killed": layers.KILLED
};

// Create a control for our layers, add our overlay layers to it
L.control.layers(null, overlays).addTo(map);

// Create a legend to display information about our map
var info = L.control({
  position: "bottomright"
});

// When the layer control is added, insert a div with the class of "legend"
info.onAdd = function() {
  var div = L.DomUtil.create("div", "legend");
  return div;
};
// Add the info legend to the map
info.addTo(map);

// Initialize an object containing icons for each layer group
var icons = {
  POSSIBLE_INJURY: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "blue",
    shape: "circle"
  }),
  EVIDENT_INJURY: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "orange",
    shape: "circle"
  }),
  NO_INJURY: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "green",
    shape: "circle"
  }),
  DISABLING_INJURY: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "red",
    shape: "circle"
  }),
  KILLED: L.ExtraMarkers.icon({
    icon: "ion-android-bicycle",
    iconColor: "white",
    markerColor: "black",
    shape: "circle"
  })
};


  // When the first API call is complete, perform another call to the Citi Bike crashInjury Status endpoint
d3.json("https://www.chapelhillopendata.org/api/records/1.0/search/?dataset=bicycle-crash-data-chapel-hill-region&rows=300", function(bikeInjuryOutcome) {
  //var updatedAt = injuryOutcome.last_updated;
var injuryRecord = bikeInjuryOutcome.records;
//var locationInfoLat = bikeInjuryOutcome.records[0].record.fields.geo_point_2d.lat;
//var locationInfoLon = bikeInjuryOutcome.records[0].record.fields.geo_point_2d.lon;

  
console.log(injuryRecord)
    // Create an object to keep of the number of markers in each layer
  var crashInjuryCount = {
    POSSIBLE_INJURY: 0,
    EVIDENT_INJURY: 0,
    NO_INJURY: 0,
    DISABLING_INJURY: 0,
    KILLED: 0
  };

    // Initialize a injuryOutcomeCode, which will be used as a key to access the appropriate layers, icons, and crashInjury count for layer group
  var injuryOutcomeCode;
  var injuryStatus;
  var locationInfo;
 
  

    // Loop through the crashInjurys (they're the same size and have partially matching data)
  for (var i = 0; i < injuryRecord.length; i++) {
    

    var injuryStatus = injuryRecord[i].fields.bike_injur;
    var locationInfo = injuryRecord[i].fields.geo_point_2d;
      console.log(locationInfo)

      // Create a new crashInjury object with properties of both crashInjury objects
    var crashInjury = Object.assign({}, locationInfo[i], injuryStatus[i]);
      // Crash is possible injury
    if (injuryStatus == "K: Killed") {
      injuryOutcomeCode = "KILLED";
      }
      // Crash resulted in evident injury
    else if (injuryStatus == "B: Evident Injury") {
      injuryOutcomeCode = "EVIDENT_INJURY";
      }
      // Crash resulted in no injury
    else if (injuryStatus == "O: No Injury") {
      injuryOutcomeCode = "NO_INJURY";
      }
      // Crash resulted in disabling injury
    else if (injuryStatus == "A: Disabling Injury") {
      injuryOutcomeCode = "DISABLING_INJURY";
      }
      // Otherwise the crashInjury is normal
    else {
      injuryOutcomeCode = "POSSIBLE_INJURY";
      }
      
      // Update the crashInjury count
    crashInjuryCount[injuryOutcomeCode]++;
      // Create a new marker with the appropriate icon and coordinates
    var newMarker = L.marker(locationInfo, {
      icon: icons[injuryOutcomeCode]
      });
   
      // Add the new marker to the appropriate layer
    newMarker.addTo(layers[injuryOutcomeCode]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
    newMarker.bindPopup("Injury Status:" + injuryStatus);
    }

    // Call the updateLegend function, which will... update the legend!
  updateLegend(crashInjuryCount);
});

// Update the legend's innerHTML with the last updated time and crashInjury count
function updateLegend(crashInjuryCount) {
  document.querySelector(".legend").innerHTML = [
    "<p class='possible_injury'>Possible Injury Count: " + crashInjuryCount.POSSIBLE_INJURY + "</p>",
    "<p class='evident_injury'>Evident Injury Count: " + crashInjuryCount.EVIDENT_INJURY + "</p>",
    "<p class='no_injury'>No injury count: " + crashInjuryCount.NO_INJURY + "</p>",
    "<p class='disabling_injury'>Disabling injury count: " + crashInjuryCount.DISABLING_INJURY + "</p>",
    "<p class='killed'>Killed Count: " + crashInjuryCount.KILLED + "</p>"
  ].join("");
}
