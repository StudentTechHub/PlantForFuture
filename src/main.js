import $ from "jquery";
import "jquery.easing";

const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const upcomingActivityContainer = document.querySelector("#upcoming-activity-container");
const recentActivities = document.querySelector("#recent-activities");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("-translate-x-full");
  mobileMenu.classList.toggle("-translate-x-0");
});

// Counter
$(document).ready(function () {
  $(".counter").each(function () {
    var $this = $(this);
    var target = $this.data("count-to");

    function updateCounter() {
      var count = parseInt($this.text().replace("+", ""), 10);
      var increment = target / 300;

      if (count < target) {
        $this.text(Math.ceil(count + increment) + "+");
        setTimeout(updateCounter, 1);
      } else {
        $this.text(target + "+");
      }
    }

    updateCounter();
  });
});

// Data for activities
const activities = [
  {
    color:"#31A807",
    title: "Plantation Drive",
    description:
    "Join us in planting 2000 trees to help restore Green Valley Park",
    date: "August 15, 2024",
    location: "Green Valley, Delhi",
    participants: [
      {
        name: "Participant 1",
        email: "someone@example.com",
      },
      {
        name: "Participant 2",
        email: "someone1@example.com",
      },
      {
        name: "Participant 3",
        email: "someone2@example.com",
      },
      {
        name: "Participant 4",
        email: "someone3@example.com",
      },
    ],
  },
  {
    color: "#D2BC6B",
    title: "Beach Cleanup",
    description: "Help us clean up Sunny Beach and protect marine life",
    date: "September 5, 2024",
    location: "Sunny Beach, Sun City",
    participants: [
      {
        name: "Participant 1",
        email: "someone@example.com",
      },
      {
        name: "Participant 2",
        email: "someone1@example.com",
      },
      {
        name: "Participant 3",
        email: "someone2@example.com",
      },
      {
        name: "Participant 4",
        email: "someone3@example.com",
      },
    ],
  },
  {
    color: "#38AEB6",
    title: "River Cleansing Campaign",
    description: "Participate in our river cleansing campaign to keep Blue Riverbank clean and healthy.",
    date: "October 25, 2024",
    location: "Yamuna River, Delhi",
    participants: [
      {
        name: "Participant 1",
        email: "someone@example.com",
      },
      {
        name: "Participant 2",
        email: "someone1@example.com",
      },
      {
        name: "Participant 3",
        email: "someone2@example.com",
      },
      {
        name: "Participant 4",
        email: "someone3@example.com",
      },
    ],
  },
];

// Render activities
activities.forEach((activity) => {
  const activityElement = document.createElement("div");
  activityElement.style.backgroundColor = activity.color;
  activityElement.style.opacity = 0.9;
  activityElement.classList.add(
    "relative",
    "flex",
    "flex-col",
    "gap-4",
    "rounded-2xl",
    "p-8",
    "w-72",
    "md:w-[400px]",
    "min-h-[480px]"
  );

  activityElement.innerHTML = `
    <p class="text-2xl font-semibold">${activity.title}</p>
    <p class="text-lg">${activity.description}</p>
    <div>
      <p class="font-semibold text-xl">Date:</p>
      <p>${activity.date}</p>
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
        <div>+${activity.participants.length} more</div>
      </div>
    </div>
    <button
      class="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-lg text-light bg-primary-default hover:bg-primary-hover w-32 py-2 px-5 rounded-xl font-semibold">Join
      now</button>
  </div>
`;

  upcomingActivityContainer.append(activityElement);
  recentActivities.append(activityElement.cloneNode(true));
});
