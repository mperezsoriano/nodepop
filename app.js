const express = require('express')
  ,path = require('path')
  ,favicon = require('serve-favicon')
  ,logger = require('morgan')
  ,cookieParser = require('cookie-parser')
  ,bodyParser = require('body-parser')
  ,errorLang = require('./lib/language-error')
  
var app = express();

/**
 * carga de la libreria mongoose para el acceso a la base de 
 * datos mongodb
 */
require('./lib/connect-mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Rutas validas 
 * '/'                      GET No devuelve un html de información
 * '/apiv1/anuncios/        GET nos devuelve una lista de los anuncios seleccionados
 * '/apiv1/login/           POST nos devuelve un TOKEN en caso de existeir usuario y contraseña
 * '/apiv1/authenticacion/  POST crea un usuario si el email no esta ocupado
 */
app.use('/', require('./routes/index'));
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios/registration', require('./routes/apiv1/registration'));
app.use('/apiv1/usuarios/authentication', require('./routes/apiv1/authentication'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(errorLang.newError(req, "not_found"));
});

/**
 * Verifica si el error probiene del sistema express o es generado por la API
 * y en este caso determina el lenguaje del sistema y devuelve en error en 
 * funcion al mismo
 */
app.use(function(err, req, res, next) {
  if (err.errorLang){
    res.status(err.statusLang).send({status: 'error', message: err.message})
  } else  {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  }
});

module.exports = app;
