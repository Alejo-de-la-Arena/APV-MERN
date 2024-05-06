import express from 'express';
import { perfil, registrar, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// Área pública
router.post('/', registrar); // registrar el usuario
router.get('/confirmar/:token', confirmar); // confirmar la cuenta
router.post('/login', autenticar); //iniciar sesion
router.post('/olvide-password', olvidePassword); // ruta para ir si el usuario olvido su password
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword) //comprueba el token del usuario y contiene el formulario para resetar el password

// Área privada
router.get('/perfil', checkAuth, perfil);  // chequea el perfil, ejecuta el middleware y si el usuario no tiene un token valido pasa al siguiente middleware (perfil) 

export default router;