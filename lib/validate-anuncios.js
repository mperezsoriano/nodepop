'use strict'

const joi = require('joi')

module.exports = joi.object().keys ({
  tag: joi.any().valid('work', 'lifestyle', 'motor', 'mobile').optional(),
  venta: joi.boolean().required(),
  nombre: joi.string().alphanum().optional(),
  precio: joi.string().regex(/^\d*-?\d*$/i).optional(),
  start: joi.number().default(0).min(0).max(100000).optional(),
  limit: joi.number().default(1).min(1).max(100).optional(),
  sort: joi.any().valid('precio', 'nombre', 'venta').default('precio').optional(),
  token: joi.string().token()
});