const express = require('express');
const app = express();

app.use(express.static('views'));
app.use(express.json({ limit: "2mb" }));

app.get('/', (req, res) => {
    res.send("Hello mfs");
});

const apiRouter = require('./routes/api');
app.use('/api', apiRouter);

const indexRouter = require('./routes/index');
app.use('/index', indexRouter);

app.listen(3000, () => {
    console.log("Currently listening on port 3000!");
    console.log("wow it started somehow!");
});
