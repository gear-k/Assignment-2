document.addEventListener("DOMContentLoaded", function() {
    function logout() {
        // Clear all stored data
        localStorage.clear();

        // Redirect to login page
        window.location.href = 'login.html';
    }

    // Check if user is logged in
    var userId = localStorage.getItem("userId");
    if (!userId) {
        logout();
        return;
    }

    var apiKey = "65be5892c1ff3a2d670fe5a0";
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
        document.getElementById("username").textContent = data.username || 'N/A';
        document.getElementById("email").textContent = data.email || 'N/A';
        if (data.leaderboard === 5) {
            document.getElementById("username").style.color = "gold"; // If User has 5 points in quiz, they will get a gold username
        }
        document.getElementById("quizScore").textContent = data.leaderboard || 'N/A';
    })
    .catch((error) => {
        console.error("Error fetching user details:", error);
    });

    // Attach logout function to the logout button
    var logoutBtn = document.getElementById("logoutButton");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", logout);
    }
});
