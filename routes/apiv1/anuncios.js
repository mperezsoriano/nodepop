'use strict'

//expresion regular para el precio /^\d*-?\d*$/i
//cualquier numero/s opcional, despues un guion opcional y numero/s opcional

const express = require('express')
  , router = express.Router()
  , joi = require('joi')
  , schema = require('../../lib/validate-anuncios')
  , composition = require('../../lib/find-anuncios')
  , Anuncio = require('../../models/Anuncio');

/**
 * mildware para la validacion de los datos de entrada de busqueda de los
 * anuncios.
 */
router.get('/', async function(req, res, next) {
  const datosQuery = req.query
  try{
    const value = await joi.validate(datosQuery, schema);
    next ();
  } catch (err) {
    next (err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const filters = req.query;
    const row = await Anuncio.list(filters);
    res.json({succes: true, reult: row});
  } catch (err) {
    next (err);
  }
});

module.exports = router;