const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
});
