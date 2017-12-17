# NODEPOP API Server
Es un proyecto de API SERVER para la gestión de anuncios registrados en la base de datos *MongoDb*, para su consulta por medio de peticiones siempre y cuando el usuario este registrado.

* Documentación
  * Peticiones validas
    * Petición de información
    * Petición de tags
    * Petición de anuncios
      * Lista de parámetros de la llamada
      * TOKEN
    * Petición de registro
      * Lista de parámetros de la llamada
    * Petición de autentificación
* Inicialización
  * Modos de arranque
* Configuración
  * Conexión
  * Producción
* Test

# Documentación
## Peticiones validas
```http
(GET) http://localhost/
(GET) http://localhost/apiv1/tags 
(POST) http://localhost/apiv1/anuncios/?...
(POST) http://localhost/apiv1/usuarios/registración
(POST) http://localhost/apiv1/anuncios/autenticación
```
### Petición de información

```http
http://localhost/
```
Nos devuelve infamación del titulo de proyecto y el autor.

### Petición de tags

```http
http://localhost/apiv1/tags
```

Nos devuelva los tags que son validos los anuncios, estos se encuentran en un archivo *JSON* dentro del directorio ./data/variables

### Petición de anuncios

```http
http://localhost/anuncios/?venta=[true/false]...
```

Nos devuelve una lista de anuncios en función de los parámetros de búsqueda incluidos.

#### Lista de parámetros de la llamada

Nombre | Valor / Iniciado | Tipo | Definición
--- | :---: | :---: | ---
venta | [true / false] / true | String | Indica venta o compra
tags | [work, lifestyle, motor, mobile] | Boolen | Tag de definición del producto
nombre | - | String | Deficnion del producto
precio | [min]-[max] | String | Rango de búsqueda por precio
start | / `0`| Number | Campos que se excluyen del inicio de la lista
limit | [1 a 100] / `1`| Number | Limite de anuncios devueltos en una petición
organize | [precio, nombre, venta] | String | Campo para ordenación de los resultados
token | [opcional] | token | Campo token para validación

#### Token

El `TOKEN` hay que mandarlo en todas las peticiones, ya que solo se sirven anuncios que sean requeridos con autentificación, el token puede ir en  la **head** o en el **body** o en el **query**

Localización | Nombre | Aconsejable
:---: | :---: | :---:
Head | x-acccess-token | SI
query | token | NO
body | token | NO

## Petición de registro
```http
http://localhost/apiv1/usuarios/registration
```

Es una llamada *POST*. Registra un usuario en la base de datos ( caso de que el email no esta ya registrado)

### Lista de parámetros de la llamada

Nombre | Tipo | Definición
---  | :---: | ---
nombre | String | Nombre para el registro entre 2 y 25 caracteres
email | String | Tiene que ser un email valido y no estar en uso
password | String | Un pasword entre 5 y 20 caracteres

## Petición de autentificación

```http
http://localhost/apiv1/anuncios/autenticación
```
Es una llamada *POST*. Nos devuelve un `TOKEN` en caso que el los datos para el acceso sean correctos

Nombre | Tipo | Definición
---  | :---: | ---
email | String | Tiene que ser un email valido
password | String | Un pasword entre 5 y 20 caracteres

****

# Inicialización

## Modos de arranque
 >* `npm start` : Arranca el servicio de la aplicación
 >* `npm test` : Arranca el reset de la base de datos y la creación de usuarios y clientes para test.

En caso de querer que queramos tener procesos adinionales a los del master, con un numero de instancias igual al de cores de nuestra maquina, tendremos que poner la variable de `CLUSTER` que se encuentra en `.env` a `true``

# Configuración

## Conexión
Tenemos que tener iniciada la base de datos `MongoDB` para poder realizar la conexión. Las variables de entorno que se encuentran en el fichero `.env` tiene que ser modificadas para dar la ruta correcta.

## Producción
>`No` subir a producción la carpeta `initdb` que es utilizada para iniciar la base de datos para test

>Modificar los parámetros necesarios en `.env` para el correcto funcionamiento de la misma

Variable | Valor defecto | Definición
--- | :---: | ---
CLUSTER | false | Determina si se ejecuta una o mas instancias del proceso
PATHDB | mongodb://localhost/ | Ruta de la base de datos MongoDb
NAMEDB | nodepopDB | Nombre de la base de datos
JWT_SECRET | keysecret | Llave secreta para en hash
JWT_EXPIRES_IN | 2d | Tiempo de validez del TOKEN

# Test

Para realizar el test podemos realizar los siguientes pasos.

* Ejecutamos `npm test` para borrar si existe o crear en caso necesario la base de datos y los anuncios y usuarios para el test.
* Ejecutamos `npm start`para ejecutar la apliacion.
* Hacemos una llamada POST `http://localhost/apiv1/anuncios/authentication` con los siguientes datos para tener un usuario registrado valido `nombre: manuel, 
password: manuel1234` o `nombre: giulia, password: giulia1234`
* nos devolverá un `TOKEN` que copiaremos para realizar la siguiente llamada.
* Hacemos una llamada GET `http://localhost/apiv1/anuncios/?venta=true` con el TOKEN en el head `x-acccess-token: (TOKEN que hemos obtenido)`