'use strict'

var languageMessage = {
  tag: {es: 'Los tag validos son [work, lifestyle, motor, mobile]', en: 'The valid tag are [work, lifestyle, motor, mobile]'},
  venta: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'},
  nombre: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'},
  precio: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'},
  start: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'},
  limit: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'},
  sort: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'},
  token: {es: 'Venta tiene que ser true o false', en: 'Sale must be true or false'}
}

module.exports = (type, lang) => { 
  return languageMessage[type][lang]
}