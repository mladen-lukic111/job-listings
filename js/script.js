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

const jobsContainer = document.querySelector(".jobs-container");

// Function that populates HTML
const populateHTML = async () => {
  await fetchData();

  dataList.forEach((job) => {
    // Checking if object has new and featured key value true or not
    const hasNew = job.new === true;
    const newButton = hasNew ? `<button class='new-btn'>New!</button>` : "";

    const hasFeatured = job.featured === true;


    const featuredButton = hasFeatured
      ? `<button class='featured-btn'>Featured!</button>`
      : "";


    // Each category from array alone
    const categoryHTML = job.categories.map(category => `<button class='category'>${category}</button>`).join("");

    jobsContainer.innerHTML += `<div class='jobs-wrapper'>
                                  <div class='content'>
                                    <div class='image-wrapper'><img src='${job.logo}' alt=''/></div>
                                    <div class='description'>
                                      <div class='first-row'><span class='company'>${job.company}</span><span>${newButton}</span><span>${featuredButton}</span></div>
                                      <div class='second-row'><p>${job.position}</p></div>
                                      <div class='third-row'><span>${job.postedAt}</span>&#x2022;<span>${job.contract}</span>&#x2022;<span>${job.location}</span></div>
                                    </div>
                                  </div>
                                  <div class='categories'>
                                    ${categoryHTML}
                                  </div>
                                </div>`;
  });

  let categoryArray = [];

  const buttonsCategory = () => {
    let buttonsCategory = document.querySelectorAll(".category");
    buttonsCategory.forEach(button => {
      button.addEventListener('click', () => {
        // If there is no that item in the array it will be added
        if(!(categoryArray.includes(button.textContent))) {
          categoryArray.push(button.textContent);
        }
        // If the item is in the array
        else {
          alert('Item already exist.');
        }
        console.log(categoryArray);
      });
    });
  };


  // Function for getting value from clicked category
  buttonsCategory();

};


// Calling function for fetching data
fetchData();

populateHTML();
