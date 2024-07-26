import validateForm from "../../../src/js/utils";

const visibility = document.querySelectorAll(".eye-button");
const password = document.querySelectorAll("input[type='password']");
const username = document.querySelector("#username");

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

// POST request to create a new user
form.addEventListener("submit", (e) => {
  e.preventDefault();

  username.value = username.value.toLowerCase();

  if (
    !inputs.every((input) => {
      return validateForm(input);
    })
  )
    return;

  fetch(`/api/v1/volunteer/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      fullName: inputs[1].value,
      email: inputs[2].value,
      gender: inputs[3].checked
        ? "male"
        : inputs[4].checked
        ? "female"
        : "other",
      password: inputs[5].value,
      confirmPassword: inputs[6].value,
    }),
  }).then((res) =>
    res.ok
      ? (window.location.href = "/join-us/volunteer/volunteer-login/")
      : alert("Username or email already exists")
  );
});
