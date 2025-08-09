function displayTemperature(response) {
  let temperature = Math.round(response.data.temperature.current);
  let cityName = response.data.city;

  let cityElement = document.querySelector("#current-city");

  let temperatureElement = document.querySelector("#current-temperature");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon" />`;

  cityElement.innerHTML = cityName;
  temperatureElement.innerHTML = Math.round(temperature);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windElement.innerHTML = `${response.data.wind.speed}km/h`;
  timeElement.innerHTML = formatDate(date);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();

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

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  return `${day} ${hours}:${minutes}`;
}

function getForecast(city) {
  let apiKey = "1t7b4ado35ccfb0c2c30ac5eb63faeaa";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiUrl)
    .then(displayForecast)
    .catch(function (error) {
      console.error("Error fetching forecast:", error);
    });
}

function searchCity(city) {
  let apiKey = "1t7b4ado35ccfb0c2c30ac5eb63faeaa";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
  getForecast(city);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  searchCity(city);
}

// Показуємо погоду в Парижі за замовчуванням
searchCity("Paris");

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  response.data.daily.slice(1, 6).forEach(function (day) {
    let date = new Date(day.time * 1000);
    let dayName = days[date.getDay()];

    forecastHTML += `
      <div class="forecast-day">
        <div class="forecast-name">${dayName}</div>
        <img src="${day.condition.icon_url}" alt="" class="forecast-icon" />
        <div class="forecast-temp">${Math.round(
          day.temperature.maximum
        )}° / ${Math.round(day.temperature.minimum)}°</div>
      </div>
    `;
  });

  forecastElement.innerHTML = forecastHTML;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
