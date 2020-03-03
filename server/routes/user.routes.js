const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const userlist = [
    { userid: 1, username: "Mike", password: "$2b$10$UGmAN.EPQegTVszZuNW3Ce/xPFmEkkoK0mG.2d.tDs6OrSosgYmy.", favteam: "119" },
    { userid: 2, username: "Sarah", password: "$2b$10$UGmAN.EPQegTVszZuNW3Ce/xPFmEkkoK0mG.2d.tDs6OrSosgYmy.", favteam: "134" },
    { userid: 3, username: "Justin", password: "$2b$10$UGmAN.EPQegTVszZuNW3Ce/xPFmEkkoK0mG.2d.tDs6OrSosgYmy.", favteam: "137" }
]
let nextuserid = 4;

router.post('/login', (req, res, next) => {
    console.log(req.body.params )
    let filteredusers = userlist.filter(obj => obj.username === req.body.username)
    if (filteredusers.length != 1) {
        return res.send({ success: false, msg: "Username or password invalid." })
    }
    bcrypt.compare(req.body.password, filteredusers[0].password, (err, result) => {
        if (err) {
            return res.send({ success: false, msg: "Error @ bcrypt compare" }
            )
        }
        if (!result) {
            return res.send({ success: false, msg: "Username or password invalid." })
        }
        return res.send({ success: true, msg: "", favteam: filteredusers[0].favteam })
    })
})

router.post('/signup', (req, res, next) => {
    let filteredusers = userlist.filter(obj => obj.username === req.body.username)
    if (filteredusers.length === 1) {
        return res.send({ success: false, msg: "Username already in use." })
    }
    bcrypt.hash(req.body.password, 10, (err, result) => {
        if (err) {
            return res.send({ success: false, msg: "bcrypt failed to hash." }
            )
        }
        userlist.push({ userid: nextuserid, username: req.body.username, password: result, favteam: req.body.favteam })
        nextuserid++;
        return res.send({ success: true, msg: "" })
    })
})


module.exports = router