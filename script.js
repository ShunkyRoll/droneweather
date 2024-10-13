const apiKey = '0b9244c64357ca623ae1c8c866ae32dc'; // Your OpenWeatherMap API key
const weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Girvan,GB&units=metric&appid=${apiKey}`;

// DOM elements
const windLight = document.getElementById('wind-light');
const rainLight = document.getElementById('rain-light');
const visibilityLight = document.getElementById('visibility-light');

// Fetch weather data
async function fetchWeatherData() {
    try {
        const response = await fetch(weatherApiUrl);
        const data = await response.json();

        console.log(data);  // Check API response in console

        // Wind speed in m/s, converted to mph
        const windSpeed = data.wind.speed * 2.237; // Convert m/s to mph
        // Rain probability simulated from rain data (if it exists, assume rain)
        const rainProbability = data.rain && data.rain['1h'] ? 100 : 0;
        // Visibility in meters, converted to kilometers
        const visibility = data.visibility ? data.visibility / 1000 : 10; // Assume good visibility if missing

        // Update wind light
        updateLight(windLight, windSpeed, {
            red: windSpeed >= 21,
            amber: windSpeed >= 13 && windSpeed < 21,
            green: windSpeed < 13
        });

        // Update rain light
        updateLight(rainLight, rainProbability, {
            red: rainProbability > 70,
            amber: rainProbability > 30 && rainProbability <= 70,
            green: rainProbability <= 30
        });

        // Update visibility light
        updateLight(visibilityLight, visibility, {
            red: visibility < 1,
            amber: visibility >= 1 && visibility < 5,
            green: visibility >= 5
        });

    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

// Function to update traffic light
function updateLight(lightContainer, value, thresholds) {
    const redLight = lightContainer.querySelector('.red');
    const amberLight = lightContainer.querySelector('.amber');
    const greenLight = lightContainer.querySelector('.green');

    // Reset all lights
    redLight.classList.remove('active');
    amberLight.classList.remove('active');
    greenLight.classList.remove('active');

    // Set appropriate light based on thresholds
    if (thresholds.red) {
        redLight.classList.add('active');
    } else if (thresholds.amber) {
        amberLight.classList.add('active');
    } else if (thresholds.green) {
        greenLight.classList.add('active');
    }
}

// Fetch weather data on page load
fetchWeatherData();
