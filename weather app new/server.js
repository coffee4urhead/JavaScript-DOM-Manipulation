let express = require('express');
let app = express();

app.use(express.json());
app.use(express.static('weatherApp'));

app.get('/apiResp/:city', async (req, res) => {
    let url = "https://api.openweathermap.org/data/2.5/weather?q=";
    let city = req.params.city;
    let apiKey = "dce6dc38844a3cca159d69eee2f287c9";
    let metricSystemApplied = "&units=metric";
    let response = await fetch(url + city + `&appid=${apiKey}` + metricSystemApplied);
    let data = await response.json();
    res.json(data);
})

app.listen(3000, () => {
    console.log("App listening at port 3000");
})