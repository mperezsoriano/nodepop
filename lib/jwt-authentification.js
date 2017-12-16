'use strict'

const jwt = require('jsonwebtoken')
  ,errorLang = require('../lib/language-error');

/**
 * Comprueba la existencia de TOKEN y si existe si es valido, en caso contrario
 * devuelve el error corrspondiente
 */
module.exports = () => {
  return (req, res, next) => {
    const token = req.body.token || req.query.token || req.get('x-access-token');
    if (!token) {
      next(errorLang.newError(req, "no_token"));
      return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next(errorLang.newError(req, "invalid_token"));
        return;
      }
      next ();
    })
  }
}