var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('instruments.js >> routing.');

	res.json({ foo : 'bar'});
});

module.exports = router;