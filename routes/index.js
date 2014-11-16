var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	console.log('index.js >> routing.');
	
	res.sendFile('/public/index.html');
});

module.exports = router;