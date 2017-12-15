'use strict'

/**
 * conectamos a la base de datos de mongodb a traves
 * de mongoose segun las variables de entorno
 */
const mongoose = require ('mongoose')
  ,errorLang = require('../lib/language-error')
  ,conn = mongoose.connection;

//empleamos las variables de entorno para la ruta de la base de datos
const path = process.env.PATHDB+process.env.NAMEDB

mongoose.Promise = global.Promise;

conn.on('error', (err) => {
  errorLang.translate
  //console.error('La conexion a mongodb no se pudo realizar ', err);
  console.error( errorLang.translate("es", "mongoose_connections") );
  process.exit(1);
})

conn.once('open', () => {
  console.log(`Connect to the date base ${mongoose.connection.name} MongoDb`);
})

mongoose.connect(path, {useMongoClient: true});

module.exports = conn;