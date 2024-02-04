// gsap
gsap.registerPlugin(ScrollTrigger);
// Wait for the DOM to load
gsap.to(".heroimage", { duration: 1, opacity: 1, ease: "power2.out" }); // Fade-in effect for the background image

gsap.from(".display-1", {
  duration: 1,
  x: -100,
  opacity: 0,
  ease: "power3.out",
  delay: 0.5,
}); // Slide-in effect for the header text

gsap.from(".herobtn", {
  duration: 0.5,
  scale: 0,
  opacity: 0,
  ease: "back.out(1.7)",
  stagger: 0.2,
  delay: 0.4,
}); // Scale-up effect for buttons with a slight stagger between them

// Set up the initial width animation from 50% to 100% when the site loads
gsap.from(".heroimage-bg", {
  width: "0%", // Start at 50% width
  duration: 2.5, // Duration of the animation
  ease: "power2.out", // Easing function for the animation
});

// Set up the parallax effect
gsap.to(".heroimage-bg", {
  scrollTrigger: {
    trigger: ".heroimage",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
  yPercent: -20, // This controls the speed and direction of the parallax effect
  ease: "none", // No easing, for a direct correlation with scroll position
});

// Ensure the image is tall enough for parallax
document.addEventListener("DOMContentLoaded", function () {
  var img = document.querySelector(".heroimage-bg"); // Get the image
  var sectionHeight = document.querySelector(".heroimage").offsetHeight; // Get the height of the section
  var imgHeight = img.naturalHeight; // Get the natural height of the image

  if (imgHeight < sectionHeight) {
    // If the image height is less than the section height, adjust the image style
    img.style.height = `calc(${sectionHeight}px + 20vh)`; // Add 20vh to ensure it covers during parallax
    img.style.objectFit = "cover"; // Cover the area of the figure, adjust if needed
  }
});
