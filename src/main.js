const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
});

// Counter
$(document).ready(function () {
  $(".counter").each(function () {
    var $this = $(this);
    var target = $this.data("count-to");

    function updateCounter() {
      var count = parseInt($this.text().replace("+", ""), 10);
      var increment = target / 300;

      if (count < target) {
        $this.text(Math.ceil(count + increment) + "+");
        setTimeout(updateCounter, 1);
      } else {
        $this.text(target + "+");
      }
    }

    updateCounter();
  });
});
