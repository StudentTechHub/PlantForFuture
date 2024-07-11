// Authenticate Dashboard

if (document.cookie !== null && document.cookie !== undefined) {
  const cookies = document.cookie.split(";");
  const cookieObj = cookies.reduce((acc, cookie) => {
    const [key, value] = cookie.split("=");
    acc[key.trim()] = value;
    return acc;
  }, {});

  if (!cookieObj["token"]) {
    window.location.href = "/joinUs/";
  }
  else if (cookieObj["creatorToken"]) {
    window.location.href = "/src/dashboard/creatorDashboard/";
  }
}