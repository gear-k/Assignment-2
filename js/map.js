// Function to fetch GDP growth data and display it
function getAndDisplayGDPGrowth(place) {
    fetch(`https://api.api-ninjas.com/v1/country?name=${encodeURIComponent(place)}`, {
        method: 'GET',
        headers: {
            'X-Api-Key': 'hNz6dyYaOqoKdeP8mjKziQ==CALsnFzlcI5CPkt3' // Replace with your actual API key
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.length > 0) {
            const countryName = data[0].name; // Accessing the name
            const gdpGrowth = data[0].gdp_growth; // Accessing the gdp_growth
            document.getElementById("api").innerText = `Country: ${countryName}, GDP Growth: ${gdpGrowth}`;
        } else {
            console.error('No data found for:', place);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Event listeners for each path (country)
document.querySelectorAll(".allPaths").forEach(e => {
    e.addEventListener("mouseover", function(event){
        event.target.style.fill = "pink"; // Highlight country on hover
        const name = event.target.id; // Extract country name from the ID

        window.onmousemove = function(j){
            const x = j.clientX;
            const y = j.clientY;
            const nameElement = document.getElementById("name");
            nameElement.style.top = y + 20 + "px"; // Positioning the tooltip
            nameElement.style.left = x + 20 + "px";
        };

        document.getElementById("namep").innerText = name; // Displaying country name
        document.getElementById("name").style.opacity = 1;

        getAndDisplayGDPGrowth(name); // Fetch and display GDP growth on hover
    });

    e.addEventListener("mouseleave", function(event){
        event.target.style.fill = "#ececec"; // Reset fill color on mouse leave
        document.getElementById("name").style.opacity = 0;
    });

    e.addEventListener("click", function() {
        getAndDisplayGDPGrowth(e.id); // Fetch and display GDP growth on click
    });
});
