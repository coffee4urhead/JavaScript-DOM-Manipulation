let express = require('express');
let app = express();

app.use(express.static('/weatherApp'));

app.listen(3000, () => {
    console.log("App listening at port 3000");
})