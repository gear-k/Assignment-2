document.addEventListener("DOMContentLoaded", function () {
    fetchLeaderboardData();
  });
  //Fetch from database
  function fetchLeaderboardData() {
    fetch("https://signup-828c.restdb.io/rest/signup", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": "65be5892c1ff3a2d670fe5a0",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        populateLeaderboard(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }
  //Fill in leaderboard
  function populateLeaderboard(data) {
    const tbody = document.getElementById("leaderboardBody");
    if (!tbody) {
      console.error("Leaderboard body not found");
      return;
    }
  
    // Clear existing data for rows except the top three placeholders
    while (tbody.children.length > 3) {
      tbody.removeChild(tbody.lastChild);
    }
  
    const sortedData = data
      .filter((item) => item.leaderboard !== undefined)
      .sort((a, b) => b.leaderboard - a.leaderboard);
  
    sortedData.forEach((item, index) => {
      const rowContent = `
        <th scope="row">${index + 1}</th>
        <td>${item.username}</td>
        <td>Singapore</td> <!-- Set location to Singapore -->
        <td>${item.leaderboard}</td>
      `;
  
      if (index < 3) {
        // Populate the placeholders for the top three
        const placeHolder = document.getElementById(["firstPlace", "secondPlace", "thirdPlace"][index]);
        placeHolder.innerHTML = rowContent;
      } else {
        // Append new row for the rest of the table
        const row = document.createElement('tr');
        row.innerHTML = rowContent;
        tbody.appendChild(row);
      }
    });
  }
  