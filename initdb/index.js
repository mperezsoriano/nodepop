'use strict'

/**
 * Inicializa la bade de datos de mongoDB que esta instalada en
 * la constante PATHDB mas el nombre de la base de datos de NAMEDB 
 * que esta definida en el .env de la carpeta
 */

const mongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const anuncios = require ('./data/anuncios.json');
const usuarios = require ('./data/usuarios.json');

function deleteAndCreateCollection (nameCollection, file, db) {
    let selectCollection = db.collection (nameCollection);
    selectCollection.remove();
    file.forEach(element => {
        selectCollection.insert(element);
    });
}

/**
 * RESET a la base de datos nodepop
 * y creaccion de las colecciones usuarios y anuncios
 * con los registros necesarios para su test
 */

function resetDB (newNameDB) {
    const n = (newNameDB == null ? process.env.NAMEDB : newNameDB);
    const path = process.env.PATHDB + n;

    mongoClient.connect(path, (err, db) => {
        if (err) {
            console.log ('It is not possible to connect the database');
            process.exit(1);
        }
        // reseamos la collecion de usuarios e introducimos los datos de ads.js
        deleteAndCreateCollection('usuarios', usuarios, db);
        // reseteamos la coleccion de anuncios e introducimos los datos de users.js
        deleteAndCreateCollection('anuncios', anuncios, db);
        
        db.close();
    })
}

//module.exports.resetDB = resetDB;
resetDB();