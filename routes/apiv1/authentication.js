'use strict'

var express = require('express')
  ,router = express.Router()
  ,joi = require('joi')
  ,validateUser = require('../../lib/validate-usuarios')
  ,Usuario = require('../../models/Usuario')
  ,jwt = require('jsonwebtoken')
  ,errorLang = require('../../lib/language-error');

/**
 * POST valida que los campos de email y password introducidos
 * sean correctos en cuanto a su estructura
 */
router.post('/', (req, res, next) => {
  const datosQuery = req.body;
  const validation = joi.validate(datosQuery, validateUser);
  if (validation.error) {
    next(errorLang.newError(req, validation.error.message));
    return;
  } else {
    next();
  }
});

/**
 * POST comprobamos que el email y password este registrado en la base de
 * datos y en caso afirmativo nos devuelve un token y en caso contrario
 * un error de autentificacion
 */
router.post('/', async (req, res, next) => {
  try {
    const filters = req.body;
    const row = await Usuario.list(filters);
    const id = JSON.stringify(row[0]._id);
    const obJwt = {user_id: id};
    
    jwt.sign({ user_id: obJwt}, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
    }, (err, token) => {
      res.status(200).json({succes: true, result: token});
    })
  } catch (err) {
    next(errorLang.newError(req, 'autenticacion_fail'));
  }
});

module.exports = router;
