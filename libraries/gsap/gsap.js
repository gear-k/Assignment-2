// Scroll animation setup
gsap.registerPlugin(ScrollTrigger);

// Animate elements fading in from the top
function fadeInFromTop(selector) {
  gsap.from(selector, {
    opacity: 0,
    y: -20,
    duration: 0.5,
    stagger: 0.2,
    ease: "power1.out",
    scrollTrigger: {
      trigger: selector,
      start: "top 90%",
      toggleActions: "play none none none",
    },
  });
}

// Animate counts incrementing upwards
function animateCount(elementId, targetValue) {
  gsap.to(elementId, {
    duration: 1,
    innerText: targetValue + "%", // Concatenate the percentage sign
    ease: "power1.out",
    roundProps: { innerText: 1 }, // Round to 1 decimal place
    scrollTrigger: {
      trigger: elementId,
      start: "center 90%",
      end: "bottom center",
      toggleActions: "play none none none",
    },
  });
}
// Animate counts incrementing upwards
function animateCountWithoutPercentage(elementId, targetValue) {
  gsap.to(elementId, {
    duration: 1,
    innerText: targetValue, // Concatenate the percentage sign
    ease: "power1.out",
    roundProps: { innerText: 1 }, // Round to 1 decimal place
    scrollTrigger: {
      trigger: elementId,
      start: "center 90%",
      end: "bottom center",
      toggleActions: "play none none none",
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

function animateListItemsInSection(sectionId) {
  // Target the list items with class "mb-2" within the specified section
  const listItems = document.querySelectorAll(`${sectionId} .mb-2`);

  // Loop through each list item and set up ScrollTrigger animation
  listItems.forEach((item) => {
    gsap.from(item, {
      opacity: 0,
      y: -50,
      duration: 1,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
// Animate blocks with headings and paragraphs
function animateBlocks(className) {
  gsap.utils.toArray(className).forEach((block) => {
    const headings = block.querySelectorAll("h4");
    const paragraphs = block.querySelectorAll("p");

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: block,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      headings,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 }
    );

    tl.fromTo(
      paragraphs,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.2 },
      "-=0.1"
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

function animateFadeInSections() {
  // Target the columns and text sections
  const columns = document.querySelectorAll("#impact-section .col-lg-6");
  const textSection = document.querySelector("#text-section");

  // Set up animation for the columns with stagger effect
  gsap.from(columns, {
    opacity: 0,
    y: -50,
    duration: 1,
    stagger: 0.2, // Stagger the animations by 0.2 seconds
    scrollTrigger: {
      trigger: columns[0], // Use the first column as the trigger
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Set up animation for the text section with a delay
  gsap.from(textSection, {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5, // Delay the animation by 0.5 seconds
    scrollTrigger: {
      trigger: textSection,
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}
function animateRetireeInflationSections() {
  // Target the columns and text sections
  const columns = document.querySelectorAll(
    "#retiree-inflation-columns .col-lg-6"
  );
  const textSection = document.querySelector("#retiree-inflation-text");

  // Set up animation for the columns with stagger effect
  gsap.from(columns, {
    opacity: 0,
    y: -50,
    duration: 1,
    stagger: 0.2, // Stagger the animations by 0.2 seconds
    scrollTrigger: {
      trigger: columns[0], // Use the first column as the trigger
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  // Set up animation for the text section with a delay
  gsap.from(textSection, {
    opacity: 0,
    y: -50,
    duration: 1,
    delay: 0.5, // Delay the animation by 0.5 seconds
    scrollTrigger: {
      trigger: textSection, // Use the text section as the trigger
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });
}

function animateTextOnly() {
  // Target the text elements within the text section
  const textElements = document.querySelectorAll(
    "#impactdownwards #interest-title .impact-text-size, #impactdownwards .impact-list "
  );

  // Set up animation for the text elements
  textElements.forEach((element) => {
    gsap.from(element, {
      opacity: 0,
      y: -50,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: element,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  });
}
// Call animation functions
animateRetireeInflationSections();
animateTextOnly();
fadeInFromTop("#unique-cards-container");
animateCount("#count1", 60);
animateCountWithoutPercentage("#count2", 8);
animateCount("#count3", 50);
animateSection("#inflationImpactSection");
animateSection("#indexMapSection");
animateListItemsInSection("#awards-section");
animateBlocks(".row.my-4");
animateBlocks(".row.pt-lg-5");
animateFadeInSections();
