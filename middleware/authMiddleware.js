import jwt from 'jsonwebtoken'
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {

    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Separa el token con un espacio, es decir separa el Bearer y el tokeny le asigna la posicion 1
            token = req.headers.authorization.split(' ')[1]

            // Una vez tenemos el token almacenado y autenticado se le agrega el id del usuario
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca la informacion del usuario por su id y nos la retorna toda excepto el password token y confirmado (datos sensibles)
            req.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado");

            return next() // se va hacia el siguiente middleware, y no ejecuta las siguientes lineas

        } catch (error) {
            const err = new Error('Token no valido');
            return res.status(403).json({ msg: err.message });
        }
    }

    if(!token){
        const err = new Error('Token no valido');
        res.status(403).json({ msg: err.message });
    }
    // Si no hay token se va hacia el siguiente middleware
    next();
}

export default checkAuth;