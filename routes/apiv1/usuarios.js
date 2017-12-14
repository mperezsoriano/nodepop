'use strict'

var express = require('express')
  , router = express.Router()
  , joi = require('joi')
  , validateUser = require('../../lib/validate-usuarios')
  , Usuario = require('../../models/Usuario')
  , jwt = require('jsonwebtoken');

/* GET home page. */
router.post('/', function(req, res, next) {
  const datosQuery = req.body
  const validation = joi.validate(datosQuery, validateUser);
  if (validation.error) {
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
    const id = JSON.stringify(row[0]._id)
    const obJwt = {user_id: id}
    jwt.sign({ user_id: obJwt}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }, (err, token) => {
      res.json({succes: true, result: token});
    })
  } catch (err) {
    next (err);
  }
});

module.exports = router;
