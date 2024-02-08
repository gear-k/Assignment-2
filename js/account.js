document.addEventListener("DOMContentLoaded", function() {
    // Fetch user ID from localStorage
    var userId = localStorage.getItem("userId");
    var apiKey = "65be5892c1ff3a2d670fe5a0";

    if (userId) {
        var apiUrl = 'https://signup-828c.restdb.io/rest/signup/' + userId;

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "x-apikey": apiKey,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            // Update the page with user details
            document.getElementById("username").textContent = data.username || 'N/A';
            document.getElementById("email").textContent = data.email || 'N/A';
            
            // Check if leaderboard score is 5
            if (data.leaderboard === 5) {
                // Change username color to golden
                document.getElementById("username").style.color = "gold";
            }

            document.getElementById("quizScore").textContent = data.leaderboard || 'N/A';
        })
        .catch((error) => {
            console.error("Error fetching user details:", error);
        });
    } else {
        console.log("No user ID found in localStorage.");
    }
});
