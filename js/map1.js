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

  // Function to handle each feature (e.g., country) in the GeoJSON data
  function onEachFeature(feature, layer) {
    // Bind a tooltip to the layer but don't set any content yet
    layer.bindTooltip("", {
      permanent: false,
      direction: "auto",
      sticky: true, // Make the tooltip follow the cursor
    });

    layer.on("mousemove", function (e) {
      // Fetch GDP growth data and update the tooltip content
      if (feature.properties && feature.properties.name) {
        getAndDisplayGDPGrowth(feature.properties.name, layer);
      }
    });

    layer.on("mouseout", function () {
      layer.closeTooltip(); // Close the tooltip when the mouse leaves the country's area
    });
  }

  // Load the GeoJSON file and add it to the map
  $.getJSON("../data/gj.geojson", function (geoJsonData) {
    L.geoJSON(geoJsonData, {
      style: function (feature) {
        return { weight: 0 }; // Set border weight to 0 to remove it
      },
      onEachFeature: onEachFeature,
    }).addTo(map);
  });

  // Function to fetch GDP growth data and display it
  // Adjusted function to display the tooltip at a given latitude and longitude (latlng)
  function getAndDisplayGDPGrowth(place, layer) {
    fetch(`https://api.api-ninjas.com/v1/country?name=Malaysia`, {
      method: "GET",
      headers: {
        "X-Api-Key": "hNz6dyYaOqoKdeP8mjKziQ==CALsnFzlcI5CPkt3", // Use your actual API key
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Log the API response to the console
        if (data && data.length > 0) {
          const countryName = data[0].name; // Accessing the name
          const gdpGrowth = data[0].gdp_growth; // Accessing the gdp_growth
          // Dynamically update the tooltip content and position based on cursor movement
          layer
            .bindTooltip(`Country: ${countryName}, GDP Growth: ${gdpGrowth}%`)
            .openTooltip();
        } else {
          console.error("No data found for:", place);
          layer.setTooltipContent("Data not available");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        layer.setTooltipContent("Error fetching data");
      });
  }
});
