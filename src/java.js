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

function displayTemperature(response) {
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = `Current Temperature is ${Math.round(
    response.data.main.temp
  )} ℃`;
  let feelsLike = document.querySelector("#feelsLike");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let icon = document.querySelector("#icon");
  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)} ℃`;
  console.log(response.data);
  description.innerHTML = response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = `${Math.round(response.data.wind.speed)} km/h`;
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

let apiKey = "f9113edd4d5c19caba9923a536e8e53e";
let cityInput = "london";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
