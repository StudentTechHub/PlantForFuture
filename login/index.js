const visibility = document.querySelectorAll(".eye-button");
const password = document.querySelectorAll("input[type='password']");

visibility.forEach((visibilityButton, index) => {
  visibilityButton.addEventListener("click", () => {
    const type =
      password[index].getAttribute("type") === "password" ? "text" : "password";
    visibilityButton.src =
      type === "password"
        ? "/assets/images/svg/visibility_off.svg"
        : "/assets/images/svg/visibility.svg";
    password[index].setAttribute("type", type);
  });
});
