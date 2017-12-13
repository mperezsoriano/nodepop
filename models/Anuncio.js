'use strict'

const mongoose = require('mongoose')

function comparar ( a, b ){ return a - b; }

function breakPrice(precio) {
  var prices = [0, 0];
  const mark = precio.search("-")
  const priceMin = precio.substring(0, mark);
  const priceMax = precio.substring(mark+1, precio.length);
  if (priceMin) { prices[0] = priceMin };
  if (priceMax) { prices[1] = priceMax };
  if (mark == -1) { prices[0] = priceMax };
  if (mark == (precio.length)-1) { prices[1] = 100000 };
  return prices.sort(comparar)
}

const anuncioSchema = mongoose.Schema({
  nombre: String,
  venta: {type: Boolean, index: true},
  precio: {type: Number, min: 0, max: 100000, masindex: true},
  foto: String,
  tags: {type: [String], index: true}

},{
  collection: 'anuncios'
});

anuncioSchema.statics.list = function(filter) {
  console.log(filter)
  const query = Anuncio.find({})
  if (filter.tag) { query.where('tags', filter.tag) };
  if (filter.venta) { query.where('venta', filter.venta) };
  if (filter.precio) {
    const precios = breakPrice (filter.precio);
    query.where('precio').gte(precios[0]);
    query.where('precio').lte(precios[1]);
  }
  if (filter.organize) { query.sort(filter.organize) };
  if (!filter.start) { filter.start = 0 };
  if (!filter.limit) { filter.limit = 100 };
  query.skip((filter.start).toInt)
  query.limit((filter.limit).toInt)
  return query.exec();
}

const Anuncio = mongoose.model('Anuncio', anuncioSchema);

module.exports = Anuncio;