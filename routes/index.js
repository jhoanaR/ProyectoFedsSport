// Importación de la liberia Express
const  express = require('express');
// invocar el metodo de router
const router = express.Router();
const { body } = require('express-validator');
const equipoController = require('../controllers/equipoController');
const jugadorController = require('../controllers/jugadorController');
const usuarioController = require('../controllers/usuariosController');
const authController = require('../controllers/authController');


//modulo para traer el rutamiento 
module.exports = function(){
    router.get('/', equipoController.FedssportHome);
    router.get('/index', authController.usuarioAutenticado, equipoController.FedssportHome);
    router.get('/FrmEquipo', authController.usuarioAutenticado, equipoController.equipo);
    router.post('/FrmEquipo', authController.usuarioAutenticado, equipoController.InsertarFrmEquipo);
    router.get('/menu', authController.usuarioAutenticado, equipoController.Inicio);
    router.post('/menu', authController.usuarioAutenticado, equipoController.Inicio);

    //Listar equipos
    router.get('/equipos/:url', authController.usuarioAutenticado, equipoController.EquipoporUrl);
    // Ruta de Edición
    router.get('/equipo/editar/:id', authController.usuarioAutenticado, equipoController.FrmEditarEquipo);
    //crear el metodo post de edición
    router.post('/FrmEquipo/:id', authController.usuarioAutenticado, equipoController.EditarEquipo);
    //Crear el modelo de eliminación
    router.delete('/equipo/:url', authController.usuarioAutenticado, equipoController.eliminarEquipo);
    

    //Crear el método de inserción para jugador 
    router.post('/equipos/:url', authController.usuarioAutenticado, jugadorController.agregarJugador);

    //Método para actualizar
    router.patch('/equipos/:id', authController.usuarioAutenticado, jugadorController.cambiarEstadoJugador);

    //Metodo de eliminar jugador
    router.delete('/equipos/:id', authController.usuarioAutenticado, jugadorController.eliminarJugador);

    //Metodo registro
    router.get('/registro', usuarioController.frmRegistro);

    //Metodo insercion usuario
    router.post('/registro', usuarioController.registrarUsuario);

    // crear el formulario de iniciar sesión
    router.get('/login', usuarioController.frmIniciarSesion);
    router.post('/login', authController.autenticarUsuario);

    //Cerrar Sesión
    router.get('/cerrar-sesion', authController.cerrarSesion);

    //restablecer password
    router.get('/restablecer', usuarioController.restablecerPassword);
    router.post('/restablecer', authController.enviarToken);

    router.get('/restablecer', authController.resetPassword);
    
    return router;
}
