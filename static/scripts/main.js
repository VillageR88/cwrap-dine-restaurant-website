const dineEventFamily = document.getElementById("dineEventFamily");
const dineEventSpecial = document.getElementById("dineEventSpecial");
const dineEventSocial = document.getElementById("dineEventSocial");
const dineArray = [dineEventFamily, dineEventSpecial, dineEventSocial];
const carouselTitle = document.getElementById("carouselTitle");
const carouselDescription = document.getElementById("carouselDescription");
const items = [
  {
    title: "Family Gathering",
    description:
      "We love catering for entire families. So please bring everyone along for a special meal with your loved ones. We’ll provide a memorable experience for all.",
  },
  {
    title: "Special Events",
    description:
      "Whether it’s a romantic dinner or special date you’re celebrating with others we’ll look after you. We’ll be sure to mark your special date with an unforgettable meal.",
  },
  {
    title: "Social Events",
    description:
      "Are you looking to have a larger social event? No problem! We’re more than happy to cater for big parties. We’ll work with you to make your event a hit with everyone.",
  },
];

const carouselInner = document.querySelector(".carousel-inner");
const slides = document.querySelectorAll(".carousel-item");
let isDragging = false;
let startX;
let currentTranslate = 0;
let prevTranslate = 0;
let slideWidth = slides[0].offsetWidth;
let currentIndex = 0;

const updatedSlides = document.querySelectorAll(".carousel-item");
slideWidth = updatedSlides[0].offsetWidth;

// Recalculate slide width on window resize or media query change
window.addEventListener("resize", () => {
  slideWidth = updatedSlides[0].offsetWidth;
  updateCarouselPosition();
});

function updateCarouselPosition() {
  currentTranslate = -currentIndex * slideWidth;
  carouselInner.style.transition = "none";
  carouselInner.style.transform = `translateX(${currentTranslate}px)`;
}

// Handle mouse events
carouselInner.addEventListener("mousedown", (e) => {
  isDragging = true;
  startX = e.clientX;
  carouselInner.style.cursor = "grabbing";
});

carouselInner.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  const currentX = e.clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;

  if (currentIndex === 0 && currentTranslate > 0) {
    currentTranslate = 0;
  }

  if (currentIndex === 2 && currentTranslate < -currentIndex * slideWidth) {
    currentTranslate = -currentIndex * slideWidth;
  }

  carouselInner.style.transform = `translateX(${currentTranslate}px)`;
});

carouselInner.addEventListener("mouseup", () => {
  isDragging = false;
  carouselInner.style.cursor = "grab";
  currentIndex = Math.round(-currentTranslate / slideWidth);
  handleBoundary();
  currentTranslate = -currentIndex * slideWidth;
  prevTranslate = currentTranslate;
  carouselInner.style.transition = "transform 0.3s ease-out";
  carouselInner.style.transform = `translateX(${currentTranslate}px)`;
  handleTextChange();
});

carouselInner.addEventListener("mouseleave", () => {
  if (isDragging) {
    isDragging = false;
    carouselInner.style.cursor = "grab";
    currentIndex = Math.round(-currentTranslate / slideWidth);
    handleBoundary();
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    carouselInner.style.transition = "transform 0.3s ease-out";
    carouselInner.style.transform = `translateX(${currentTranslate}px)`;
    handleTextChange();
  }
});

// Handle touch events
carouselInner.addEventListener("touchstart", (e) => {
  isDragging = true;
  startX = e.touches[0].clientX;
});

carouselInner.addEventListener("touchmove", (e) => {
  if (!isDragging) return;

  const currentX = e.touches[0].clientX;
  const deltaX = currentX - startX;
  currentTranslate = prevTranslate + deltaX;

  if (currentIndex === 0 && currentTranslate > 0) {
    currentTranslate = 0;
  }

  if (currentIndex === 2 && currentTranslate < -currentIndex * slideWidth) {
    currentTranslate = -currentIndex * slideWidth;
  }

  carouselInner.style.transform = `translateX(${currentTranslate}px)`;
});

carouselInner.addEventListener("touchend", () => {
  isDragging = false;
  currentIndex = Math.round(-currentTranslate / slideWidth);
  handleBoundary();
  currentTranslate = -currentIndex * slideWidth;
  prevTranslate = currentTranslate;
  carouselInner.style.transition = "transform 0.3s ease-out";
  carouselInner.style.transform = `translateX(${currentTranslate}px)`;
  handleTextChange();
});

function handleBoundary() {
  if (currentIndex < 0) {
    currentIndex = 0;
  } else if (currentIndex >= 2) {
    currentIndex = 2;
  }
}

let amazingBrowserCssProblem = false;
dineArray.forEach((button, index) => {
  button.addEventListener("click", () => {
    if (amazingBrowserCssProblem) return;
    currentIndex = index;
    handleBoundary();
    currentTranslate = -currentIndex * slideWidth;
    prevTranslate = currentTranslate;
    carouselInner.style.transition = "transform 0.3s ease-out";
    carouselInner.style.transform = `translateX(${currentTranslate}px)`;
    handleTextChange();
  });
});

function handleTextChange() {
  carouselTitle.textContent = items[currentIndex].title;
  carouselDescription.textContent = items[currentIndex].description;
  for (const item of dineArray) {
    item.removeAttribute("checked");
  }
  dineArray[currentIndex].setAttribute("checked", "");
  amazingBrowserCssProblem = true;
  dineArray[currentIndex].click();
  amazingBrowserCssProblem = false;
}

carouselInner.addEventListener("transitionend", () => {
  carouselInner.style.transition = "none";
});
