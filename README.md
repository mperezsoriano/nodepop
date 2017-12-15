# NODEPOP API Server

Es un proyecto de API SERVER para la gestion de anuncios, que se pueden consultar por medio peticiones siempre y cuando el usuario este registrado.

# Documentacion

## Peticion de anuncios

```http
http://servidor/anuncios/?venta=[true/false]...
```
## Lista de parametros de la llamada

### Nos devuelve la lista de los anuncios en formato JSON que han sido requeridos.

Nombre | Valor / Iniciado | Tipo | Definicion
--- | :---: | :---: | ---
venta | [true / false] / true | String | Indica venta o compra
tags | [work, lifestyle, motor, mobile] | Boolen | Tag de definicion del producto
nombre | - | String | Deficnion del producto
precio | [min]-[max] | String | Rango de busqueda por precio
start | / `0`| Number | Campos que se excluyen del inicio de la lista
limit | [1 a 100] / `1`| Number | Limite de anuncios devueltos en una peticion
organize | [precio, nombre, venta] | String | Campo para ordenacion de los resultados
token | [opcional] | token | Campo token para validacion 

## Token

El `TOKEN` hay que mandarlo en todas las peticiones, ya que solo se sirven anuncios que sean requeridos con autentificacion, el token puede ir en  la **head** o en el **body** o en el **query**

Localizacion | Nombre | Aconsejable
:---: | :---: | :---:
Head | x-acccess-token | SI
query | token | NO
body | token | NO
### Script
 >* `npm start` : Arranca el servicio de la aplicacion
 >* `npm test` : Arranca el reset de la base de datos y la creaccion de usuarios y clientes para test.
****
## Configuracion
### Conexion
Tenemos que tener iniciada la base de datos `MongoDB` para poder realizar la conexion. Las variables de entorno que se encuentran en el fichero `.env` tiene que ser modificadas para dar la ruta correcta.
### Produccion
>`No` subir a produccion la carpeta `initdb` que es utilizada para iniciar la base de datos para test
>Modificar los parametros necesarios en `.env` para el corecto funcionamiento de la misma


Reset de la base de datos 

libreria para hash. hash.js

empleamos el sha256 en hexadecimal

console.log(shajs('sha256').update('manuel').digest('hex'))

Los password de los usuarios para test son:

usuario: manuel
password: manuel1234

usuario: giulia
password: giulia1234