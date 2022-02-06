// Date and Time
let now = new Date();
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
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let dateTime = document.querySelector("#date");
dateTime.innerHTML = `${day}, ${hour}:${minutes}`;

// Temperature and other Features

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#currentTemperature");
  let feelsLike = document.querySelector("#feelsLike");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  cityElement.innerHTML = response.data.name;
  tempElement.innerHTML = `${Math.round(response.data.main.temp)} ℃`;
  feelsLike.innerHTML = `Feels Like: ${Math.round(
    response.data.main.feels_like
  )} ℃`;
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = `Humidity:
   ${response.data.main.humidity}%`;
  wind.innerHTML = `Wind:
  ${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function searchCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#newCity");
  search(cityElement.value);
}

let from = document.querySelector("#searchCity");
from.addEventListener("submit", searchCity);

function retrivePosition(position) {
  let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}
function currentLocationSearch(event) {
  navigator.geolocation.getCurrentPosition(retrivePosition);
}

let currentLocationLocator = document.querySelector("#currentLocation");
currentLocationLocator.addEventListener("click", currentLocationSearch);

//Forecast

function getForecast(coordinates) {
  let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast() {
  let forecastElement = document.querySelector("#weatherForecast");
  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class=" col-2">
      ${day}
      <img src="" alt="" id="icon"> 
      <div class="forecast-temp">
      <span class="forecast-temp-min"> 10º </span> |
      <span class="forecast-temp-max"> 20º </span>
      </div>
    </div> 
  `;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// Unit of Temperature
function celcisusUnitChange(event) {
  event.preventDefault();
  let temperatureCelcius = document.querySelector("#currentTemperature");
  let celcius = 3;
  temperatureCelcius.innerHTML = celcius;
}
let changeCelcius = document.querySelector("#celcicus");
changeCelcius.addEventListener("click", celcisusUnitChange);

function fahrenheitUnitChange(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#currentTemperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let changeFahrenheit = document.querySelector("#fahrenheit");
changeFahrenheit.addEventListener("click", fahrenheitUnitChange);

let celsiusTemperature = null;
