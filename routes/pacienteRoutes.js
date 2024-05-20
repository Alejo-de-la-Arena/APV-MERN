import express from 'express';
import { 
    agregarPaciente, 
    obtenerPacientes,
    obtenerPaciente, 
    actualizarPaciente, 
    eliminarPaciente } from '../controllers/pacienteController.js';

import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
.post(checkAuth, agregarPaciente)
.get(checkAuth, obtenerPacientes) // El usuario debe estar autenticado para ejecutar cualquiera de los dos metodos

router.route('/:id')
.get(checkAuth, obtenerPaciente)
.put(checkAuth, actualizarPaciente)
.delete(checkAuth, eliminarPaciente)

export default router;