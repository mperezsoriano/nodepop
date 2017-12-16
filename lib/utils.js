'use strict'

const mongoose = require('mongoose')

function comparar ( a, b ){ return a - b; }

/**
 * Entrada es un campo precio que puede tener la siguiente forma
 * precioMin - precioMax.
 * Nos devuelve una salida con el precio minimo y maximo en una
 * matriz [min, max]
 */
let breakPrice = ((precio) => {
  var prices = [0, 0];
  const mark = precio.search("-");
  const priceMin = precio.substring(0, mark);
  const priceMax = precio.substring(mark+1, precio.length);

  if (priceMin) { prices[0] = priceMin };
  if (priceMax) { prices[1] = priceMax };
  if (mark == -1) { prices[0] = priceMax };
  if (mark == (precio.length)-1) { prices[1] = 100000 };
  
  return prices.sort(comparar);
})

module.exports = {
  breakPrice
}