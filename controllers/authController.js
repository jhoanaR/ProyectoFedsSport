const { response, request } = require('express');
const passport = require('passport');
const Usuarios = require('../models/usuarios');
const crypto = require('crypto');



exports.autenticarUsuario = passport.authenticate('local',{
    successRedirect:'/menu',
    failureRedirect:'/login',
    failureFlash: true,
    badRequestMessage: 'Ambos Campos Son Obligatorios!'
});

exports.usuarioAutenticado = (request, response, next)=>{
    if(request.isAuthenticated()){
        return next();
    }

    return response.redirect('/login');

}

exports.cerrarSesion = (request, response)=>{ 
    request.session.destroy(()=>{
         response.redirect('/');
     });    
    
}

exports.enviarToken = async (request, response)=>{
    const usuario = await Usuarios.findOne({where:{email:request.body.email}});

    if(!usuario){
        request.flash('error', 'No existe esta cuenta');
        response.render('restablecer',{
            nombrePagina:'Restablecer contraseña',
            mensajes:request.flash()
        });
    }

    usuario.token = crypto.randomBytes(20).toString('hex');
    //console.log(token);

    usuario.expiracion = Date.now()+3600000;
    
    await usuario.save();
    
    const resteUrl=`http://${request.headers.host}/restablecer/${usuario.token}`;
    request.flash('success','Se ha enviado el token exitosamente');
    response.redirect('/restablecer');

}

exports.resetPassword = async(request, response)=>{
    response.json(request.params.token);
}