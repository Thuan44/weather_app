// Elements
let weatherImage = document.querySelector('.weather-img');
let notifications = document.querySelector('.notifications');
let tempNumber = document.querySelector('.temperature-number');
let tempUnit = document.querySelector('.temperature-unit');
let tempContainer = document.querySelector('.weather-temperature')
let weatherDescription = document.querySelector('.weather-description');
let locationCity = document.querySelector('.location-city');
let locationCountry = document.querySelector('.location-country');


// ======== DISPLAY WEATHER ========== //
// Weather Object
const weather = {
    image: '02d',
    temp: {
        value: 30,
        unit: "c"
    },
    description: 'few clouds',
    location: {
        city: 'London',
        country: 'GB'
    }
}

// Display weather
displayWeather = () => {
    weatherImage.src = `assets/${weather.image}.png`;
    tempNumber.innerHTML = weather.temp.value;
    tempNumber.innerHTML = weather.temp.value;
    weatherDescription.innerHTML = weather.description;
    locationCity.innerHTML = weather.location.city;
    locationCountry.innerHTML = weather.location.country;
}


// ======== TEMPERATURE CONVERSION ========== //
// Convert Kelvin to Celsius
kelvinToCelsius = kelvin => {
    let celsius = Math.round(kelvin - 273.15);
    return celsius;
}

// Convert Celsius to Farenheit
celsiusToFarenheit = celsius => {
    let farenheit = Math.round((celsius * 9/5) + 32);
    return farenheit;
}

// Event of temperature conversion
tempContainer.addEventListener('click', () => {
    // From c to f
    if(tempUnit.innerHTML === 'c') {
        let farenheit = celsiusToFarenheit(weather.temp.value);
        tempNumber.innerHTML = farenheit;
        tempUnit.innerHTML = 'f';
    // From f to c
    } else {
        tempNumber.innerHTML = weather.temp.value;
        tempUnit.innerHTML = 'c';
    }
})


// ======== GEOLOCATION ========== //
// Get user geolocation
showPosition = position => {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeatherData(latitude, longitude);
}

// Display error message
showError = error => {
    let errorCode = error.code;
    if (errorCode === 1) {
        notifications.style.display = "block";
    }
}

// If geolcation is available on user's navigator
if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(showPosition, showError);
} else {
    notifications.innerHTML = 'Geolocation is not available on this navigator';
    notifications.style.display = "block";
}


// ======== API DATA ========== //
const key = '3a95ed30fd0745e9e315cf6be28965ae'
let weatherData;

getWeatherData = (latitude, longitude) => {
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api)
    .then(response => {
        let data = response.json();
        return data
    })

    // Update weather object
    .then(data => {
        weather.image = data.weather[0].icon
        weather.temp.value = kelvinToCelsius(data.main.temp);
        weather.description = data.weather[0].description
        weather.location.city = data.name;
        weather.location.country = data.sys.country;

        displayWeather();
    });
}


// ======== SWITCH BACKGROUND ========== //
let hour = (new Date()).getHours();
if(hour < 6 || hour > 20) {
    document.body.style.background = "url('assets/night.jpg') no-repeat center center / cover";
} else {
    document.body.style.background = "url('assets/day.jpg') no-repeat center center / cover";
}