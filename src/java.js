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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
// Temperature and other Features
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weatherForecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
    <div class=" col-md-2">
   
    <div class="forecast"> ${formatDay(forecastDay.dt)} 
    
      <img src="http://openweathermap.org/img/wn/${
        forecastDay.weather[0].icon
      }@2x.png" alt="" id="iconForecast"> 
      <div class="forecast-temp">
      <span class="forecast-temp-min"> ${Math.round(
        forecastDay.temp.min
      )}º </span>|<span class="forecast-temp-max"> ${Math.round(
          forecastDay.temp.max
        )}º </span>
      </div>
      </div>
    </div> 
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let cityElement = document.querySelector("#city");
  let tempElement = document.querySelector("#currentTemperature");
  let feelsLike = document.querySelector("#feelsLike");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");

  celciusTemperature = response.data.main.temp;

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

// Unit of Temperature

let celciusTemperature = null;

function displayFahrenheit(event) {
  event.preventDefault();
  let tempertureElement = document.querySelector("#currentTemperature");
  let fahrenheitTemperature = (celciusTemperature * 9) / 5 + 32;
  tempertureElement.innerHTML = `${Math.round(fahrenheitTemperature)} ℉`;
}

let changeFahrenheit = document.querySelector("#fahrenheit");
changeFahrenheit.addEventListener("click", displayFahrenheit);
