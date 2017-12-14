# inicialization-db

Modulo iniciacion para test de la API **nodepop**

## Instalation

Modulo [Node.js](https://nodejs.org/en/) que se usa empleando el intalador **npm**.

```js
  $ npm intall ../install-db
```

## API

### require ()

```js
  var installdb = require ('install-db')
```

### resetDB ()

Si existe *borra* la base de datos **nodepop** y a continuacion la crea añadiendo dos colecciones ('usuarios' y 'anuncios').

Posteriormente añade las entradas especificadas en los archivos **json** para que se puedan realizar los test.

```js
  installdb.resetDB([nombre base de datos])
```

## Utilización

Quita el comentario a las lineas del archivo **app.js** que siguen a continuacion.

Posteriormente el programa terminara, vuelve a comentarlas para utilizar la aplicacion.

```js
  var installdb = require ('install-db')
  installdb.resetDB()
  process.exit(1)
```