const form = document.getElementById("search");
const date = document.getElementById('date');
const weatherInfo = document.getElementById("weather-info");
const weatherCard = document.getElementById("weather-card");
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    const data = new FormData(event.target);
    data.forEach(function(value, key){
        console.log(key, value);
    });
    getWeather(data.get("city").trim().toLowerCase(), data.get("state").trim().toLowerCase())
        .then(createWeatherCard)
});
const API_KEY = "e2c2f01a9184c7efcec6757e51818436";
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

async function getWeather(city, state, apiKey=API_KEY){
    const response = await fetch(`${BASE_URL}?appid=${apiKey}&q=${city},${state},US&units=imperial`);
    const data = await response.json();
    return data;
}

function createWeatherCard({ weather, main, ...data}){
    console.log(weather, main, data);
    const mainText = weather[0].main;
    const description = weather[0].description;
    date.innerHTML = `
        <div class="d-flex flex-column justify-content-center">
            <p>${mainText}</p>
            <p>${description}</p>
        </div>
    `;
    weatherInfo.innerHTML = '';
    for(const key in main){
        weatherInfo.innerHTML +=  `<li>`;
        if(key == "temp" && main[key] > 60){
            weatherInfo.innerHTML += `<i class="bi bi-sun"></i>`
        }
        weatherInfo.innerHTML +=  `
            ${key}: ${main[key]}
        </li>`
    }
    weatherCard.classList.remove("d-none");
    
}