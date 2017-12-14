'use strict'

const joi = require('joi')

module.exports = joi.object().keys ({
  tag: joi.any()
    .valid('work', 'lifestyle', 'motor', 'mobile')
    .error(new Error ('Error en tag'))
    .optional(),
  venta: joi.boolean()
    .optional(),//required(),
  nombre: joi.string()
    .alphanum()
    .error(new Error ('Error en nombre'))
    .optional(),
  precio: joi.string().
    regex(/^\d*-?\d*$/i)
    .error(new Error ('Error en precio'))
    .optional(),
  start: joi.number()
    .default(0)
    .min(0)
    .max(100000)
    .error(new Error ('Error en start'))
    .optional(),
  limit: joi.number()
    .default(1)
    .min(1)
    .max(100)
    .error(new Error ('Error en limit'))
    .optional(),
  organize: joi.any()
    .valid('precio', 'nombre', 'venta')
    .default('precio')
    .error(new Error ('Error en organize'))
    .optional(),
  token: joi.string()
    .token()
    .optional()
});