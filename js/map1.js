$(document).ready(function () {
  // Initialize the Leaflet map
  var map = L.map("map").setView([20, 0], 2);

  // Add a base layer (OpenStreetMap tiles)
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    noWrap: true,
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  // Define bounds to restrict the map view
  var southWest = L.latLng(-90, -180),
      northEast = L.latLng(90, 180);
  var bounds = L.latLngBounds(southWest, northEast);
  map.setMaxBounds(bounds);

  // Function to change the style of the feature on hover
  function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
      fillColor: 'pink', // Set the fill color to pink on hover
      fillOpacity: 0.7,  // Adjust the opacity
      weight: 1          // Keep the border weight as 1
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  // Function to reset the style on mouseout
  function resetHighlight(e) {
    geojson.resetStyle(e.target);
  }

  // Function to handle click on feature (e.g., country)
  function onClick(e) {
    var layer = e.target;
    // Remove the border when clicked
    layer.setStyle({ weight: 0 });

    // Fetch GDP growth data and update the tooltip content
    if (e.target.feature.properties && e.target.feature.properties.name) {
      getAndDisplayGDPGrowth(e.target.feature.properties.name, layer);
    }
  }

  // Function to handle mouseover on feature (e.g., country)
  function onFeatureHover(e) {
    var layer = e.target;
    var countryName = layer.feature.properties.name;

    console.log("Hovering over country: " + countryName); // Debugging log

    // Fetch GDP growth data and update the tooltip content
    getAndDisplayGDPGrowth(countryName, layer);
  }

  // Function to handle each feature (e.g., country) in the GeoJSON data
  function onEachFeature(feature, layer) {
    // Bind a tooltip to the layer
    layer.bindTooltip("", {
      permanent: false,
      direction: "auto",
      sticky: true, // Make the tooltip follow the cursor
    });

    // Event handlers for mouseover, mouseout, and click
    layer.on('mouseover', onFeatureHover);
    layer.on('mouseout', resetHighlight);
    layer.on('click', onClick);
  }

  var geojson; // Define a variable to hold your GeoJSON layer
  // Load the GeoJSON file and add it to the map
  $.getJSON("../data/gj.geojson", function (geoJsonData) {
    geojson = L.geoJSON(geoJsonData, {
      style: function (feature) {
        return { color: 'black', weight: 1, fillColor: 'white', fillOpacity: 1 }; // Set initial style of countries
      },
      onEachFeature: onEachFeature,
    }).addTo(map);
  });

  // Function to fetch GDP growth data and display it
  function getAndDisplayGDPGrowth(place, layer) {
    fetch(`https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(place)}`, {
      method: "GET",
      headers: {
        "X-Api-Key": "hNz6dyYaOqoKdeP8mjKziQ==CALsnFzlcI5CPkt3" // Replace with your actual API key
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data && data.length > 0) {
        const countryName = data[0].name; // Accessing the name
        const gdpGrowth = data[0].gdp_growth; // Accessing the gdp_growth
        const gdp = data[0].gdp; // Accessing the gdp

        // Dynamically update the tooltip content and position
        layer.bindTooltip(`Country: ${countryName}, GDP: ${gdp}, GDP Growth: ${gdpGrowth}%`).openTooltip(layer.getLatLng());
      } else {
        console.error("No data found for:", place);
        layer.setTooltipContent("Data not available");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      layer.setTooltipContent("Error fetching data");
    });
  }
});
