const sequelize = require('sequelize');
const db = require('../config/db');
const Equipo = require('./equipo');
const bcrypt = require('bcrypt-nodejs');

const Usuarios = db.define('usuarios',{
    id:{
        type: sequelize.INTEGER(11),
        primaryKey: true,
        autoIncrement: true
    },
    email:{
        type:sequelize.STRING(100),
        allowNull:false,
        validate:{
            isEmail:{
                msg:"Por favor agregar un Email Valido"
            },
            notEmpty:{
                msg:"Por favor escriba un Email"
            }
        },
        unique:{
            args: true,
            msg:'Este Email ya está Registrado'
        }
    },
    password:{
        type:sequelize.STRING(100),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Por favor escriba una Contraseña"
            }
        }
    },

    token: sequelize.STRING,
    expiracion: sequelize.DATE

},{
    hooks:{
        beforeCreate(usuario){
            console.log(usuario);
            usuario.password=bcrypt.hashSync(usuario.password, bcrypt.genSaltSync(10));
        }
    }
});

Usuarios.prototype.verificarPassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

Usuarios.hasMany(Equipo);

module.exports = Usuarios;