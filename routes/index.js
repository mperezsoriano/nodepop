var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Practica JS/Node.js/mongoDB/DevOps' });
});

module.exports = router;
