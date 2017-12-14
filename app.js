const express = require('express')
  ,path = require('path')
  ,favicon = require('serve-favicon')
  ,logger = require('morgan')
  ,cookieParser = require('cookie-parser')
  ,bodyParser = require('body-parser')
  ,messageError = require('./lib/error-menssages')
  ,accepts = require('accepts');


var app = express();

//cargamos el conector a mongoose
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

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));
app.use('/apiv1/usuarios', require('./routes/apiv1/usuarios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  if (err.isJoi) {
    const typeError = err.details[0].context.label
    const lang = accepts(req).languages()[1]
    const error = messageError (typeError, lang)
    res.status(500).send(error)
  } else  {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
  }
});

module.exports = app;
