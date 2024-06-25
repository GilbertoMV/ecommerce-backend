import express from "express";
import morgan from "morgan";
import cors from 'cors';
import productRoutes from "./src/routes/productRoutes.js"
import userRoutes from "./src/routes/userRoutes.js"
import loginRoutes from  "./src/routes/loginRoutes.js"
import registerRoutes from './src/routes/registerRoutes.js'
import categoryRoutes from './src/routes/categoryRoutes.js'
import {validateToken} from "./src/middlewares/validateToken.js"
import { connectToDatabase } from './src/config/db.js';

const app = express();

// Habilitar CORS
app.use(cors({
  origin: '*', // Considerar configurar dominios específicos en producción
  optionsSuccessStatus: 200
}));

// Conectar a la base de datos
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Conexión a la base de datos establecida exitosamente.");

    // El middleware para ver los estatus
    app.use(morgan("dev"));
    app.use(express.json());

    // Rutas de la aplicación
    app.use('/register', registerRoutes);
    app.use('/login', loginRoutes);
    app.use('/products', validateToken, productRoutes);
    app.use('/users',validateToken,userRoutes);
    app.use('/categories', categoryRoutes);

    // Conexion al puerto definido en la configuración
    const port = process.env.PORT || 4001;
    app.listen(port, () => {
      console.log("Conexión establecida al puerto " + port);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
