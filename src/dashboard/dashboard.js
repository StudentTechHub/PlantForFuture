// Authenticate Dashboard

// if (document.cookie !== null && document.cookie !== undefined) {
//   const cookies = document.cookie.split(";");
//   const cookieObj = cookies.reduce((acc, cookie) => {
//     const [key, value] = cookie.split("=");
//     acc[key.trim()] = value;
//     return acc;
//   }, {});

//   if (!cookieObj["_volunteer_token"] && !cookieObj["_creator_token"]) {
//     window.location.href = "/join-us/";
//   }

  // if (cookieObj["_creator_token"]) {
  //   window.location.href = "/src/dashboard/creatorDashboard/";
  //   return;
  // }

  // if (cookieObj["_volunteer_token"]) {
  //   window.location.href = "/src/dashboard/volunteerDashboard/";
  //   return;
  // }
// }