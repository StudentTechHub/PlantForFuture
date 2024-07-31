const apiUrl = import.meta.env.VITE_API_URL;

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");

const avatarDiv = document.querySelector("#avatar-dropdown2");
const avatarDivMob = document.querySelector(".avatar-dropdown");
const dropdownMenu = document.querySelector("#dropdown-menu");
const loginButton = document.querySelectorAll(".login-button");
const donateButton = document.querySelectorAll(".donate-button");
const userSection = document.querySelector(".user-section");

const userDashboard = document.getElementById("user-dashboard");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
});

// Checking if the user is a volunteer or creator
const currentUser = document.cookie.includes("volunteer_token")
  ? "volunteer"
  : document.cookie.includes("creator_token")
  ? "creator"
  : null;

userDashboard.addEventListener("click", () => {
  window.location.href = `/src/dashboard/${currentUser}/`;
});

if (currentUser) {
  loginButton.forEach((element) => {
    element.classList.add("hidden");
  });
  donateButton.forEach((element) => {
    element.classList.add("hidden");
  });
  avatarDiv.classList.remove("hidden");
  avatarDivMob.classList.remove("hidden");

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/v1/${currentUser}/me`, {
        method: "GET",
        credentials: "include",
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
      alert("Failed to user data.");
    }
  };

  const displayUserData = (data) => {
    document.querySelector(".pfp").src = `/assets/images/volunteer-${
      data.gender === "male" ? "boy" : "girl"
    }.png`;
    const username = document.querySelectorAll(".user-name");
    username.forEach((element) => {
      element.innerText = `${data.fullName}`;
    });
  };

  (async () => {
    await fetchUserData();
  })();

  avatarDiv.addEventListener("click", function () {
    dropdownMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    e.preventDefault();
    if (!avatarDiv.contains(e.target) && !dropdownMenu.contains(e.target)) {
      dropdownMenu.classList.add("hidden");
    }
  });

  document.querySelectorAll(".logout").forEach((element) => {
    element.addEventListener("click", async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/${currentUser}/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        window.location.href = "/join-us/";
      } catch (error) {
        console.error("Error logging out:", error);
      }
    });
  });
} else {
  loginButton.forEach((element) => {
    element.classList.remove("hidden");
  });
  donateButton.forEach((element) => {
    element.classList.remove("hidden");
  });
  avatarDiv.classList.add("hidden");
  avatarDivMob.classList.add("hidden");
}
