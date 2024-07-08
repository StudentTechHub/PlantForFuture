const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  const isMenuOpen = mobileMenu.classList.contains("-translate-x-full");

  hamburger.querySelector("img").src = isMenuOpen
    ? "/src/assets/images/svg/hamburger.svg"
    : "/src/assets/images/svg/close.svg";

  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
});
