'use strict'

const express = require('express')
  ,router = express.Router()
  ,joi = require('joi')
  ,schema = require('../../lib/validate-anuncios')
  ,Anuncio = require('../../models/Anuncio')
  ,jwtAuth = require('../../lib/jwt-authentification')
  ,errorLang = require('../../lib/language-error');

/**
 * GET comprueva que existe un TOKEN valido en en la peticion el mismo puede
 * estar en el head (x-access-token), en el query (token) o en el body (token)
 */
router.use('/', jwtAuth(), async function(req, res, next) {
  try{
    const datosQuery = req.query
    const value = await joi.validate(datosQuery, schema);
    next ();
  } catch (err) {
    next(errorLang.newError(req, err.message));
  }
});

/**
 * GET devuelve los anuncios en un json que se solicitan aplicando los filtros
 * que nos enviado en la peticion.
 */
router.get('/', async (req, res, next) => {
  try {
    const filters = req.query;
    console.log (filters)
    const row = await Anuncio.list(filters);
    console.log (filters, row)
    res.status(200).json({succes: true, result: row});
  } catch (err) {
    next(errorLang.newError(req, 'not_fount'));
  }
});

module.exports = router;