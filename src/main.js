const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
});

const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
let index = 0;

function updateSlider() {
  slides.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot, i) => {
    dot.classList.toggle('bg-opacity-100', i === index);
    dot.classList.toggle('bg-opacity-50', i !== index);
  });
}

function nextSlide() {
  index = (index + 1) % dots.length;
  updateSlider();
}

function prevSlide() {
  index = (index - 1 + dots.length) % dots.length;
  updateSlider();
}

dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateSlider();
  });
});

setInterval(nextSlide, 5000); // Change slide every 5 seconds

// Initial setup
updateSlider()