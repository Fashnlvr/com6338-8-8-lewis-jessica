document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("#weather-app form");
    const input = document.querySelector("#weather-search");
    const weatherSection = document.querySelector("#weather");
    const API_KEY = "719259f4823a776e0ca2e359ef05503d";
  
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const query = input.value.trim();
      if (!query) return;
  
      weatherSection.innerHTML = "";
      input.value = "";
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${API_KEY}`;
  
      try {
        const response = await fetch(url);
        const data = await response.json();
  
        if (response.status !== 200) {
          weatherSection.innerHTML = "<h2>Location not found</h2>";
          return;
        }
  
        const { name, sys, weather, main, coord, dt } = data;
        const timeString = new Date(dt * 1000).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
        });
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
        const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coord.lat},${coord.lon}`;
  
        weatherSection.innerHTML = `
          <h2>${name}, ${sys.country}</h2>
          <a href="${googleMapsUrl}" target="_blank">Click to view map</a>
          <img src="${iconUrl}" alt="${weather[0].description}">
          <p style="text-transform: capitalize;">${weather[0].description}</p>
          <p>Current: ${main.temp}° F</p>
          <p>Feels like: ${main.feels_like}° F</p>
          <p>Last updated: ${timeString}</p>
        `;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        weatherSection.innerHTML = "<h2>Error retrieving weather data</h2>";
      }
    });
  });
  