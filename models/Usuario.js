'use strict'

const mongoose = require('mongoose')
  , hash = require('hash.js')

const usuarioSchema = mongoose.Schema({
  nombre: String, 
  email: String,
  clave: { type: String, index: true }
},{
  collection: 'usuarios'
});

usuarioSchema.statics.list = function(filter) {
  const sha256 = hash.sha256().update(filter.password).digest('hex');
  const query = Usuario.find({})
    query.where('nombre', filter.nombre);
    query.where('password', sha256);
  return query.exec();
}

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;