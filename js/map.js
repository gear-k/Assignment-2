$(document).ready(function () {
  var geojson; // Moved outside to make it globally accessible
  var map = L.map("map", {
    maxBounds: [
      [-85, 180],
      [85, -180],
    ],
    maxBoundsViscosity: 1.0, // Prevents users from dragging the map outside the specified bounds
    center: [20, 0],
    zoom: 3,
    minZoom: 3, // Prevents zooming out too far
    maxZoom: 18, // Optional: You can also limit the maximum zoom level
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    noWrap: true,
    maxZoom: 19,
    attribution: "© OpenStreetMap contributors",
  }).addTo(map);

  function highlightFeature(e) {
    var layer = e.target;
    layer.setStyle({
      fillColor: "pink",
      fillOpacity: 0.7,
      weight: 1,
    });
    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
      layer.bringToFront();
    }
  }

  // Function to handle click on feature (e.g., country)
  function onClick(e) {
    var layer = e.target;

    // Set style to remove any border or outline
    layer.setStyle({
      weight: 0, // No border
      fillColor: "#ececec", // Or any fill color you prefer
      fillOpacity: 0.7, // Adjust opacity as needed
    });

    // Prevent the click from setting the layer into a "focused" state that might cause an outline
    if (layer._path) {
      // Check if the layer is SVG element
      layer._path.setAttribute("outline", "none");
    }

    // Additional logic for handling click event, such as updating tooltip content
    if (e.target.feature.properties && e.target.feature.properties.name) {
      getAndDisplayGDPGrowth(e.target.feature.properties.name, layer);
    }
  }

  function resetHighlight(e) {
    geojson.resetStyle(e.target);
    e.target.closeTooltip();
  }

  function onEachFeature(feature, layer) {
    // Bind a basic tooltip initially
    layer.bindTooltip("Loading data...");

    layer.on({
      mouseover: function (e) {
        highlightFeature(e);
        var countryName = feature.properties.name; // Adjust the property name based on your GeoJSON
        console.log("Fetching data for:", countryName); // Debugging line
        getAndDisplayGDPGrowth(countryName, layer);
      },
      mouseout: resetHighlight,
      click: onClick, // Bind the click event to the onClick function
    });
  }

  // Load the GeoJSON file and add it to the map
  $.getJSON("../json/data/custom.geo.json", function (geoJsonData) {
    geojson = L.geoJSON(geoJsonData, {
      style: function (feature) {
        return { color: "transparent", fillColor: "#ececec" };
      },
      onEachFeature: onEachFeature,
    }).addTo(map);
  });

  // Function to fetch GDP growth data and display it
  function getAndDisplayGDPGrowth(countryName, layer) {
    fetch(
      `https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(
        countryName
      )}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "hNz6dyYaOqoKdeP8mjKziQ==CALsnFzlcI5CPkt3", // Replace with your actual API key
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data && data.length > 0) {
          const countryName = data[0].name; // Assuming the API returns a 'name' field with the country name
          const gdpGrowth = data[0].gdp_growth; // Accessing the GDP growth from the API response

          // Setting the tooltip content to include both country name and GDP growth

          layer.setTooltipContent(
            `Country: ${countryName}, GDP Growth: ${gdpGrowth}%`
          );
        } else {
          console.error("No data found for:", countryName);
          layer.setTooltipContent("Data not available");
        }
      })
      .catch((error) => {
        console.error("Error fetching data for:", countryName, error);
        layer.setTooltipContent("Error fetching data");
      });
  }
});
