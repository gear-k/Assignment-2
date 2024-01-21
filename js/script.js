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
      navbar.classList.add("bg-skyblue");
      // Change navbar links to white
      navbarLinks.forEach(function (link) {
        link.classList.add("text-ghost-white");
      });
      navbarBrand.classList.add("text-ghost-white"); // Change navbar-brand to white
      buttons.forEach((button) => button.classList.add("btn-ghostwhite")); // Add btn-ghostwhite to buttons
    } else {
      navbar.classList.remove("bg-skyblue");
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
