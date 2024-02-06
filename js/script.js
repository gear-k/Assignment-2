localStorage.setItem("isLoggedIn", "false");
document.body.setAttribute("data-bs-theme", "light");
// this code is for when you open the offcavnas and go back to big screen, the offcanvas will go away.
window.addEventListener("resize", function () {
  var offcanvasNav = document.getElementById("offcanvasNavbar");
  if (window.innerWidth >= 992) {
    // Replace 992 with the breakpoint at which your navbar expands
    var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasNav);
    if (bsOffcanvas && bsOffcanvas._isShown) {
      bsOffcanvas.hide();
    }
  }
});

document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const navbarLinks = document.querySelectorAll(".navbar .nav-link");
    const navbarBrand = document.querySelector(".navbar-brand"); // Selecting the navbar-brand
    const buttons = document.querySelectorAll(".navbar .btn"); // Select all buttons

    if (window.scrollY > 125) {
      navbar.classList.add("bg-spacecadet");
      // Change navbar links to white
      navbarLinks.forEach(function (link) {
        link.classList.add("text-ghost-white");
      });
      navbarBrand.classList.add("text-ghost-white"); // Change navbar-brand to white
      buttons.forEach((button) => button.classList.add("btn-ghostwhite")); // Add btn-ghostwhite to buttons
    } else {
      navbar.classList.remove("bg-spacecadet");
      // Revert navbar links to original color
      navbarLinks.forEach(function (link) {
        link.classList.remove("text-ghost-white");
        link.classList.remove("active-style");
      });
      navbarBrand.classList.remove("text-ghost-white"); // Revert navbar-brand to original color
      buttons.forEach((button) => button.classList.remove("btn-ghostwhite")); // Remove btn-ghostwhite from buttons
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var agreeTermsCheckbox = document.getElementById("agreeTerms");
  var loginButton = document.getElementById("signUpButton");

  // Disable the login button by default
  loginButton.disabled = true;

  // Add an event listener to the checkbox
  agreeTermsCheckbox.addEventListener("change", function () {
    // Enable the login button if the checkbox is checked
    loginButton.disabled = !agreeTermsCheckbox.checked;
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var signUpForm = document.getElementById("login-form");
  var passwordInput = document.getElementsByName("password")[0];
  var confirmPasswordInput = document.getElementsByName("password-repeat")[0];
  var passwordMismatchMessage = document.getElementById("password-mismatch");
  var signUpButton = document.getElementById("signUpButton");

  signUpForm.addEventListener("submit", function (event) {
    if (passwordInput.value !== confirmPasswordInput.value) {
      passwordMismatchMessage.textContent = "Password does not match";
      passwordMismatchMessage.style.display = "block";
      event.preventDefault(); // Prevent form submission
    } else {
      passwordMismatchMessage.style.display = "none";
    }
  });

  // Add an event listener to clear the warning message when inputs change
  passwordInput.addEventListener("input", function () {
    passwordMismatchMessage.style.display = "none";
  });

  confirmPasswordInput.addEventListener("input", function () {
    passwordMismatchMessage.style.display = "none";
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const authButtons = document.getElementById("authButtons");
  const accountButton = document.getElementById("accountButton");

  if (isLoggedIn === "true") {
    // Remove 'd-lg-block' from 'authButtons' and add 'd-none' to hide it
    authButtons.classList.remove("d-lg-block");
    authButtons.classList.add("d-none");

    // Remove 'd-none' from 'accountButton' and add 'd-lg-block' to show it
    accountButton.classList.remove("d-none");
    accountButton.classList.add("d-lg-block");
  } else {
    // Add 'd-lg-block' to 'authButtons' and ensure 'd-none' is not present to show them
    authButtons.classList.add("d-lg-block");
    authButtons.classList.remove("d-none");

    // Add 'd-none' to 'accountButton' and remove 'd-lg-block' to hide it
    accountButton.classList.add("d-none");
    accountButton.classList.remove("d-lg-block");
  }
});
