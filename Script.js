document.getElementById('getWeatherBtn').addEventListener('click', function() {
  const city = document.getElementById('cityInput').value;
  const apiKey = https//api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}


'; // Replace with your OpenWeatherMap API' 
  const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  // Fetch current weather
  fetch(currentWeatherUrl)
    .then(response => response.json())
    .then(data => {
      displayCurrentWeather(data);
    })
    .catch(error => {
      console.error('Error fetching current weather:', error);
    });

  // Fetch 5-day forecast
  fetch(forecastUrl)
    .then(response => response.json())
    .then(data => {
      displayForecast(data);
    })
    .catch(error => {
      console.error('Error fetching forecast:', error);
    });
});

function displayCurrentWeather(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  if (data.cod === 200) {
    const weatherHtml = `
      <h2>Current Weather in ${data.name}</h2>
      <p>Temperature: ${data.main.temp}°C</p>
      <p>Weather: ${data.weather[0].description}</p>
      <p>Humidity: ${data.main.humidity}%</p>
      <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
    weatherInfo.innerHTML = weatherHtml;
  } else {
    weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
  }
}

function displayForecast(data) {
  const weatherInfo = document.getElementById('weatherInfo');
  if (data.cod === '200') {
    const forecastHtml = data.list.map(day => `
      <div>
        <p>Date: ${new Date(day.dt * 1000).toLocaleDateString()}</p>
        <p>Temperature: ${day.main.temp}°C</p>
        <p>Weather: ${day.weather[0].description}</p>
      </div>
    `).join('');
    weatherInfo.innerHTML += `<h2>5-Day Forecast</h2>${forecastHtml}`;
  } else {
    weatherInfo.innerHTML += `<p>Forecast data not available.</p>`;
  }
}