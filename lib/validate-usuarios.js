'use strict'

const joi = require('joi')

module.exports = joi.object().keys ({
  nombre: joi.string()
    .min(4)
    .max(25)
    .error(new Error ('Error en nombre'))
    .required(),
  email: joi.string()
    .email()
    .error(new Error ('Error en email'))
    .optional(),
  //password: joi.string().alphanum().min(5).max(20).label('Error en password').required()
  password: joi.string()
    .alphanum()
    .min(5)
    .max(20)
    .error(new Error ('Error en password'))
    .required()
});