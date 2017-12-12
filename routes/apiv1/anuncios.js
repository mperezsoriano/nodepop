'use strict'

//expresion regular para el precio /^\d*-?\d*$/i
//cualquier numero/s opcional, despues un guion opcional y numero/s opcional

const express = require('express')
  , router = express.Router()
  , joi = require('joi')
  , composition = require('../../lib/composition-find');

const schema = joi.object().keys ({
  tag: joi.any().valid('work', 'lifestyle', 'motor', 'mobile').optional(),
  venta: joi.boolean().required(),
  nombre: joi.string().alphanum().optional(),
  precio: joi.string().regex(/^\d*-?\d*$/i).optional(),
  start: joi.number().default(0).min(0).max(100000).optional(),
  limit: joi.number().default(1).min(1).max(100).optional(),
  sort: joi.any().valid('precio', 'nombre', 'venta').default('precio').optional(),
  token: joi.string().token()
});

/* GET home page. */
router.get('/', function(req, res, next) {
  const datosQuery = req.query
  joi.validate(datosQuery, schema, (err, value) => {
    if (err) {
      throw(err)
    } else {
      const parametresFind = composition(value)
      next();
    }
  })
});

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;