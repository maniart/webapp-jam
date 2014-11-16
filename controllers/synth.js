var express = require('express');
var data = require('../data/synth.json');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('synth.js >> routing.');
	res.json(data);
});

module.exports = router;