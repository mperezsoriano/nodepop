'use strict'

const joi = require('joi')
  ,tags_valid = require ('../data/variables/tags.json')
  ,organizations_valid = require ('../data/variables/organizations.json')
  
/**
 * Validacion de los campos del Anuncio
 * [tag], [venta], [nombre], [precio], [strart], [limit], [organize] y [token]
 */

//expresion regular para el precio /^\d*-?\d*$/i
//cualquier numero/s opcional, despues un guion opcional y numero/s opcional

 module.exports = joi.object().keys ({
  tag: joi.any()
    .valid(tags_valid.tags)
    .error(new Error ('tag_error'))
    .optional(),
  venta: joi.boolean()
    .optional(),
  nombre: joi.string()
    .alphanum()
    .error(new Error ('name_error'))
    .optional(),
  precio: joi.string().
    regex(/^\d*-?\d*$/i)
    .error(new Error ('price_error'))
    .optional(),
  start: joi.number()
    .default(0)
    .min(0)
    .max(100000)
    .error(new Error ('start_error'))
    .optional(),
  limit: joi.number()
    .default(1)
    .min(1)
    .max(100)
    .error(new Error ('limit_error'))
    .optional(),
  organize: joi.any()
    .valid(organizations_valid.organizations)
    .default('precio')
    .error(new Error ('organize_error'))
    .optional(),
  token: joi.string()
    .token()
    .error(new Error ('token_error'))
    .optional()
});