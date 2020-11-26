const { request, response } = require("express");
const Usuarios = require('../models/usuarios');

exports.frmRegistro = (request, response)=>{
    //response.send('Funciona');
    response.render('registro',{nombrePagina:'Registro'});
}
exports.frmIniciarSesion = (request, response)=>{
    // response.send('Funciona!!!!!!!!');
   const { error }= response.locals.mensajes;

   response.render('login',{
        nombrePagina:'Iniciar Sesión',
        error
   });
}
exports.registrarUsuario = async (request, response)=>{
   // console.log(request.body);
   const {email, password}= request.body;

   try {
      await Usuarios.create({
           email,
           password
       });
       response.redirect('/login');
   } catch (error) {
       request.flash('error', error.errors.map(error => error.message));
       response.render('registro',{
           mensajes: request.flash(),
           nombrePagina:'Registro',
           email,
           password

       })
       //console.log(error);       
   }

  

}

exports.restablecerPassword = (request, response)=>{
    

    response.render('restablecer',{
        nombrePagina:'Restablecer Contraseña'
    });


}
