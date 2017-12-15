'use strict'

/**
 * modulo para generacion de errores, que tengan en cuenta el idioma proporcionado
 * por lacabecera, se have uso de un fichero json donde estan los idiomas soportados
 * asi cmom los errores con sus traducciones y el estado de error que producen
 */
const error = require ('../public/messages/errors.json')
  ,accepts = require('accepts');

//crea un error, asi como las propiedades de estado y errorLang que se utiliza
//para determinar que es un tipo de error propio de la API y no del sistema
let newError = ((req, typeError) => {
  const lang = accepts(req).languages()[1]
    ,textError = translate(lang, typeError)
    ,statusError = status(lang, typeError)
    ,err = new Error(textError);

  err.statusLang = statusError;
  err.errorLang = true;

  return err;
});

let ckekParameters = ((language, typeError) => {
  var checkLang = error.lang.indexOf(language);
  var checkError = error.type.indexOf(typeError);

  checkLang = ((checkLang == -1) ? 0 : checkLang);
  checkError = ((checkError == -1) ? 0 : checkError);

  var textError = error.errors[checkError][checkLang];
  var statusError = error.status[checkError];
  
  return [textError, statusError];
})

//develve el codigo de estado de error asignado al mismo
let status = ((language, typeError) => {
  return ckekParameters (language, typeError)[1];
})

//devuelve el texto del error en el idioma solicitado
let translate = ((language, typeError) => {
  return ckekParameters (language, typeError)[0];
})

module.exports = {
  newError,
  translate
}
