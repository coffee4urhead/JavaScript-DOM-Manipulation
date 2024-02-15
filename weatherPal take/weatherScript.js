import "https://cdn.jsdelivr.net/npm/chart.js";

let imageOfWeather = document.querySelector('.img-src');
let degreesText = document.querySelector('.°C');
let cityText = document.querySelector('.city');
let humidityPercentage = document.querySelector('.hum-percentage');
let windSpeed = document.querySelector('.wind-speed');
let feelsLikeTemperatureParagraph = document.querySelector('.feels-like');

const myInputTextField = document.querySelector('#inp-text');
const myInputSearchButton = document.querySelector('.search-btn');

async function updateInfo(city = null) {
  let url = "https://api.openweathermap.org/data/2.5/weather?q=";
  let apiKey = "dce6dc38844a3cca159d69eee2f287c9";
  let metricSystemApplied = "&units=metric";

  if (myInputTextField.value.length === 0) {
    alert("You didnt enter a city name!");
    return;
  }
  else {
    let regexForSymbolCheck = /[./><;:'@[{}\]\#\~\+\=\_\-\¬\`\!\"\£\$\%\^\&\*0-9]+/gm;

    if (regexForSymbolCheck.test(city)) {
      alert("The city name cannot contain symbols nor numbers");
      return;
    }
  }

  let response = await fetch(url + city + `&appid=${apiKey}` + metricSystemApplied);
  let data = await response.json();

  if (data.cod === "404" || data.cod === "400") {
    alert("Cannot find the city you are looking for. Maybe you entered a city that didn`t exist. Try using a real city name!");
    return;
  }

  console.log(data);
  console.log("--------------------------");

  let apiKeyForWeather = 'e6c7b92e1d804267ab4164943231812';
  let date = new Date();
  let fetchDataTemp = await fetch('https://api.weatherapi.com/v1/history.json?key=' + apiKeyForWeather + `&q=${city}&dt=${date.toISOString().split("T")[0]}`);
  let responseData = await fetchDataTemp.json();
  console.log(responseData);

  // precip_mm
  let barChartData = responseData.forecast.forecastday[0].hour;
  let objToSend = [];
  for (let item of barChartData) {
    objToSend.push(item.precip_mm);
  }

  //Temperatures
  let lineChartsForTemperaturesData = responseData.forecast.forecastday[0].hour;
  let lineChartTempsInC = [];
  let lineChartTempsInF = [];

  for(let item of lineChartsForTemperaturesData){
    lineChartTempsInC.push(item.temp_c);
    lineChartTempsInF.push(item.temp_f);
  }
  let objPackaged = {
    "temp_c": lineChartTempsInC,
    "temp_f": lineChartTempsInF,
  };
  // Wind speed in kph and mph
  let lineChartDataForWind = responseData.forecast.forecastday[0].hour;
  let lineChartWindInKph = [];
  let lineChartWindInMph = [];

  for(let item of lineChartsForTemperaturesData){
    lineChartWindInMph.push(item.wind_mph);
    lineChartWindInKph.push(item.wind_kph);
  }
  let objPackagedWind = {
    "wind_mph": lineChartWindInMph,
    "wind_kph": lineChartWindInKph,
  };
  
  //Moon data
  let astroData = responseData.forecast.forecastday[0].astro;
  //
  
  //Chances of rain information
  let chancesData = responseData.forecast.forecastday[0].day;
  //

  updateChancesInformation(chancesData);
  addAstroInformation(astroData);
  createChart(objToSend, objPackaged, objPackagedWind);
  addUVIndexInfo(responseData);

  let feelsLikeTemp = data.main.feels_like;

  feelsLikeTemperatureParagraph.textContent = `Feels like: ${Math.round(feelsLikeTemp)} °C`;
  degreesText.textContent = Math.round(data.main.temp) + "°C";
  cityText.textContent = data.name;
  humidityPercentage.textContent = data.main.humidity + "%";
  windSpeed.textContent = data.wind.speed + "km/h";

  let typeOfWeather = data.weather[0].main;

  if (typeOfWeather === "Clouds") {
    imageOfWeather.src = "./images/pictures for weather app/cloudy.svg";
  } else if (typeOfWeather === "Clear") {
    imageOfWeather.src = "./images/pictures for weather app/clear-day.svg";
  } else if (typeOfWeather === "Rain") {
    imageOfWeather.src = "./images/pictures for weather app/rain.svg";
  } else if (typeOfWeather === "Drizzle") {
    imageOfWeather.src = "./images/pictures for weather app/drizzle.svg";
  } else if (typeOfWeather === "Mist") {
    imageOfWeather.src = "./images/pictures for weather app/mist.svg";
  } else if (typeOfWeather === "Snow") {
    imageOfWeather.src = "./images/pictures for weather app/snow.svg";
  } else {
    alert("No weather icon available for the usage of the API!");
  }
}

myInputSearchButton.addEventListener('click', () => {
  let cityEntered = myInputTextField.value;
  updateInfo(cityEntered);
})

async function createChart(barChartData, objDataForTemps, objWindData) {
  // Remove existing canvas elements
  const canvasWrapper = document.getElementById('canvas-wrapper');
  while (canvasWrapper.firstChild) {
    canvasWrapper.removeChild(canvasWrapper.firstChild);
  }

  // Create new canvas elements
  const barChartCanvas = document.createElement('canvas');
  barChartCanvas.id = 'bar-chart-precipitation';
  barChartCanvas.classList.add('chart');
  canvasWrapper.appendChild(barChartCanvas);

  const tempsChartCanvas = document.createElement('canvas');
  tempsChartCanvas.id = 'temp-chart';
  tempsChartCanvas.classList.add('chart');
  canvasWrapper.appendChild(tempsChartCanvas);
  
  const windChartCanvas = document.createElement('canvas');
  windChartCanvas.id = 'wind-speed-chart';
  windChartCanvas.classList.add('chart');
  canvasWrapper.appendChild(windChartCanvas);

  // Create new charts
  new Chart(barChartCanvas, {
    type: 'bar',
    data: {
      labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [{
        label: 'Precipitation',
        data: barChartData,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: 'Precipitation (mm)'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time of the day (hour)'
          }
        }
      }
    },
    legend: {
      labels: {
        fontSize: 16, 
      }
    },
    tooltips: {
      mode: 'index' 
    }
  });

  new Chart(tempsChartCanvas, {
    type: 'line',
    data: {
      labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [{
        label: 'Temperature (F)',
        data: objDataForTemps.temp_f,
        borderColor: 'rgb(255, 99, 132)',
        fill: true
      }, {
        label: 'Temperature (C)',
        data: objDataForTemps.temp_c,
        borderColor: 'rgb(54, 162, 235)',
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: 'Temperatures in Fahrenheit and Celsius'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time of the day (hour)'
          }
        }
      }
    },
    legend: {
      labels: {
        fontSize: 16, 
      }
    },
    tooltips: {
      mode: 'index'
    }
  });

  new Chart(windChartCanvas, {
    type: 'line',
    data: {
      labels: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
      datasets: [{
        label: 'Wind kph',
        data: objWindData.wind_kph,
        borderColor: 'rgb(255, 99, 132)',
        fill: true
      }, {
        label: 'wind mph',
        data: objWindData.wind_mph,
        borderColor: 'rgb(54, 162, 235)',
        fill: false
      }]
    },
    options: {
      scales: {
        y: {
          title: {
            display: true,
            text: 'Wind speed in kph and mph'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Time of the day (hour)'
          }
        }
      }
    },
    legend: {
      labels: {
        fontSize: 16, 
      }
    },
    tooltips: {
      mode: 'index'
    }
  });
}

async function addUVIndexInfo(responseData) {
  let uvIndex = responseData.forecast.forecastday[0].day.uv;
  const pointerObj = Array.from(document.querySelectorAll('.pointer'));

  pointerObj.forEach(obj => {
    switch (uvIndex) {
      case 1:
        obj.style.left = '0px';
        break;
      case 2:
        obj.style.left = '12px';
        break;
      case 3:
        obj.style.left = '28px';
        break;
      case 4:
        obj.style.left = '45px';
        break;
      case 5:
        obj.style.left = '70px';
        break;
      case 6:
        obj.style.left = '100px';
        break;
      case 7:
        obj.style.left = '130px';
        break;
      case 8:
        obj.style.left = '160px';
        break;
      case 9:
        obj.style.left = '190px';
        break;
      case 10:
        obj.style.left = '250px';
        break;
    }
  })

  let uvSlider = document.getElementById('uv-slider');

  while (uvSlider.querySelector('p.animate__animated')) {
    let animatedParagraphs = Array.from(uvSlider.querySelectorAll('p.animate__animated'));

    animatedParagraphs.forEach(paragraph => {
      paragraph.remove();
    });
  }

  let uvText = document.createElement('p');
  uvText.textContent = "The data shows that the uv index is: " + uvIndex;
  uvText.classList.add('animate__animated');
  uvText.classList.add('animate__heartBeat');
  uvText.setAttribute('id', 'reflection');
  uvSlider.appendChild(uvText);
}

function addAstroInformation(data) {
  // Update the moon information
  let moonContainer = document.getElementById('moon-list');
  for (let i = 0; i < moonContainer.children.length; i++) {
    let currentChild = moonContainer.children[i];

    if (i === 0) {
      currentChild.textContent += data.moon_illumination;
    } else if (i === 1) {
      currentChild.textContent += data.moonset;
    } else if (i === 2) {
      currentChild.textContent += data.moonrise;
    } else if (i === 3) {
      currentChild.textContent += data.moon_phase;
    } else {
      currentChild.textContent += "undefined";
    }
  }

  // Update the sun information
  let sunContainer = document.getElementById('sun-list');
  for (let i = 0; i < sunContainer.children.length; i++) {
    let currentChild = sunContainer.children[i];

    if (i === 0) {
      currentChild.textContent += data.sunset;
    } else if (i === 1) {
      currentChild.textContent += data.sunrise;
    } else {
      currentChild.textContent += "undefined";
    }
  }

  let moonImg = document.getElementById('phase');

  let moonPhases = {
    "Waxing Crescent" : "./images/Moon phases/waxing-crescent-moon.jpg",
    "First Quarter": "./images/Moon phases/First-quarter.jpg",
    "Waxing Gibbous": "./images/Moon phases/Waxing-Gibbous.jpg",
    "Full": "./images/Moon phases/full-moon.jpg",
    "Waning Gibbous": "./images/Moon phases/Waning-Gibbous.jpg",
    "Last Quarter": "./images/Moon phases/third-quarter-moon.jpg",
    "Waning Crescent": "./images/Moon phases/Waning-Crescent.jpg",
    "New Moon": "./images/Moon phases/New-Moon.jpg"
  };

  for (const [key, val] of Object.entries(moonPhases)) {
    if(key === data.moon_phase){
        moonImg.src = val;
    }
  }
}

function updateChancesInformation(chancesData) {
  let ulListContainer = document.getElementById('chances-list');
  for(let j = 0; j < ulListContainer.children.length; j++){
    let currentChild = ulListContainer.children[j];

    if(j === 0){
      if(chancesData.daily_will_it_rain){
        currentChild.textContent += "yes" + '\n' + 'with ' + chancesData.
        daily_chance_of_rain + '%' + " chance of rain";
      }else{
        currentChild.textContent += "no";
      }
    }else if(j === 1){
      if(chancesData.daily_will_it_snow){
        currentChild.textContent += "yes" + '\n' + "with " + chancesData.
        daily_chance_of_snow + '%' + " chance of snow";
      }else{
        currentChild.textContent += "no"
      }
    }
  }
}