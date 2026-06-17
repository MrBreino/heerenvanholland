const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const navPanel = document.querySelector("[data-nav-panel]");
const galleryButtons = [...document.querySelectorAll("[data-gallery] button")];
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-img]");
const lightboxClose = document.querySelector("[data-lightbox-close]");
const reviews = [...document.querySelectorAll(".review")];
const reviewPrev = document.querySelector("[data-review-prev]");
const reviewNext = document.querySelector("[data-review-next]");

let activeReview = 0;

function updateHeader() {
  header?.classList.toggle("is-scrolled", window.scrollY > 24);
}

function showReview(index) {
  reviews.forEach((review, reviewIndex) => {
    review.classList.toggle("is-active", reviewIndex === index);
  });
}

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox || !lightboxImage) return;
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lightboxImage.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
  lightboxImage.alt = "";
  document.body.style.overflow = "";
}

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

navToggle?.addEventListener("click", () => {
  const isOpen = navPanel?.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
});

navPanel?.addEventListener("click", (event) => {
  const target = event.target;
  if (target instanceof HTMLAnchorElement) {
    navPanel.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const image = button.querySelector("img");
    if (image) openLightbox(image);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});

reviewPrev?.addEventListener("click", () => {
  activeReview = (activeReview - 1 + reviews.length) % reviews.length;
  showReview(activeReview);
});

reviewNext?.addEventListener("click", () => {
  activeReview = (activeReview + 1) % reviews.length;
  showReview(activeReview);
});

if (reviews.length > 1) {
  window.setInterval(() => {
    activeReview = (activeReview + 1) % reviews.length;
    showReview(activeReview);
  }, 7000);
}
