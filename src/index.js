function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${hours}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `Last updated: ${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;
  let temperatureElement = document.querySelector("#temperature");
  celsiusTemperature = Math.round(response.data.main.temp);
  temperatureElement.innerHTML = celsiusTemperature;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = response.data.wind.speed;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiKey = "c13ec1823489873786dad083e25adf72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = celsiusTemperature;
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
}

let form = document.querySelector("#city-input");
form.addEventListener("submit", handleSubmit);
let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");
