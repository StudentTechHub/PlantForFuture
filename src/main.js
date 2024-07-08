// For routing purpose
document.addEventListener("DOMContentLoaded", () => {
  const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
  };

  const router = async () => {
    const routes = [
      { path: "/home", view: async () => "Home Page" },
      { path: "/about", view: async () => "About Page" },
      { path: "/contact", view: async () => "Contact Page" },
      { path: "/login", view: async () => await fetch("/login/index.html").then((res) => res.text())},
      { path: "/signup", view: async () => await fetch("/signup/index.html").then((res) => res.text())},
    ];

    const potentialMatches = routes.map((route) => {
      return {
        route: route,
        isMatch: location.pathname === route.path,
      };
    });

    let match = potentialMatches.find(
      (potentialMatch) => potentialMatch.isMatch
    );

    if (!match) {
      match = {
        route: routes[0],
        isMatch: true,
      };
    }

    document.querySelector("#app").innerHTML = await match.route.view();
  };

  window.addEventListener("popstate", router);

  document.body.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
