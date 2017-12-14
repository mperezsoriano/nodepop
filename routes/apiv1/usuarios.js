'use strict'

var express = require('express')
  , router = express.Router()
  , joi = require('joi')
  , validateUser = require('../../lib/validate-usuarios')
  , Usuario = require('../../models/Usuario');

/* GET home page. */
router.post('/', function(req, res, next) {
  const datosQuery = req.body
  const validation = joi.validate(datosQuery, validateUser);
  if (validation.error) {
    console.log (validation)
    console.log (validation.error.message)
    res.json( {result: validation.error.message} )
  } else {
    next()
    //res.render('index', { title: 'Autentificacion de usuarios' });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const filters = req.body;
    const row = await Usuario.list(filters);
    res.json({succes: true, reult: row});
  } catch (err) {
    next (err);
  }
});

module.exports = router;
