const form = document.querySelector(".weather-form");

async function showWeather(event) {
    event.preventDefault();
    const city = document.querySelector(".city").value.trim();
    const message = document.querySelector(".message");
    message.textContent = "Loading weather...";

    try {
        // await waits for each API response before moving to the next line.
        const searchResponse = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + encodeURIComponent(city) + "&count=1");
        if (!searchResponse.ok) {
            message.textContent = "Could not search for that city. Please try again.";
            return;
        }
        const searchData = await searchResponse.json();

        if (!searchData.results || searchData.results.length === 0) {
            message.textContent = "City not found. Try another name.";
            return;
        }

        const place = searchData.results[0];
        const weatherResponse = await fetch("https://api.open-meteo.com/v1/forecast?latitude=" + place.latitude + "&longitude=" + place.longitude + "&current=temperature_2m,relative_humidity_2m,wind_speed_10m&temperature_unit=fahrenheit");
        if (!weatherResponse.ok) { 
            message.textContent = "Could not get the weather. Please try again.";
            return;
        }
        const weatherData = await weatherResponse.json();
        const currentWeather = {
            temperature: weatherData.current.temperature_2m,
            humidity: weatherData.current.relative_humidity_2m,
            windSpeed: weatherData.current.wind_speed_10m
        };

        document.querySelector(".location").textContent = place.name;
        document.querySelector(".location-info").textContent = [place.admin1, place.country].filter(Boolean).join(", ");
        document.querySelector(".temperature").textContent = Math.round(currentWeather.temperature);
        document.querySelector(".humidity").textContent = currentWeather.humidity + "%";
        document.querySelector(".wind").textContent = Math.round(currentWeather.windSpeed) + " mph";
        document.querySelector(".api-object").textContent = JSON.stringify(currentWeather, null, 2);
        message.textContent = "";
    } catch {
        message.textContent = "Could not load weather. Check your internet connection and try again.";
    }
}

form.addEventListener("submit", showWeather);
