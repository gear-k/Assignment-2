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
