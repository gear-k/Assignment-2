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
            const nameElement = document.getElementById("name");
            nameElement.innerHTML = `<strong>${countryName}</strong><br>GDP Growth: ${gdpGrowth}`; // Display country name and GDP growth on separate lines
            nameElement.style.opacity = 1;
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
        const name = event.target.id; // Extract country name from the ID
        getAndDisplayGDPGrowth(name); // Fetch and display GDP growth on hover
        event.target.style.fill = "#151e3f"; // Changed fill color on hover to #151e3f

        // Positioning the tooltip
        const nameElement = document.getElementById("name");
        nameElement.style.top = (event.clientY + 20) + "px"; 
        nameElement.style.left = (event.clientX + 20) + "px";
        nameElement.style.opacity = 1;
    });

    e.addEventListener("mouseleave", function(event){
        event.target.style.fill = "#ececec"; // Reset fill color on mouse leave
        document.getElementById("name").style.opacity = 0; // Hide the tooltip
    });
});
