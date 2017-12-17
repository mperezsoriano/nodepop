'use strict'

const express = require('express')
  ,router = express.Router()
  ,tags_valid = require ('../../data/variables/tags.json');

/**
 * GET nos devuelve los tags validos para los anuncios
 */
router.get('/', (req, res, next) => {
  res.status(200).send({staus: "ok", tags: tags_valid.tags})

})

module.exports = router;