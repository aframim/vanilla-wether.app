//Get current date and time
let celsiusTemperature = null;
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
  let apiKey = "39o483e0c08f21f9ct0a8cbbad45f55a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityInput.value}&key=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showPosition);
}

let searchCity = document.getElementById("search-form");
searchCity.addEventListener("submit", search);

//Temperature
function weatherCondition(response) {
  let descriptionElement = document.getElementsByClassName("description")[0];
  let humidityElement = document.getElementsByClassName("humidity")[0];
  let windElement = document.getElementsByClassName("wind")[0];
  let iconElement = document.getElementById("icon");
 
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = response.data.temperature.humidity;
  windElement.innerHTML = response.data.wind.speed;
   iconElement.setAttribute(
     "src",
     `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
   );
}

function showPosition(response) {
  celsiusTemperature = response.data.temperature.current;
  let h3 = document.getElementById("temperature-display");
  let temperature = Math.round(celsiusTemperature);
  h3.innerHTML = `${temperature}`;
  let cityName = response.data.city;
  let h2 = document.getElementById("city-name");
  console.log(response.data);
  h2.innerHTML = cityName;
  weatherCondition(response);
}

//location

function retrievePosition(position) {
  let apiKey = "39o483e0c08f21f9ct0a8cbbad45f55a";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${latitude}&lon=${longitude}&key=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showPosition);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

//Current button

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  //add function to display weather in Fahrentheit
  let temperatureElement = document.querySelector("#temperature-display");
  //Removing active class from celsius-link and add Fahrenehit
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-display");
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

window.addEventListener("load", () => {
  search({ preventDefault: () => {} });
});

// Function to fetch weather data for Tehran
function fetchWeatherForTehran() {
  let apiKey = "39o483e0c08f21f9ct0a8cbbad45f55a";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=Tehran&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showPosition);
}

// Call the fetchWeatherForTehran function on page load
window.addEventListener("load", fetchWeatherForTehran);
