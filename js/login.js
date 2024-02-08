document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;

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
        console.log("Response Data: ", data);

        if (data.length > 0 && data[0].password === password) {
          // Login Successful
          alert("Login Successful");

          // Store login status and user information in localStorage
          localStorage.setItem("isLoggedIn", "true");
          localStorage.setItem("userId", data[0]._id);
          localStorage.setItem("sessionToken", data[0].sessionToken);

          // Redirect to index.html
          window.location.href = "index.html";
        } else {
          // Login Failed
          alert("Login Failed: Incorrect email or password");
        }
      })
      .catch((error) => {
        console.error("Error during fetch:", error);
        alert("An error occurred. Please try again.");
      });
  });
