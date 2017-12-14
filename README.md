libreria para hash. hash.js

empleamos el sha256 en hexadecimal

console.log(shajs('sha256').update('manuel').digest('hex'))

Los password de los usuarios para test son:

usuario: manuel
password: manuel1234

usuario: giulia
password: giulia1234

no subir a produccion la carpeta initdb que es utilizada para iniciar la base de datos para test

