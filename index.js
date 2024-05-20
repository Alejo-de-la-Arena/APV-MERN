import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";

const app = express();

app.use(express.json());

dotenv.config();

conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || dominiosPermitidos.indexOf(origin) !== -1) {
            // El origen del request está permitido o es una solicitud no CORS
            callback(null, true);
        } else {
            callback(new Error('No está permitido por CORS'));
        }
    }
};

app.use(cors(corsOptions))
// app.use(cors({ origin: '*' }))

app.use('/api/veterinarios', veterinarioRoutes);
app.use('/api/pacientes', pacienteRoutes);

const PORT = process.env.PORT || 4000 // IF not exists use localhost/4000

app.listen(PORT, () => { // port for the server 
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});