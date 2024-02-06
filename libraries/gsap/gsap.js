gsap.registerPlugin(ScrollTrigger);
gsap.from("#animated-text", {
  duration: 1,
  opacity: 0,
  y: -50, // Start above its final position and move downwards
  ease: "power2.out",
  delay: 0.5,
  scrollTrigger: {
    trigger: "#animated-text",
    start: "top 90%",
    toggleActions: "play none none none",
  },
});

// Targeting the specific section with the ID #sponsors
const sponsorsSection = document.querySelector("#sponsors");

// Ensuring the section exists before attempting to animate
if (sponsorsSection) {
  gsap.from(sponsorsSection.querySelectorAll(".col"), {
    duration: 1,
    opacity: 0,
    y: -30, // Elements start above their final position and move downwards
    stagger: 0.2,
    scrollTrigger: {
      trigger: sponsorsSection,
      start: "top 80%",
      end: "bottom 20%",
      toggleActions: "play none none reverse",
    },
  });
}

// Adjusted function to animate blocks with headings and paragraphs
function animateBlocks(className) {
  gsap.utils.toArray(className).forEach((block) => {
    const headings = block.querySelectorAll("h4");
    const paragraphs = block.querySelectorAll("p");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 90%", // Adjust as needed
        toggleActions: "play none none reverse",
      },
    });

    // Animate headings from above
    tl.fromTo(
      headings,
      { y: -20, opacity: 0 }, // Start from above
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 }
    );

    // Animate paragraphs right after headings from above
    tl.fromTo(
      paragraphs,
      { y: -20, opacity: 0 }, // Start from above
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
      "-=0.1" // Overlap timing slightly for a smooth transition
    );
  });
}

gsap.to("#parallaxHero .heroimage-bg-index", {
  yPercent: -20, // Adjusts the vertical movement; increasing this value will enhance the parallax effect
  ease: "none",
  scrollTrigger: {
    trigger: "#parallaxHero",
    start: "top bottom", // Animation starts when the top of the trigger hits the bottom of the viewport
    end: "bottom top", // Animation ends when the bottom of the trigger hits the top of the viewport
    scrub: true, // Smooth scrubbing, true for 0.1 seconds of smoothing. You can increase this value for a smoother effect
  },
});

function fadeInFromTop(selector) {
  gsap.from(selector, {
    // Starting opacity
    opacity: 0,
    // Starting position above the final position
    y: -20,
    // Duration of the animation in seconds
    duration: 0.5,
    // Stagger the start of each element's animation for a sequential effect
    stagger: 0.2,
    // Easing function for a smooth effect
    ease: "power1.out",
    // ScrollTrigger to start the animation when the elements come into viewport
    scrollTrigger: {
      trigger: selector,
      start: "top 90%", // Start the animation when the top of the element hits 90% of the viewport height
      toggleActions: "play none none none", // Play the animation when scrolling forward
    },
  });
}

// Call the function with the container of your cards
fadeInFromTop("#unique-cards-container"); // Replace '#unique-cards-container' with your actual container ID or class

// Function to animate a section with elements moving from up to downwards
function animateSection(sectionId) {
  gsap.from(sectionId, {
    opacity: 0,
    y: -50, // Start 50 pixels above the final position
    duration: 1, // Animation duration in seconds
    scrollTrigger: {
      trigger: sectionId,
      start: "top 90%", // Animation starts when the top of the section hits 90% of the viewport
      toggleActions: "play none none none", // Play the animation when the section comes into view
    },
  });
}

// JavaScript:
// Create a function to define the animation for each element
function animateCount(elementId, targetValue) {
  gsap.to(elementId, {
    duration: 1, // Animation duration in seconds
    innerText: targetValue, // Target value
    ease: "power1.out", // Easing function
    roundProps: "innerText", // Ensure this is a string, not an object
    scrollTrigger: {
      trigger: elementId, // Element that triggers the animation
      start: "center 90%", // When the center of the element is 90% from the top of the viewport
      end: "bottom center", // When the bottom of the element is at the center of the viewport
      toggleActions: "play none none none", // Play the animation once without reversing
    },
  });
}

// Call the animateCount function for each element you want to animate
animateCount("#count1", 100);
animateCount("#count2", 242);
animateCount("#count3", 3151);

// Call the function for each section
animateSection("#inflationImpactSection");
animateSection("#indexMapSection");

// Call the function for each row
animateBlocks(".row.my-4");
animateBlocks(".row.pt-lg-5");
