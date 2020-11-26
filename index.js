//importación de la liberia express
const express= require('express');
const { request, response } = require('express');
const routes = require('./routes'); 
const path = require('path');
const bodyParser = require('body-parser');
const helpers = require('./helpers');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('./config/passport');

require('./models/equipo');
require('./models/jugador');
require('./models/usuarios');

const db = require('./config/db');

db.sync()
    .then(()=>console.log('conexion'))
    .catch(error =>console.log(error))
//creamos una app de web express
const app = express();

app.use(express.static('public'));


app.set('view engine','pug');

//habilitar librería bodyParser
app.use(bodyParser.urlencoded({extended:true}));





app.set('views',path.join(__dirname,'./views'));

//invocar flash
app.use(flash());

//Manejo de Sesiones
app.use(cookieParser());

app.use(session({
    secret:'Secreto',
    resave: false,
    saveUninitialized:false
}));

app.use(passport.initialize());

app.use(passport.session());

app.use((request, response, next)=>{
    response.locals.vardump = helpers.vardump;
    response.locals.mensajes = request.flash();
    response.locals.usuarios = {...request.user} || null;
    next();
})

app.use((request, response, next)=>{
    //console.log('Otro Middleware');
    const fecha = new Date();
    response.locals.fecha = fecha.getFullYear();
    next();
})


// Ruta para el home
app.use('/',routes());

//Puerto que  escucha y levanta el servidor
app.listen(5000);


