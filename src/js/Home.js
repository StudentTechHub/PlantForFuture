import $ from "jquery";
import "jquery.easing";
const apiUrl = import.meta.env.VITE_API_URL;

// Counter
function updateCounter($this, target) {
  var count = parseInt($this.text().replace("+", ""), 10);
  var increment = target / 300;

  if (count < target) {
    $this.text(Math.ceil(count + increment) + "+");
    setTimeout(function () {
      updateCounter($this, target);
    }, 1);
  } else {
    $this.text(target + "+");
  }
}

function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      $(document).ready(function () {
        $(".counter").each(function () {
          var $this = $(this);
          var target = $this.data("count-to");
          updateCounter($this, target);
        });
      });
      observer.unobserve(entry.target);
    }
  });
}

let observer = new IntersectionObserver(handleIntersection, {
  root: null,
  threshold: 0.5,
});

const aboutSection = document.querySelector("#about");
observer.observe(aboutSection);

// Data for activities
function displayActivities() {
  const upcomingActivityContainer = document.querySelector(
    "#upcoming-activity-container"
  );
  const recentActivities = document.querySelector("#recent-activities");

  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  fetch(`${apiUrl}/api/v1/activity/upcoming`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const activities = data;

      // Render Upcoming activities

      activities.forEach((activity) => {
        const activityElement = document.createElement("div");
        activityElement.classList.add(
          "relative",
          "rounded-2xl",
          "p-[3px]",
          "w-72",
          "md:w-[400px]",
          "min-h-[400px]",
          "bg-[url('/assets/images/LoginandSignupbg-1.jpg')]",
          "bg-no-repeat",
          "bg-center",
          "bg-cover"
        );

        activityElement.innerHTML = `
        <div class="flex flex-col gap-4 p-6 rounded-xl bg-blackPearl">
            <p class="text-2xl font-semibold">${activity.title}</p>
            <p class="text-lg">${activity.description}</p>
            <div>
              <p class="font-semibold text-xl">Date:</p>
              <p>${formatDate(activity.startDate)}</p>
            </div>
            <div>
              <p class="font-semibold text-xl">Location:</p>
              <p>${activity.location}</p>
            </div>
            <div class="mb-16 flex flex-col gap-2">
              <p class="font-semibold text-xl">Participants:</p>
              <div class="flex gap-2 items-center">
                <div class="self-start flex-shrink-0 mr-1 leading-[1]">
                  <img
                    class="inline-block relative rounded-[50%] w-10 h-10 border-1 border-solid border-color-transparent -ml-2 first:ml-0 lazy-loaded"
                    data-ghost-classes="bg-color-entity-ghost-background"
                    data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2" alt=""
                    aria-busy="false" src="https://static.licdn.com/aero-v1/sc/h/ep18cz0zbog1k61nu8kk2kwmr">

                  <img
                    class="inline-block relative rounded-[50%] w-10 h-10 border-1 border-solid border-color-transparent -ml-2 first:ml-0"
                    data-ghost-classes="bg-color-entity-ghost-background"
                    data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2" alt=""
                    aria-busy="false" src="https://static.licdn.com/aero-v1/sc/h/8w44rdi2q9j581bh0jvajry6x">


                  <img
                    class="inline-block relative rounded-[50%] w-10 h-10 border-1 border-solid border-color-transparent -ml-2 first:ml-0"
                    data-ghost-classes="bg-color-entity-ghost-background"
                    data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2" alt=""
                    aria-busy="false" src="https://static.licdn.com/aero-v1/sc/h/4gybc9qd9imal0s1aw11rym5e">

                </div>
                <div>+${activity.volunteers.length} more</div>
              </div>
            </div>
            <button
              class="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-lg text-light bg-primary-default hover:bg-primary-hover w-32 py-2 px-5 rounded-xl font-semibold">Join
              now</button>
          </div>
        `;

        upcomingActivityContainer.append(activityElement);
      });
    });

  // Data for Recent activities

  fetch(`${apiUrl}/api/v1/activity/recent`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const activities = data;
      // Render activities
      activities.forEach((activity) => {
        const activityElement = document.createElement("div");
        activityElement.classList.add(
          "relative",
          "rounded-2xl",
          "p-[3px]",
          "w-72",
          "md:w-[400px]",
          "min-h-[400px]",
          "bg-[url('/assets/images/LoginandSignupbg-1.jpg')]",
          "bg-no-repeat",
          "bg-center",
          "bg-cover"
        );

        activityElement.innerHTML = `
          <div class="flex flex-col gap-4 p-6 rounded-xl bg-blackPearl">
              <p class="text-2xl font-semibold">${activity.title}</p>
              <p class="text-lg">${activity.description}</p>
              <div>
                <p class="font-semibold text-xl">Date:</p>
                <p>${formatDate(activity.startDate)}</p>
              </div>
              <div>
                <p class="font-semibold text-xl">Location:</p>
                <p>${activity.location}</p>
              </div>
              <div class="mb-16 flex flex-col gap-2">
                <p class="font-semibold text-xl">Participants:</p>
                <div class="flex gap-2 items-center">
                  <div class="self-start flex-shrink-0 mr-1 leading-[1]">
                    <img
                      class="inline-block relative rounded-[50%] w-10 h-10 border-1 border-solid border-color-transparent -ml-2 first:ml-0 lazy-loaded"
                      data-ghost-classes="bg-color-entity-ghost-background"
                      data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2" alt=""
                      aria-busy="false" src="https://static.licdn.com/aero-v1/sc/h/ep18cz0zbog1k61nu8kk2kwmr">
  
                    <img
                      class="inline-block relative rounded-[50%] w-10 h-10 border-1 border-solid border-color-transparent -ml-2 first:ml-0"
                      data-ghost-classes="bg-color-entity-ghost-background"
                      data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2" alt=""
                      aria-busy="false" src="https://static.licdn.com/aero-v1/sc/h/8w44rdi2q9j581bh0jvajry6x">
  
  
                    <img
                      class="inline-block relative rounded-[50%] w-10 h-10 border-1 border-solid border-color-transparent -ml-2 first:ml-0"
                      data-ghost-classes="bg-color-entity-ghost-background"
                      data-ghost-url="https://static.licdn.com/aero-v1/sc/h/9c8pery4andzj6ohjkjp54ma2" alt=""
                      aria-busy="false" src="https://static.licdn.com/aero-v1/sc/h/4gybc9qd9imal0s1aw11rym5e">
  
                  </div>
                  <div>+${activity.volunteers.length} more</div>
                </div>
              </div>
              <button
                class="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-lg text-light bg-primary-default hover:bg-primary-hover w-32 py-2 px-5 rounded-xl font-semibold">Join
                now</button>
            </div>
          `;
        recentActivities.append(activityElement);
      });
    });
}

window.watsonAssistantChatOptions = {
  integrationID: "b6f49f47-268e-4c43-8d07-52c1c3627d57",
  region: "us-south",
  serviceInstanceID: "7d47507e-b546-4b35-a962-1e3629185928",
  onLoad: async (instance) => {
    await instance.render();
  },
};
setTimeout(function () {
  const t = document.createElement("script");
  t.src =
    "https://web-chat.global.assistant.watson.appdomain.cloud/versions/" +
    (window.watsonAssistantChatOptions.clientVersion || "latest") +
    "/WatsonAssistantChatEntry.js";
  document.head.appendChild(t);
});

displayActivities();
