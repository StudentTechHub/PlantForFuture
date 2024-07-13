document.addEventListener("DOMContentLoaded", async () => {
  const avatarDiv = document.querySelector("#avatar-dropdown");
  const dropdownMenu = document.querySelector("#dropdown-menu");

  const visibility = document.querySelectorAll(".eye-button");
  const password = document.querySelectorAll("input[type='password']");

  // Handle Password Visibility
  visibility.forEach((visibilityButton, index) => {
    visibilityButton.addEventListener("click", () => {
      const type =
        password[index].getAttribute("type") === "password"
          ? "text"
          : "password";
      visibilityButton.src =
        type === "password"
          ? "/assets/images/svg/visibility_off.svg"
          : "/assets/images/svg/visibility.svg";
      password[index].setAttribute("type", type);
    });
  });

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/v1/volunteer/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      displayUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
      userInfoDiv.textContent = "Failed to load user data.";
    }
  };

  const displayUserData = (data) => {
    document.querySelector(".pfp").src = `/assets/images/volunteer-${
      data.gender === "male" ? "boy" : "girl"
    }.png`;
    document.querySelectorAll(".user-name").forEach((elem) => {
      elem.innerText = `${data.fullName}`;
    });
  };

  await fetchUserData();

  // Avatar dropdown
  avatarDiv.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", function (event) {
    if (
      !avatarDiv.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.add("hidden");
    }
  });

  // Logout
  document.querySelector("#logout").addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/v1/volunteer/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.href = "/joinUs/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  });
});
