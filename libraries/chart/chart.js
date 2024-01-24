document.addEventListener("DOMContentLoaded", function () {
  createLineChart(chartData);
});

function createLineChart(data) {
  const years = data.map((item) => item.date);
  const growthRates = data.map((item) => item.value);

  const ctx = document.getElementById("myChart").getContext("2d");
  const myChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: years,
      datasets: [
        {
          label: "Consumer Price Index in Singapore",
          data: growthRates,
          borderColor: "#1470af", // Example color
          borderWidth: 2,
          pointBackgroundColor: "#1470af", // Ghost white for legend box
          pointRadius: 3,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: "#1470af", // Change y-axis tick color to ghost white
          },
        },
        x: {
          ticks: {
            color: "#1470af", // Change x-axis tick color to ghost white
          },
        },
      },
      plugins: {
        legend: {
          labels: {
            color: "#1470af", // Ghost white text for legend labels
            boxWidth: 12, // Adjust the size of the color box if needed
            padding: 20, // Adjust the padding around the color box if needed
            usePointStyle: true, // Ensures the legend uses the same style as the points
          },
        },
        tooltip: {
          backgroundColor: "#1470af", // Change tooltip background color to ghost white
          titleColor: "#272d2d", // For contrast, we use gunmetal color for the title
          bodyColor: "#272d2d", // For contrast, we use gunmetal color for the body text
          boxPadding: 6, // Optional: you can adjust padding inside the tooltip box
        },
      },
    },
  });
}
