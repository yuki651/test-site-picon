const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "メニューを開く");
    });
  });
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();


// Interior photo slider: switch between the two supplied photos.
const photoSlides = Array.from(document.querySelectorAll(".photo-slide"));
const photoDots = Array.from(document.querySelectorAll(".photo-slider-dot"));
const photoCount = document.querySelector(".photo-slider-count");
let currentPhoto = 0;
function showPhoto(index) {
  if (!photoSlides.length) return;
  currentPhoto = (index + photoSlides.length) % photoSlides.length;
  photoSlides.forEach((slide, i) => {
    const active = i === currentPhoto;
    slide.hidden = !active;
    slide.classList.toggle("is-active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  photoDots.forEach((dot, i) => {
    const active = i === currentPhoto;
    dot.classList.toggle("is-active", active);
    dot.setAttribute("aria-pressed", String(active));
  });
  if (photoCount) photoCount.textContent = `${currentPhoto + 1} / ${photoSlides.length}`;
}
document.querySelectorAll(".photo-slider-arrow").forEach((button) => {
  button.addEventListener("click", () => showPhoto(currentPhoto + (button.dataset.direction === "next" ? 1 : -1)));
});
photoDots.forEach((dot) => dot.addEventListener("click", () => showPhoto(Number(dot.dataset.go))));
showPhoto(0);
