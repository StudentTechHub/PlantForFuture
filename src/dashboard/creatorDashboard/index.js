document.addEventListener("DOMContentLoaded", async () => {
  const activityInfoDiv = document.querySelector("#activity-info");
  const avatarDiv = document.querySelector("#avatar-dropdown");
  const dropdownMenu = document.querySelector("#dropdown-menu");
  const addActivity = document.querySelector("#addActivity");
  addActivity.addEventListener("click", createActivityModal);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/v1/creator/me`, {
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
      console.error("Error fetching user data:", error);
      activityInfoDiv.textContent = "Failed to load user data.";
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
  document.querySelector("#logout").addEventListener("click", async () => {
    try {
      const response = await fetch(`/api/v1/creator/logout`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      window.location.href = "/joinUs/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  });

  const inputs = document.querySelectorAll("input[name='radio-group']");

  let activityType;
  inputs.forEach((input) => {
    input.addEventListener("change", function () {
      activityType =
        (document.querySelector("input#plantation").checked &&
          document
            .querySelector("input#plantation")
            .getAttribute("data-value")) ||
        (document.querySelector("input#garbageCleaning").checked &&
          document
            .querySelector("input#garbageCleaning")
            .getAttribute("data-value")) ||
        (document.querySelector("input#awareness").checked &&
          document
            .querySelector("input#awareness")
            .getAttribute("data-value"));
    });
  });

  // createActivity
  function createActivity() {
    const activityName = document.getElementById("activityName").value;
    const activityDescription = document.getElementById(
      "activity-description"
    ).value;
    const activityStartDate = new Date(
      document.getElementById("startDate").value
    );
    const activityEndDate = new Date(document.getElementById("endDate").value);
    
    const activityLocation = document.getElementById("activity-location").value;

    const activity = {
      type: activityType,
      title: activityName,
      description: activityDescription,
      startDate: activityStartDate,
      endDate: activityEndDate,
      location: activityLocation,
    };

    fetch("/api/v1/creator/create-activity", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(activity),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        // window.location.href = "/dashboard/creatorDashboard";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function deleteActivity(activityId) {
    fetch(`/api/v1/creator/activity/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/dashboard/creatorDashboard";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  function displayActivities() {
    fetch("/api/v1/activity/recent", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        const activities = data.activities;
        const activitiesDiv = document.getElementById("activities");
        activitiesDiv.innerHTML = "";
        activities.forEach((activity) => {
          const activityDiv = document.createElement("div");
          activityDiv.className = "activity";
          activityDiv.innerHTML = `
          <p class="text-2xl font-semibold">${activity.title}</p>
          <p class="text-lg">${activity.description}</p>
          <div>
            <p class="font-semibold text-xl">Date:</p>
            <p>${activity.startDate}</p>
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
          activitiesDiv.appendChild(activityDiv);
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  displayActivities();

  function createActivityModal() {
    const modal = document.getElementById("create-activity-modal");
    modal.classList.add("flex");
    modal.classList.remove("hidden");

    const closeBtn = document.getElementById("closeBtn");

    closeBtn.onclick = function () {
      modal.classList.add("hidden");
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.classList.add("hidden");
      }
    };

    const createActivityForm = document.querySelector("#create-activity-form");

    createActivityForm.onsubmit = function (e) {
      e.preventDefault();
      createActivity();
    };
  }
});
