const express = require('express');
const router = express.Router();
const pitchingModel = require('../models/pitching.model')

router.get('/all', (req, res) => pitchingModel.allPitching(req,res))

router.get('/:id', (req,res) => pitchingModel.teamPitching(req,res))

module.exports = router
