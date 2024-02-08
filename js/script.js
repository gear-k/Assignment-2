// Set 'isLoggedIn' to false in local storage and set the body theme to light
document.body.setAttribute("data-bs-theme", "light");

// Hide offcanvas when window is resized back to large screen
window.addEventListener("resize", function () {
  var offcanvasNav = document.getElementById("offcanvasNavbar");
  if (window.innerWidth >= 992) {
    var bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasNav);
    if (bsOffcanvas && bsOffcanvas._isShown) {
      bsOffcanvas.hide();
    }
  }
});

// Navbar scroll effect
document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("scroll", function () {
    const navbar = document.querySelector(".navbar");
    const navbarLinks = document.querySelectorAll(".navbar .nav-link");
    const navbarBrand = document.querySelector(".navbar-brand");
    const buttons = document.querySelectorAll(".navbar .btn");

    if (window.scrollY > 125) {
      navbar.classList.add("bg-spacecadet");
      navbarLinks.forEach(function (link) {
        link.classList.add("text-ghost-white");
      });
      navbarBrand.classList.add("text-ghost-white");
      buttons.forEach((button) => button.classList.add("btn-ghostwhite"));
    } else {
      navbar.classList.remove("bg-spacecadet");
      navbarLinks.forEach(function (link) {
        link.classList.remove("text-ghost-white");
      });
      navbarBrand.classList.remove("text-ghost-white");
      buttons.forEach((button) => button.classList.remove("btn-ghostwhite"));
    }
  });
});

// Enable login button when terms checkbox is checked
document.addEventListener("DOMContentLoaded", function () {
  var agreeTermsCheckbox = document.getElementById("agreeTerms");
  var loginButton = document.getElementById("signUpButton");

  loginButton.disabled = true;

  agreeTermsCheckbox.addEventListener("change", function () {
    loginButton.disabled = !agreeTermsCheckbox.checked;
  });
});

// Validate password match on form submission
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
      event.preventDefault();
    } else {
      passwordMismatchMessage.style.display = "none";
    }
  });

  passwordInput.addEventListener("input", function () {
    passwordMismatchMessage.style.display = "none";
  });

  confirmPasswordInput.addEventListener("input", function () {
    passwordMismatchMessage.style.display = "none";
  });
});

// Toggle visibility of authentication and account buttons based on login status
document.addEventListener("DOMContentLoaded", () => {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const authButtons = document.querySelectorAll(".auth-buttons");
  const accountButtons = document.querySelectorAll(".account-button");

  authButtons.forEach((btn) => {
    if (isLoggedIn === "true") {
      btn.classList.add("d-none");
      btn.classList.remove("d-lg-block", "d-block");
    } else {
      btn.classList.remove("d-none");
      btn.classList.add("d-lg-block");
    }
  });

  accountButtons.forEach((btn) => {
    if (isLoggedIn === "true") {
      btn.classList.remove("d-none");
      btn.classList.add("d-block");
    } else {
      btn.classList.add("d-none");
      btn.classList.remove("d-block", "d-flex", "d-inline-block");
    }
  });
});

// Logout functionality
document.addEventListener("DOMContentLoaded", () => {
  // Select all elements with the class "logoutbtn"
  const logoutButtons = document.querySelectorAll(".logoutbtn");

  // Add a click event listener to each logout button
  logoutButtons.forEach((logoutButton) => {
    logoutButton.addEventListener("click", (event) => {
      // Prevent default action for the button (if it's a submit button or a link)
      event.preventDefault();

      // Remove 'isLoggedIn' status from localStorage
      localStorage.removeItem("isLoggedIn");

      // Redirect to the login page
      window.location.href = "login.html";
    });
  });
});

// JavaScript to handle audio playback and icon toggling
var audioPlayer = document.getElementById("audioPlayer");
var toggleButtonIcon = document.querySelector("#toggleButton i");

var isAudioPlaying = sessionStorage.getItem("isAudioPlaying");
var playbackPosition = parseFloat(sessionStorage.getItem("playbackPosition"));

if (isAudioPlaying === "true" && !isNaN(playbackPosition)) {
  audioPlayer.currentTime = playbackPosition;
  audioPlayer.play();
  toggleButtonIcon.classList.remove("bi-volume-mute-fill");
  toggleButtonIcon.classList.add("bi-volume-up-fill");
  audioPlayer.volume = 0.1;
}

document.getElementById("toggleButton").addEventListener("click", function () {
  if (audioPlayer.paused) {
    audioPlayer.play();
    toggleButtonIcon.classList.remove("bi-volume-mute-fill");
    toggleButtonIcon.classList.add("bi-volume-up-fill");
    audioPlayer.volume = 0.1;
    sessionStorage.setItem("isAudioPlaying", "true");
  } else {
    audioPlayer.pause();
    toggleButtonIcon.classList.remove("bi-volume-up-fill");
    toggleButtonIcon.classList.add("bi-volume-mute-fill");
    sessionStorage.setItem("isAudioPlaying", "false");
  }
});

window.addEventListener("beforeunload", function () {
  sessionStorage.setItem(
    "playbackPosition",
    audioPlayer.currentTime.toString()
  );
});
