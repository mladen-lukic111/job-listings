
let dataList = [];


// Fetching data from data.json file

const fetchData = async () => {
    try {
        const response = await fetch("data.json");
        const data = await response.json();

        data.forEach(item => {
            let newItem = {
                ...item,
            };
            dataList.push(newItem);
        });

    } catch (error) {
        console.error("Error due to fetching data:", error);
    }
};

// console.log(dataList, typeof(dataList));

// Calling function for fetching data
fetchData();

