// Authenticate Dashboard

if (document.cookie !== null && document.cookie !== undefined) {
  const cookies = document.cookie.split(";");
  const cookieObj = cookies.reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key.trim()] = value;
    return acc;
  }, {});

  if (!cookieObj["volunteer_token"] && !cookieObj["creator_token"]) {
    window.location.href = "/join-us/";
  }

  // if (cookieObj["creator_token"]) {
  //   window.location.href = "/src/dashboard/creator/";
  //   return;
  // }

  // if (cookieObj["volunteer_token"]) {
  //   window.location.href = "/src/dashboard/volunteer/";
  //   return;
  // }
}