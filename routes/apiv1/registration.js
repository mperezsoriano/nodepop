'use strict'

var express = require('express')
  ,router = express.Router()
  ,joi = require('joi')
  ,validateUser = require('../../lib/validate-usuarios')
  ,Usuario = require('../../models/Usuario')
  ,jwt = require('jsonwebtoken')
  ,hash = require('hash.js')
  ,errorLang = require('../../lib/language-error');

/**
 * POST valida que los campos de nombre, email y password introducidos
 * sean correctos en cuanto a su estructura
 */
router.post('/', (req, res, next) => {
  const datosQuery = req.body
  const validation = joi.validate(datosQuery, validateUser);
  if (validation.error) {
    next(errorLang.newError(req, validation.error.message));
    return
  } else {
    next()
  }
});

/**
 * POST Busca el email en la base de datos en caso de que exista devuelve 
 * un error ya que no se puede registrar de nuevo y encaso de no existir
 * hace un hash del password y crea el usuario en la base de datos
 */
router.post('/', async (req, res, next) => {
  try {
    const dates = req.body;
    const sha256 = hash.sha256().update(dates.password).digest('hex');
    const row = await Usuario.listByEmail(dates);
    if (row != "") {
      throw (err)
      return
    }
    dates.password = sha256
    const user = new Usuario (dates)
    user.save((err, newUser) => {
      if (err) {
        next(errorLang.newError(req, 'internal_error'));
        return;
      }
      res.status(200).json({_id: newUser._id, nombre: newUser.nombre, email:newUser.email})
    })
  } catch (err) {
    if (err.ReferenceError == undefined) next(errorLang.newError(req, 'exit_user'));
    next(errorLang.newError(req, 'internal_error'));
  }
});

module.exports = router;
