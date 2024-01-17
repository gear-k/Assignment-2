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
          label: "Consumer Price Index",
          data: growthRates,
          borderColor: "rgba(255, 99, 132, 1)", // Red color
          backgroundColor: "rgba(255, 99, 132, 0.2)", // Light red background
          borderWidth: 2,
          pointBackgroundColor: "rgba(255, 99, 132, 1)", // Red color for points
          pointRadius: 5,
        },
      ],
    },
    options: {
      responsive: true, // Make the chart responsive
      maintainAspectRatio: false, // Allow the chart to resize in both width and height
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
