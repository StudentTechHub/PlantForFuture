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
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.querySelector("#username");
  username.value = username.value.toLowerCase();

  if (!inputs.every((input) => validateForm(input))) return;

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/v1/volunteer/login`, {
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

    if (!response.ok) {
      throw new Error(
        "Login failed. Please check your credentials and try again."
      );
    } else {
      window.location.href = "/src/dashboard/volunteerDashboard/";
    }
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = document.querySelector("#error-message");
    if (errorMessage) {
      errorMessage.textContent = error.message;
      errorMessage.style.display = "block";
    } else {
      const newErrorMessage = document.createElement("div");
      newErrorMessage.id = "error-message";
      newErrorMessage.textContent = error.message;
      newErrorMessage.style.color = "red";
      form.appendChild(newErrorMessage);
    }
  }
});
