'use strict'

//expresion regular para el precio /^\d*-?\d*$/i
//cualquier numero/s opcional, despues un guion opcional y numero/s opcional

const express = require('express')
  , router = express.Router()
  , joi = require('joi')
  , schema = require('../../lib/validate-anuncios')
  , composition = require('../../lib/find-anuncios');

/**
 * mildware para la validacion de los datos de entrada de busqueda de los
 * anuncios.
 */
router.get('/', function(req, res, next) {
  const datosQuery = req.query
  joi.validate(datosQuery, schema, (err, value) => {
    if (err) { throw(err) }
    else {
      //pasamos el req para que nos devuelva una cadena de busqueda em req.find
      composition(req)
      next();
    }
  })
});

router.get('/', function(req, res, next) {
  console.log (req.query)
  console.log (req.find)
  res.render('index', { title: 'Express' });
});

module.exports = router;