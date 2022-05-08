/* EQUIRENT
lo realizó: juan antonio cu cauich 
fecha de ultima actualizacion: 27/abril/22
Salida: La creacion de un servidor donde se encuentra la app*/ 


//invocamos a express para crear el servidor
const express = require('express');
const { json } = require('express/lib/response');
const app = express();
const path = require('path');

//cargar los archivos estaticos, esto me sirve oara indicar en donde se encuentra la carpeta public, en la cual se encuentra el CSS
app.use(express.static(path.join(__dirname, '/')));

//El directorio public
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

//Se habilita el motor EJS
app.set('view engine', 'ejs');


//decirle a node como capturar datos de los inputs, sin estas lineas no me captura los datos correctamente
app.use(express.urlencoded({extended:false}));
app.use(express(json));

//esto me permite poder renderizar html con ejs, es una configuracion para el motor de plantilla EJS
app.engine('html', require('ejs').renderFile);



//configuracion de variables de sesion
const session = require('express-session');
app.use(session({
  secret:'secret',
  resave: true,
  saveUninitialized: true
}));


// Indicando que se utilizará un archivo aparte en donde se definen las rutas
app.use('/', require('./router'));

//definiendo el puerto
app.set('port', process.env.PORT || 5000);
//creacion del servidor en el que se aloja el sistema
app.listen(app.get('port'), () =>{
  console.log(`Server corriendo en: ${app.get('port')}`);
});