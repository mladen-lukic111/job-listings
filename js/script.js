let dataList = [];

// Fetching data from data.json file

const fetchData = async () => {
  try {
    const response = await fetch("data.json");

    if (!response.ok) throw new Error("Network response was not ok");

    const data = await response.json();

    dataList = data.map((item) => ({
      ...item,
      categories: [item.role, item.level, ...item.languages],
    }));
  } catch (error) {
    console.error("Error due to fetching data:", error);
  }
};

let jobsContainer = document.querySelector(".jobs-container");

// Function that populates HTML
const populateHTML = async () => {
  await fetchData();

  dataList.forEach((job) => {
    // Checking if object has new and featured key value true or not
    const hasNew = job.new === true;
    const newButton = hasNew ? `<button class='new'>New!</button>` : "";

    const hasFeatured = job.featured === true;
    

    const featuredButton = hasFeatured
      ? `<button class='new'>Featured!</button>`
      : "";

    jobsContainer.innerHTML += `<div class='jobs-wrapper'>
                                  <div class='content'>
                                    <div class='image-wrapper'><img src='${job.logo}' alt=''/></div>
                                    <div class='description'>
                                      <div class='first-row'><span class='company'>${job.company}</span><span>${newButton}</span><span>${featuredButton}</span></div>
                                      <div class='second-row'><p>${job.position}</p></div>
                                      <div class='third-row'><span>${job.postedAt}</span>&#x2022;<span>${job.contract}</span>&#x2022;<span>${job.location}</span></div>
                                    </div>
                                  </div>
                                  <div class='categories'></div>
                                </div>`;
  });
};

// Calling function for fetching data
fetchData();

populateHTML();
