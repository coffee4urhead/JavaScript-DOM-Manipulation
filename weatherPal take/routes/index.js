const express = require('express');
const router = express.Router();

router.post('/index', (req, res) => {
    res.send("Hello index")
    console.log("Hello there I am here!In the index though")
})

module.exports = router;