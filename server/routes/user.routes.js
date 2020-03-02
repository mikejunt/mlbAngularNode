const express = require('express');
const router = express.Router();
const userlist = [
    { userid: 1, username: "Mike", password: "password", favteam: "119" },
    { userid: 2, username: "Sarah", password: "password", favteam: "134" },
    { userid: 3, username: "Justin", password: "password", favteam: "137" }
]

router.get('/login', (req,res,next) => {
    console.log(req.body)
    res.send(userlist)
})


module.exports = router