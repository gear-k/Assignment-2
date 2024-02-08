// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Function to animate elements on scroll with a fade-in effect
function animateOnScroll(elements, options) {
  gsap.utils.toArray(elements).forEach((element) => {
    const defaults = {
      opacity: 0,
      y: -50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    };
    gsap.from(element, { ...defaults, ...options });
  });
}

// Function to animate incremental counts
function animateCount(elementId, targetValue, includePercentage = true) {
  const innerTextValue = includePercentage ? targetValue + "%" : targetValue;
  gsap.to(elementId, {
    duration: 1,
    innerText: innerTextValue,
    ease: "power1.out",
    roundProps: { innerText: 1 },
    scrollTrigger: {
      trigger: elementId,
      start: "center 90%",
      end: "bottom center",
      toggleActions: "play none none none",
    },
  });
}

// Function to animate blocks containing headings and paragraphs
function animateBlocks(className) {
  gsap.utils.toArray(className).forEach((block) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });
    tl.from(block.querySelectorAll("h4, p"), {
      y: -20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.2,
    });
  });
}

// Function to set up hover animations on elements
function setupHoverAnimation(buttonSelector, targetSelector, scaleValue) {
  const button = document.querySelector(buttonSelector);
  const target = document.querySelector(targetSelector);
  button.addEventListener("mouseenter", () =>
    gsap.to(target, { scale: scaleValue, duration: 0.3 })
  );
  button.addEventListener("mouseleave", () =>
    gsap.to(target, { scale: 1, duration: 0.3 })
  );
}

// Parallax effect on a background element
function setupParallaxEffect(selector) {
  gsap.to(selector, {
    yPercent: -20,
    ease: "none",
    scrollTrigger: {
      trigger: selector,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}
// Animate specific section elements
function animateSection(sectionId) {
  gsap.from(sectionId, {
    opacity: 0,
    y: -50,
    duration: 1,
    scrollTrigger: {
      trigger: sectionId,
      start: "top 80%",
    },
  });
}
// Document ready function to organize all the animation setups
document.addEventListener("DOMContentLoaded", () => {
  animateSection("#inflationImpactSection");
  animateSection("#indexMapSection");
  animateOnScroll("#impact-section .col-lg-6");
  animateOnScroll("#text-section", { y: -50, delay: 0.5 });
  animateOnScroll("#awards-section .mb-2", { y: -20, duration: 0.5 });
  animateOnScroll("#retiree-inflation-columns .col-lg-6");
  animateOnScroll("#retiree-inflation-text", { y: -50, delay: 0.5 });
  animateOnScroll(
    "#impactdownwards #interest-title .impact-text-size, #impactdownwards .impact-list "
  );

  animateBlocks(".row.my-4");
  animateBlocks(".row.pt-lg-5");

  setupHoverAnimation("#lottie-btn", "#lottie-player", 1.5);
  setupParallaxEffect("#parallaxHero .heroimage-bg-index");

  // Animate counts
  animateCount("#count1", 60);
  animateCount("#count2", 8, false);
  animateCount("#count3", 50);
});
