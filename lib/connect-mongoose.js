'use strict'

/**
 * conectamos a la base de datos de mongodb a traves
 * de mongoose 
 */
const mongoose = require ('mongoose');
const conn = mongoose.connection;

mongoose.Promise = global.Promise;

conn.on('error', (err) => {
  console.error('La conexion a mongodb no se pudo realizar ', err);
  process.exit(1);
})

conn.once('open', () => {
  console.log(`Conectado a la base de datos ${mongoose.connection.name} por MongoDb mediante Mongoose `);
})

mongoose.connect('mongodb://localhost/nodepopDB', {useMongoClient: true});

module.exports = conn;