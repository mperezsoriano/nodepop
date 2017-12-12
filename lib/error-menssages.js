'use strict'

var languageMessage = {
  tag: {es: 'Los tag validos son [work, lifestyle, motor, mobile]', en: 'The valid tag are [work, lifestyle, motor, mobile]'},
  venta: {es: 'Tienes que ser true o false', en: 'You have to be true or false'},
}

module.exports =  function translateMessage (type, lang) { 
  return languageMessage[type][lang]
}