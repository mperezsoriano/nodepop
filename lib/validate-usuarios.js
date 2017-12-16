'use strict'

const joi = require('joi')

/**
 * Validacion de los campos del Usuario
 * [nombre], email y password
 */
module.exports = joi.object().keys ({
  nombre: joi.string()
    .min(2)
    .max(25)
    .error(new Error ('name_error'))
    .optional(),
  email: joi.string()
    .email()
    .error(new Error ('email_error'))
    .required(),
  password: joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .error(new Error ('password_error'))
    .required()
});