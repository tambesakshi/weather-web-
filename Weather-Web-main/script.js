// initializing elements
const tempItem = document.querySelector(".weather1");
const locationItem = document.querySelector(".weather2 p");
const datetimeItem = document.querySelector(".weather2 span");
const conditionlogo = document.querySelector(".weather3 img");
const conditionItem = document.querySelector(".weather3 span");
const searchCity = document.querySelector(".searchField");
const form = document.querySelector("form");

// default location
let targetLocation = "Pune";

// function to fetch api from Weather API
const fetchData = async(targetLocation)=>{
    try {
        // fetch using async await
        const url = (`https://api.weatherapi.com/v1/current.json?key=d9e56406273f433994070648230807&q=${targetLocation}`);
        const response = await fetch(url);
        const data = await response.json();

        /*
        // Destructuring
        const {
            current: {
            temp_c,
            condition: { text, icon },
            },
            location: { name, localtime },
        } = data;
        */
        // same as destructuring
        const temp = data.current.temp_c;
        const location = data.location.name;
        const icon = data.current.condition.icon;
        const condition = data.current.condition.text;
        
        const time = data.location.localtime;
        const a = String(time);

        // spliting date and time 
        const showDate = a.split(" ")[0];
        const showtime = a.split(" ")[1];
        const exactday = getDayfullname(new Date(showDate).getDay());

        // updating dom
        tempItem.innerText = temp+"°";
        locationItem.innerText = location;
        datetimeItem.innerText = `${showtime} - ${exactday} ${showDate}`;
        conditionlogo.src = icon;
        conditionItem.innerText = condition;

    } 
    catch (error) {
        alert("Enter the correct location")
    };
}


// default call
fetchData(targetLocation);

// event listener for form submit
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    targetLocation = searchCity.value;
    fetchData(targetLocation);
})

// function to get day
function getDayfullname(a){
    switch (a) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
        default:
            return "Not a day";
    }
}