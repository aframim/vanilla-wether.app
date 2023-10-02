//Get current date and time
let now = new Date();
let h4 = document.querySelector("h4");
let date = now.getDate();
let hours = now.getHours();
let minutes = now.getMinutes();
let year = now.getFullYear();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
h4.innerHTML = `${hours}:${minutes} ${day}, ${month} ${date}, ${year}`;

//City

function search(event) {
  event.preventDefault();
  let cityInput = document.getElementById("city-input");
  let cityName = document.getElementById("city-name");
  cityName.innerHTML = cityInput.value;
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showPosition);
}
let searchCity = document.getElementById("search-form");
searchCity.addEventListener("submit", search);

//Temperature

function showPosition(response) {
  let h3 = document.getElementById("temperature-display");
  let temperature = Math.round(response.data.main.temp);
  h3.innerHTML = `${temperature}°C`;
  let h2 = document.getElementById("city-name");
  console.log(response.data);
  h2.innerHTML = `${response.data.name}`;
}

//location

function retrievePosition(position) {
  let apiKey = "c819171fe0abdc14039af4ef5dda283b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showPosition);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//Current button

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);
