'use strict'

const jwt = require('jsonwebtoken')
  ,errorLang = require('../lib/language-error');

module.exports = () => {
  return (req, res, next) => {
    const token = req.body.token || req.query.token || req.get('x-acccess-token')

    if (!token) {
      next(errorLang.newError(req, "no_token"))
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {

        next(errorLang.newError(req, "invalid_token"))
        return;
      }
      //req.userId = decoded.user_id
      next ();
    })
  }
}