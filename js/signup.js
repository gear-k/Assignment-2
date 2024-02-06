document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let email = document.getElementById("floatingInput").value;
      let password = document.getElementById("floatingPassword").value;
      let cnfmpassword = document.getElementById("cnfmpassword").value;
      let passwordMismatchMessage =
        document.getElementById("password-mismatch");

      // Clear previous mismatch message
      passwordMismatchMessage.textContent = "";

      // Check if passwords match
      if (password !== cnfmpassword) {
        passwordMismatchMessage.textContent =
          "Passwords do not match. Please try again.";
        return; // Stop the sign-up process
      }
      // Proceed with the fetch request if passwords match
      fetch("https://signup-828c.restdb.io/rest/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-apikey": "65be5892c1ff3a2d670fe5a0",
        },
        body: JSON.stringify({ email, password, cnfmpassword }),
      })
        .then((response) => {
          if (!response.ok) {
            // Check if response status is not OK
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          alert("Sign up Successful!");
          console.log(data);
          document.getElementById("signup-form").reset(); // Assuming your form has an ID of "register-form"
        })
        .catch((error) => {
          console.error("Error:", error);
          alert("Sign up failed. Please try again.");
        });
    });
  } else {
    console.error("Form element not found.");
  }
});
