//importar libreria para interactuar con mongoDB
import mongoose from 'mongoose';
import colors from 'colors';

//creando funcion para conectar a la BD
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Conexion a la base de datos de MongoDB ${conn.connection.host}`.bgMagenta.white);
    } catch (error) {
        console.log(`Error en MongoDB ${error}`.bgRed.white);
    }
};

//exportar funcion para usar en otros archivos
export default connectDB;