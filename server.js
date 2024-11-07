import express from "express"; //framework crear servidor web
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js"; //importar funcion
import authRoutes from "./rutas/authRoute.js"
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from "url";

/*Libreria CORS para controlar qué dominios pueden hacer solicitudes a tu servidor.
asegura que solo las solicitudes desde fuentes confiables sean aceptadas.*/

//configurar env
//librería para cargar variables de entorno desde un archivo .env a node.js
try {
    console.log("Antes de cargar dotenv");
    //cargar variables
    dotenv.config();
    console.log("Variables de entorno cargadas");
    console.log(process.env.MONGO_URL);
} catch (error) {
    console.error("Error al cargar dotenv:", error);
}

//BD configuracion
//conexion a la BD

connectDB().catch(err => console.log(`Error en la conexión de MongoDB: ${err.message}`));

//rest object
//nicializar aplicación de Express para solicitudes HTTP.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './client/build')));

//routes
app.use("/api/v1/auth", authRoutes);

//rest api
app.use("*", function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

//PORT
//puerto del servidor
const PORT = process.env.PORT || 5000;

//inicializar servidor
//http://localhost:3000/
app.listen(PORT, () => {
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.white);
  });
