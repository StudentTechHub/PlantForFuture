import validateForm from "../../js/utils";
const apiUrl = import.meta.env.VITE_API_URL;

document.addEventListener("DOMContentLoaded", async () => {
  // Checking if the user is a volunteer or creator
  const currentUser = document.cookie.includes("volunteer_token")
    ? "volunteer"
    : document.cookie.includes("creator_token")
    ? "creator"
    : null;

  // Routing to the user dashboard
  const userDashboard = document.getElementById("user-dashboard");
  userDashboard.addEventListener("click", () => {
    window.location.href = `../${currentUser}/`;
  });

  const avatarDiv = document.querySelector("#avatar-dropdown");
  const dropdownMenu = document.querySelector("#dropdown-menu");

  const visibility = document.querySelectorAll(".eye-button");
  const password = document.querySelectorAll("input[type='password']");

  // handle Status Modal
  const statusModal = document.querySelector("#status-modal");
  const statusMsg = document.querySelector("#status-message");
  const statusMsgClose = document.querySelector("#status-close-modal");

  statusMsgClose.addEventListener("click", () => {
    statusModal.classList.add("hidden");
  });

  // Handling save modal
  const saveModal = document.querySelector("#save-changes-modal");
  const saveModalClose = document.querySelector("#cancel-changes");
  const saveButton = document.querySelector("#save-changes");
  const userInfoDiv = document.querySelector("#user-info");

  document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("change", () => {
      saveModal.classList.remove("hidden");
    });
  });

  saveModalClose.addEventListener("click", () => {
    saveModal.classList.add("hidden");
  });

  saveButton.addEventListener("click", async () => {
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#newPassword").value;

    if (!validateForm({ type: "email", value: email })) {
      statusMsg.textContent = "Invalid email address.";
      statusModal.classList.remove("hidden");
      return;
    }

    try {
      const response = await fetch(`${apiUrl}/api/v1/${currentUser}/update-info`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: `${firstName} ${lastName}`,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      displayUserData(data);
      statusMsg.textContent = "User data updated successfully.";
      statusModal.classList.remove("hidden");
      saveModal.classList.add("hidden");
    } catch (error) {
      console.error("Error updating user data:", error);
      statusMsg.textContent = "Failed to update user data.";
    }
  });

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
      userInfoDiv.textContent = "Failed to user data.";
    }
  };

  const displayUserData = (data) => {
    document.querySelector(".pfp").src = `/assets/images/volunteer-${
      data.gender === "male" ? "boy" : "girl"
    }.png`;
    document.querySelectorAll(".user-name").forEach((elem) => {
      elem.innerText = `${data.fullName}`;
    });

    // filling the form with the user data
    document.querySelector("#firstName").value = data.fullName.split(" ")[0];
    document.querySelector("#lastName").value = data.fullName.split(" ")[1];
    document.querySelector("#email").value = data.email;
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
  document.querySelectorAll(".logout").forEach((element, index) => {
    element.onclick = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/volunteer/logout`, {
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
    };
  });
});
