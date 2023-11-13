# Desarrollo Api Rest  

## Alumno
Josue Daniel Garcia Maldonado 

## Parcial1
### Semana 1
#### PeticionesJs
Archivo: apifetch.html  
5 peticiones o maneras para conectarse con una api en javascript
1. api fetch
2. xml http request 
3. axios
4. promesas
5. async await

#### PeticionesParametros
Archivo: peticion.html  
creacion de una pagina web con la api de chuck norris.

### Semana 2
#### ModuloCummonJS
En repositiorio github y npm 
https://www.npmjs.com/settings/jonnyjaccob/packages

#### ModuloESM
Archivo: home.html  
Utilizo un modulo con ECMA sin usar npm, usando un metodo de llamada sincrona y un boton asincrona.
Excelente para solo usar el metodo cuando se necesite y asi ahorrar recursos.  
http://localhost/garciamaApi/Parcial2/ModuloESM/

#### practicaArchivos
Archivo: index.js  
1. Generacion de un archivo de texto con el moodelo Fs usandolo como callback
2. Instalacion del paquete jsPdf para agregarle a la aplicacion la habilidad de la generacion  de pdf
3. Generacion de excel 
rev
#### DemostracionCore
index.js
peticionAsincrona.html
puerto 8080 para uno diferente al xampp que es el 80, comprobar la peticion en el thunder client  
cuidado con los {} y las ;  
poner un header para permitir tener mas de dos peticiones al servidor.
rev


### Semana 3
### ServidorExpress
index.js
Express para crear respuestas de servidor ayudado por thunderclient.
http://localhost:8080/Alumnos/sistemas?control=100182  
### EvitandoCors
#### Parte 1
peticionAExpress.html
Servidor a una pagina web para controlar los get y evitar el error cors con un input (form target) y frame y un paquete de npm cors  

#### ServidorBD 
archivo: index.js
Consulta a base de datos local mysql
#### ServidorBD_MYSQL 
archivo: index.js
Consulta a base de datos local mysql de manera asincrona
#### Parte 2
#### ServidorBD_MYSQL 
archivo: index.js
CRUD altas, bajas, modificaciones y consultas.

### Grid
archivo: Boostrap.html
Instalacion de JQuery desde la carpeta Extra con ruta relativa
Peticion a servidor express con un bootstrap table 

### Eventos y FuncionEventos
archivo: index.js
eventos, funciones con clase extens, imprimir saludo con un retrado de tiempo.

### Servidor_GitHub
archivo: index.js
Bearer-GitHub / Middleware de Autenticacion
Ejercicio de generacion de un Bearer Token en su cuenta de Github
para consultar sus repositorios desde ThunderClient
## Parcial2
### Formulario
archivo: Form.html 
dos maneras de MIME type (content type)  
- application/x-www-form-urlencoded
- multipart/form-data
descargar npm multer  
manejo de formularios  

### Validacion
Archivo: indexValidacion.js
Programa con el modulo express-validator para comprobar que los datos enviados de lado del cliente esten correctos.  

#### Check Squema
Archivo: IndexCheck.js
Igual al anterior pero carga un modulo exportado con la informacion y es procesada por checkSquema.  

### ManejoError
Archivo: index.js y Form.html
Una forma de mandar nuestros propios errores en el servidor de express y evitar que un tercer averigue que paquetes estamos utilizando cuando intente romperlo.  

### ValidacionJoi / JOI
archivo: index.js  
Verificacion de errores con herramienta middleware Joi  

### JsDoc
archivo: home.html, index.js y out/index.html  
Ejemplo para documentar paquete npm de manera automatica y tipar las variables.  
-- npm i -g jsdoc // para instalar de manera global  
-- jsdoc index.js // para generar la carpeta out y el archivo index.html  

### JsDoc2
archivo: ./src/index.js 

### ServidorHTTPS 
Servidor con cifrado de protocolo https.  
1. Generación de llave privada
```shell
openssl genrsa -out SSL/key.pem  
```
2. Generación de CSR (Certificate Signin Request)
Es un archivo que contiene información que la Autoridad de certificación usará para crear el certificado. En el se incluye información del negocio y del sitio web que se desea proteger con SSL.
 
-- Este cambio solo es temporal durante la sesion
```shell
$env:OPENSSL_CONF = "C:\Program Files\OpenSSL-Win64\bin\openssl.cfg"

& "C:\Program Files\OpenSSL-Win64\bin\openssl" req -new -key SSL\key.pem -out SSL\csr.pem  
```

--- Es necesario porque hay un conflicto con openssl y postgresql en el archivo: "Program Files\PostgreSQL\psqlODBC\etc\openssl.cnf, r)".  

3. Generacion de certificado SSL  
```shell
openssl x509 -req -days 365 -in csr.pem -signkey key.pem -out cert.pem
```

verificar certificados
```shell
openssl x509 -text -noout -in SSL\csr.pem 
openssl rsa -in SSL\key.pem -check
```
para ver las credenciales del archivo csr
```shell
openssl req -text -noout -in SSL\csr.pem
```

### Servidor JWT /ServidorJWT
archivo: index.js
Auntentificacion de datos a travez de paquete npm json web token.


### YAML 
Practica para el uso de archivo yml, alternativa al json.
archivo: index.js 

### BaseDatoJWT
Archivo: index.js
auntentificacion con json web token conectada a una base de datos.

## Parcial 3
### Swagger 
archivo: index.js
forma de documentar rutas que solicitan peticiones http

