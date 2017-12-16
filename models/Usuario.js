'use strict'

const mongoose = require('mongoose')
  , hash = require('hash.js')

/**
 * Esquema de mongoose para el Usuario
 * nombre (String)
 * email (string)
 * password (string)
 */
const usuarioSchema = mongoose.Schema({
  nombre: String, 
  email: { type: String, index: true },
  password: { type: String, index: true }
},{
  collection: 'usuarios'
});

/**
 * Funcion estatica list, que nos devuelve un elemento si coincide 
 * con email y password
 */
usuarioSchema.statics.list = function(filter){
  const sha256 = hash.sha256().update(filter.password).digest('hex');
  const query = Usuario.find({})
    query.where('email', filter.email);
    query.where('password', sha256);
  return query.exec();
}

/**
 * Funcion estatica listByEmail, que nos devuelve un elemento si coincide 
 * con email 
 */
usuarioSchema.statics.listByEmail = function(filter){
  const sha256 = hash.sha256().update(filter.password).digest('hex');
  const query = Usuario.find({})
    query.where('email', filter.email);
  return query.exec();
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;