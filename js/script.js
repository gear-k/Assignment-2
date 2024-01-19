document.body.setAttribute("data-bs-theme", "dark");
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
    if (window.scrollY > 200) {
      navbar.classList.add("bg-black");
    } else {
      navbar.classList.remove("bg-black");
    }
  });
});

// Function to toggle icon visibility
function toggleIconVisibility(event, isVisible) {
  const formFloatingIcon = event.target.parentNode.querySelector(
    ".form-floating-icon"
  );
  if (formFloatingIcon) {
    formFloatingIcon.style.visibility = isVisible ? "hidden" : "visible";
  }
}

// Get all the input elements with the form-floating class
const floatingInputs = document.querySelectorAll(
  ".form-floating .form-control"
);

// Add event listeners for focus and blur events
floatingInputs.forEach((input) => {
  input.addEventListener("focus", (event) => toggleIconVisibility(event, true));
  input.addEventListener("blur", (event) => toggleIconVisibility(event, false));
});

$("#myCarousel").carousel({
  interval: 2000, // Time delay between items (in milliseconds)
  cycle: true, // Loop back to the beginning
});
