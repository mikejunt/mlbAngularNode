const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const { client, pool } = require('../config/db.config')
const userlist = [
    { userid: 1, username: "Mike", password: "$2b$10$UGmAN.EPQegTVszZuNW3Ce/xPFmEkkoK0mG.2d.tDs6OrSosgYmy.", favteam: "119" },
    { userid: 2, username: "Sarah", password: "$2b$10$UGmAN.EPQegTVszZuNW3Ce/xPFmEkkoK0mG.2d.tDs6OrSosgYmy.", favteam: "134" },
    { userid: 3, username: "Justin", password: "$2b$10$UGmAN.EPQegTVszZuNW3Ce/xPFmEkkoK0mG.2d.tDs6OrSosgYmy.", favteam: "137" }
]
let nextuserid = 4;

router.post('/login', (req, res, next) => {
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
        let newuser = { userid: nextuserid, username: req.body.username, password: result, favteam: req.body.favteam }
        let test = [req.body.username, result, req.body.favteam]
        pool.connect((err, client, release) => {
            if (err) {
                return console.log("error getting client", err.stack)
            }
            client.query("INSERT INTO users VALUES (DEFAULT, $1,$2,$3)", test, (err, result, field) => {
                release();
                if (err) {
                    return console.log("error on query", err.stack)
                }
                console.log(result)
            })
        })
            userlist.push(newuser)
            nextuserid++;
            return res.send({ success: true, msg: "" })
        })
    })


    module.exports = router