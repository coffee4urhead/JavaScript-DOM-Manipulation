const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello mfs")
})

app.listen(3000, () => {
    console.log("Currently listening on port 3000!")
    console.log("wow it started somehow!");
})