document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

    // Ideally, send a POST request with credentials to your server here
    // The server should handle authentication and respond accordingly

    // For demonstration, we're using your existing GET request logic
    // Remember, this is not secure for real-world applications
    var apiKey = "65be5892c1ff3a2d670fe5a0";
    var apiUrl =
      'https://signup-828c.restdb.io/rest/signup?q={"email":"' +
      encodeURIComponent(email) +
      '"}';

    fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-apikey": apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Response Data: ", data); // For debugging

        if (data.length > 0 && data[0].password === password) {
          // Password check should ideally be done on the server
          alert("Login Successful");
          localStorage.setItem("isLoggedIn", "true"); // Store login state
          window.location.href = "index.html"; // Redirect to index
        } else {
          alert("Login Failed: Incorrect email or password");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert("An error occurred. Please try again.");
      });
  });
