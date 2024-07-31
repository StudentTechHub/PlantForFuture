// Authenticate Dashboard
const apiUrl = import.meta.env.VITE_API_URL;

let isLoggedIn = fetch(`${apiUrl}/api/v1/check_login`, {
  method: "GET",
  credentials: "include",
})
  .then((response) => response.json())
  .then((data) => {
    return data.loggedIn;
  });

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
