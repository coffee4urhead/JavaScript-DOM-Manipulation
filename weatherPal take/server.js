require('dotenv').config();
let express = require('express');
let app = express();

app.use(express.json());
app.use(express.static('views'));

// Use dynamic import instead of require
import('node-fetch').then((fetch) => {
    app.get('/apiResp/:city', async (req, res) => {
        let url = "https://api.openweathermap.org/data/2.5/weather?q=";
        let city = req.params.city;
        let apiKey = process.env.API_KEY;
        let metricSystemApplied = "&units=metric";
        let response = await fetch.default(url + city + `&appid=${apiKey}` + metricSystemApplied);
        let data = await response.json();
        res.json(data);

        let secondDataURL = "https://api.weatherapi.com/v1/history.json?key=";
        let key = process.env.SECOND_API;
        let date = new Date();
        let fullURLForFetch = secondDataURL + key + `&q=${city}&dt=${date.toISOString().split("T")[0]}`;
        let resp = await fetch(fullURLForFetch);
        let secondDataResp = await resp.json();
        res.json(secondDataResp);
    });
});

app.listen(3000, () => {
    console.log("App listening at port 3000");
});
