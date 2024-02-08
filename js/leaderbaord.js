document.addEventListener("DOMContentLoaded", function () {
  fetchLeaderboardData();
});

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

function populateLeaderboard(data) {
  const sortedData = data
    .filter((item) => item.leaderboard !== undefined)
    .sort((a, b) => b.leaderboard - a.leaderboard);
  const tbody = document.getElementById("leaderboardBody");
  tbody.innerHTML = ""; // Clear existing data

  sortedData.forEach((item, index) => {
    if (index < 3) {
      // Populate the placeholders for the top three
      const placeHolder = document.getElementById(
        ["firstPlace", "secondPlace", "thirdPlace"][index]
      );
      placeHolder.innerHTML = `
          <th scope="row">${index + 1}</th>
          <td>${item.username}</td>
          <td>Singapore</td>
          <td>${item.leaderboard}</td>
        `;
    } else {
      // Populate the rest of the table
      const row = `<tr>
          <th scope="row">${index + 1}</th>
          <td>${item.username}</td>
          <td>Singapore</td>
          <td>${item.leaderboard}</td>
        </tr>`;
      tbody.innerHTML += row;
    }
  });
}
