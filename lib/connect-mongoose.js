'use strict'

/**
 * conectamos a la base de datos de mongodb a traves
 * de mongoose segun las variables de entorno
 */
const mongoose = require ('mongoose');
const conn = mongoose.connection;

//empleamos las variables de entorno para la ruta de la base de datos
const path = process.env.PATHDB+process.env.NAMEDB

mongoose.Promise = global.Promise;

conn.on('error', (err) => {
  console.error('La conexion a mongodb no se pudo realizar ', err);
  process.exit(1);
})

conn.once('open', () => {
  console.log(`Conectado a la base de datos ${mongoose.connection.name} por MongoDb mediante Mongoose `);
})

mongoose.connect(path, {useMongoClient: true});

module.exports = conn;