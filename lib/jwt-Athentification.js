'use strict'

const jwt = require('jsonwebtoken');

module.exports = () => {
  return (req, res, next) => {
    const token = req.body.token || req.query.token || req.get('x-acccess-token')

    if (!token) {
      const err = new Error('No token provided');
      err.status = 401;
      next (err);
      return;
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        next(new Error('Invalid token'))
        err.status = 401;
        return;
      }
      //req.userId = decoded.user_id
      next ();
    })
  }
}