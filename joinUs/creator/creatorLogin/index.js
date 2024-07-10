import validateForm from "../../../src/js/utils";

const visibility = document.querySelectorAll(".eye-button");
const password = document.querySelectorAll("input[type='password']");

// Validate form inputs
const form = document.querySelector("form");
const inputs = [...form.querySelectorAll("input")];

// Handle Password Visibility
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

// POST request to Log in a user
form.addEventListener("submit", (e) => {
  e.preventDefault();

  username.value = username.value.toLowerCase();

  if (
    !inputs.every((input) => {
      return validateForm(input);
    })
  )
    return;

  fetch("/api/v1/creator/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(
      inputs.reduce((acc, input) => {
        acc[input.id] = input.value.replace(/\s/g, "");
        return acc;
      }, {})
    ),
  });
});

