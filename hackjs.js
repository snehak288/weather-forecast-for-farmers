document.getElementById('submitBtn').addEventListener('click', getWeather);
info={
"light rain": "rice,barley",
"haze": "mushroom, leafy greens",
"clear sky":"tomato, pepper",
"few clouds":"tomato,cucumbers",
"scattered clouds":"lettuce,spinach",
"overcast clouds": "leafy greens, mushroom",
"mist":"sphagnum,moss,fern",
"moderate rain":"rice,corn,wheat",
}

function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = '3586e23f3920e20b99a62d309043eb63';  // Replace with your actual API key

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

  function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');

    if (data.cod === '404') {
        weatherInfo.innerHTML = `<p>City not found</p>`;
    } else {
        const description = data.weather[0].description;
        const temperature = (data.main.temp - 273.15).toFixed(2);  // Convert from Kelvin to Celsius
        const humidity = data.main.humidity;
        
        weatherInfo.innerHTML = `
            <p>Description: ${description}</p>
            <p>Crops: ${info[description]}</p>
            <p>Temperature: ${temperature}°C</p>
            <p>Humidity: ${humidity}%</p>
           
            `;
    }
}
document.getElementById('cityInput').addEventListener('keyup', function (event) {
    if (event.key=='Enter') {
        // 13 is the key code for "Enter"
        getWeather();
    }
});