const userInfoDiv = document.querySelector("#user-info");
const avatarDiv = document.querySelector("#avatar-dropdown");
const dropdownMenu = document.querySelector("#dropdown-menu");

const fetchUserData = async () => {
  try {
    const response = await fetch(`/api/v1/volunteer/me`, {
      method: "GET",
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
    console.error("Error fetching data:", error);
    userInfoDiv.textContent = "Failed to load data.";
  }
};

const displayUserData = (data) => {
  document.querySelector(".pfp").src = `/assets/images/volunteer-${
    data.gender === "male" ? "boy" : "girl"
  }.png`;
  document.querySelectorAll(".user-name").forEach((elem) => {
    elem.innerText = `${data.fullName}`;
  });
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
      const response = await fetch(`/api/v1/volunteer/logout`, {
        method: "GET",
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

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function displayActivities() {
  fetch("/api/v1/volunteer/my-activities", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const activities = data;
      const activitiesDiv = document.getElementById("activities");

      activities.forEach((activity, index) => {
        const activityElement = document.createElement("div");
        activityElement.className = "activity";
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
          <div class="flex flex-col gap-4 p-6 rounded-xl h-full pb-20 bg-blackPearl">
              <p class="text-2xl text-left font-semibold">${activity.title}</p>
              <p class="text-lg text-left">${activity.description}</p>
              <div>
                <p class="font-semibold text-left text-xl">Date:</p>
                <p class="text-lg text-left">${formatDate(
                  activity.startDate
                )}</p>
              </div>
              <div>
                <p class="font-semibold text-left text-xl">Location:</p>
                <p class="text-lg text-left">${activity.location}</p>
              </div>
              <div class="flex flex-col gap-2">
                <p class="font-semibold text-xl text-left">Participants:</p>
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
                  <div class="text-lg text-left">+${
                    activity.volunteers.length
                  } more</div>
                </div>
              </div>
                <button
                  id="leave-activity${index}"
                  class="absolute my-4 bottom-0 text-lg text-light bg-primary-red-default hover:bg-primary-red-hover w-32 py-2 px-5 rounded-xl font-semibold"
                  >
                  Leave
                </button>
            </div>
        `;
        activitiesDiv.appendChild(activityElement);
        document
          .getElementById(`leave-activity${index}`)
          .addEventListener("click", () => {
            leaveActivity(activity._id);
          });
      });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

function leaveActivity(activityId) {
  fetch(`/api/v1/volunteer/activity/${activityId}/leave`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      window.location.reload();
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

displayActivities();
