let imageOfWeather = document.querySelector('.img-src');
let degreesText = document.querySelector('.deg');
let cityText = document.querySelector('.city');
let humidityPercentage = document.querySelector('.hum-percentage');
let windSpeed = document.querySelector('.wind-speed');

const myInputTextField = document.querySelector('.inp-text');
const myInputSearchButton = document.querySelector('.search-btn');

async function updateInfo(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiKey = "dce6dc38844a3cca159d69eee2f287c9";

    let response = await fetch(url + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);

    degreesText.innerText = Math.round(data.main.temp) + "deg";
    cityText.innerText = data.name;
    humidityPercentage.innerText = data.main.humidity + "%";
    windSpeed.innerText = data.wind.speed + "km/h";

    // Update the img src according to the weather temperature

    let typeOfWeather = data.weather[0].main;

    //Here can be possible errors with the ===
    // possible errors with the file paths

    if(typeOfWeather === "Clouds"){
        imageOfWeather.srx = "clouds.png";
    }else if(typeOfWeather === "Clear"){
        imageOfWeather.src = "clear.png";
    }else if(typeOfWeather === "Rain"){
        imageOfWeather.src = "rain.png";
    }else if(typeOfWeather === "Drizzle"){
        imageOfWeather.src = "drizzle.png";
    }else if(typeOfWeather === "Mist"){
        imageOfWeather.src = "mist.png";
    }else if(typeOfWeather === "Snow"){
        imageOfWeather.src = "snow.png";
    }else {
        alert("No weather icon available for the usage of the API!");
    }
}

myInputSearchButton.addEventListener('click', () => {
    let cityEntered = myInputTextField.value;
    updateInfo(cityEntered);
})