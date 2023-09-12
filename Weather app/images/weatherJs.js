const imageOfWeather = document.querySelector('.img-src');
const degreesText = document.querySelector('.deg');
const cityText = document.querySelector('.city');
const humidityPercentage = document.querySelector('.hum-percentage');
const windSpeed = document.querySelector('.wind-speed');

const myInputTextField = document.querySelector('.inp-text');
const myInputSearchButton = document.querySelector('.search-btn');

async function updateInfo(city) {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=";
    let apiKey = "dce6dc38844a3cca159d69eee2f287c9";

    let response = await fetch(url + city + `&appid=${apiKey}`);
    let data = await response.json();

    console.log(data);
}

myInputSearchButton.addEventListener('click', () => {
    let cityEntered = myInputTextField.value;
    updateInfo(cityEntered);
})