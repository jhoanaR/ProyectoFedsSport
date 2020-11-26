const sequelize = require('sequelize');
const db = require('../config/db');
const Equipo = require('./equipo');

const Jugador = db.define('jugadores',{
    id:{
        type: sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    apellido:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    tipodocumento:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    numeroidentificacion:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    telefono:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    email:{
        type:sequelize.STRING(100),
        allowNull:false
    },
    estado: sequelize.INTEGER(1)
});


Jugador.belongsTo(Equipo);

//Proyectos.hasMany(Tareas);

module.exports = Jugador