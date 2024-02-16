const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
    res.send("Hello text")
    console.log("Hello there I am here!")
})

module.exports = router;