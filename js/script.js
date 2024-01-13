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
