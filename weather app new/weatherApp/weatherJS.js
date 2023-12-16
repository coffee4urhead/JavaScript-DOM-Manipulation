let imageOfWeather = document.querySelector('.img-src');
let degreesText = document.querySelector('.°C');
let cityText = document.querySelector('.city');
let humidityPercentage = document.querySelector('.hum-percentage');
let windSpeed = document.querySelector('.wind-speed');
let feelsLikeTemperatureParagraph = document.querySelector('.feels-like');

const myInputTextField = document.querySelector('#inp-text');
const myInputSearchButton = document.querySelector('.search-btn');

async function updateInfo(city = null) {
    
    if ( myInputTextField.value.length === 0 ) {
        alert("You didnt enter a city name!");
        return;
    }
    else {
        let regexForSymbolCheck = /[./><;:'@[{}\]\#\~\+\=\_\-\¬\`\!\"\£\$\%\^\&\*0-9]+/gm;

        if ( regexForSymbolCheck.test(city) ) {
            alert("The city name cannot contain symbols nor numbers");
            return;
        }
    }
    
    let response = await fetch(`/apiResp/${city}`);
    let data = await response.json();
    console.log(data);
    
    if(data.cod === "404" || data.cod === "400"){
        alert("Cannot find the city you are looking for. Maybe you entered a city that didn`t exist. Try using a real city name!");
        return;
    }
    let feelsLikeTemp = data.main.feels_like;

    feelsLikeTemperatureParagraph.innerText = `Feels like: ${Math.round(feelsLikeTemp)} °C`;
    degreesText.innerText = Math.round(data.main.temp) + "°C";
    cityText.innerText = data.name;
    humidityPercentage.innerText = data.main.humidity + "%";
    windSpeed.innerText = data.wind.speed + "km/h";

    let typeOfWeather = data.weather[0].main;

    if( typeOfWeather === "Clouds" ){
        imageOfWeather.src = "images/cloudy.svg";
    }else if( typeOfWeather === "Clear" ) {
        imageOfWeather.src = "images/clear-day.svg";
    }else if ( typeOfWeather === "Rain" ) {
        imageOfWeather.src = "images/rain.svg";
    }else if ( typeOfWeather === "Drizzle" ) {
        imageOfWeather.src = "images/drizzle.svg";
    }else if ( typeOfWeather === "Mist" ) {
        imageOfWeather.src = "images/mist.svg";
    }else if ( typeOfWeather === "Snow" ) {
        imageOfWeather.src = "images/snow.svg";
    } else {
        alert( "No weather icon available for the usage of the API!" );
    }
}

myInputSearchButton.addEventListener('click', () => {
    let cityEntered = myInputTextField.value;
    updateInfo(cityEntered);
})