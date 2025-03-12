document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#weather-app form");
    const input = document.querySelector("#weather-search");
    const weatherSection = document.querySelector("#weather");
    
    const API_KEY = "719259f4823a776e0ca2e359ef05503d"; 
    const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); 

        const query = input.value.trim();
        if (!query) return;

        weatherSection.innerHTML = "";
        
        try {
            const response = await fetch(`${BASE_URL}?q=${query}&units=imperial&appid=${API_KEY}`);
            const data = await response.json();

            if (response.ok) {
                displayWeather(data);
            } else {
                weatherSection.innerHTML = "<h2>Location not found</h2>";
            }
        } catch (error) {
            console.error("Error fetching weather data:", error);
            weatherSection.innerHTML = "<h2>Error retrieving data. Please try again.</h2>";
        }

        input.value = "";
    });
    
    function displayWeather(data) {
        const { name, sys, main, weather, coord, dt } = data;
        
        const weatherHTML = `
            <h2>${name}, ${sys.country}</h2>
            <a href="https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}" target="_blank">Click to view map</a>
            <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="${weather[0].description}">
            <p style="text-transform: capitalize;">${weather[0].description}</p>
            <p>Current: ${main.temp.toFixed(1)}° F</p>
            <p>Feels like: ${main.feels_like.toFixed(1)}° F</p>
            <p>Last updated: ${new Date(dt * 1000).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}</p>
        `;

        weatherSection.innerHTML = weatherHTML;
    }
});
