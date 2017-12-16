'use strict'

const mongoose = require('mongoose')
  , utils = require('../lib/utils')

/**
 * Esquema de mongoose para el Anuncio
 * nombre (String)
 * venta (Boolean)
 * nombre (Number)
 * foto (string)
 * tags (Array string)
 */
const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: {type: Boolean, index: true},
  precio: {type: Number, min: 0, max: 100000, index: true},
  foto: String,
  tags: {type: [String], index: true}
},{
  collection: 'anuncios'
});

/**
 * Funcion estatica list, que nos devuelve un elemento si coincide 
 * con las condiciones establecidas
 */

anuncioSchema.statics.list = function(filter) {
  const query = Anuncio.find({})

  if (filter.tag) { query.where('tags', filter.tag) };
  if (filter.venta) { query.where('venta', filter.venta) };
  if (filter.nombre) {  query.where('nombre', filter.nombre) };
  if (filter.precio) {
    const precios = utils.breakPrice (filter.precio);
    query.where('precio').gte(precios[0]);
    query.where('precio').lte(precios[1]);
  }
  if (filter.organize) { query.sort(filter.organize) };
  if (!filter.start) { filter.start = 0 };
  if (!filter.limit) { filter.limit = 100 };
  query.skip((filter.start).toInt);
  query.limit((filter.limit).toInt);
  
  return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;