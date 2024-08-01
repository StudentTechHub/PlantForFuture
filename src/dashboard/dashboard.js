// Authenticate Dashboard
const apiUrl = import.meta.env.VITE_API_URL;

document.addEventListener("DOMContentLoaded", async () => {
  // Checking if the user is a volunteer or creator
  const creator = await fetch(`${apiUrl}/api/v1/creator/check_login`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.userType;
    });

  const volunteer = await fetch(`${apiUrl}/api/v1/volunteer/check_login`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.userType;
    });

  const isLoggedIn = !!(creator || volunteer);

  if (!isLoggedIn) {
    window.location.href = "/join-us/";
  }

  // if (cookieObj["_creator_token"]) {
  //   window.location.href = "/src/dashboard/creator/";
  //   return;
  // }

  // if (cookieObj["_volunteer_token"]) {
  //   window.location.href = "/src/dashboard/volunteer/";
  //   return;
  // }
});
