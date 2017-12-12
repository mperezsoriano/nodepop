'use strict'

const mongoose = require('mongoose')

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: {type: Boolean, index: true},
  precio: {type: Number, min: 0, max: 100000, masindex: true},
  foto: String,
  tags: {type: [String], index: true}

},{
  collection: 'anuncios'
});

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;