import express from "express";
import morgan from "morgan";
import cors from 'cors';
import product from "./src/routes/productRoutes.js"
import user from "./src/routes/userRoutes.js"
import login from  "./src/routes/loginRoutes.js"
import register from './src/routes/registerRoutes.js'
import category from './src/routes/categoryRoutes.js'
import shipment from './src/routes/shipmentRoutes.js'
import shopping_cart from './src/routes/shopping_cartRoutes.js'
import address from './src/routes/addressRoutes.js'
import order from './src/routes/ordersRoutes.js'
import reward from './src/routes/rewardRoutes.js'
import rate from './src/routes/rateRoutes.js'
import history from './src/routes/history_orderRoutes.js'
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
    app.use('/register', register);
    app.use('/login', login);
    app.use('/products', product);
    app.use('/users',validateToken,user);
    app.use('/categories', category);
    app.use('/shipment', shipment);
    app.use('/cart', shopping_cart);
    app.use('/address',address);
    app.use('/order', order);
    app.use('/reward', reward);
    app.use('/rate', rate);
    app.use('/history', history);

    // Conexion al puerto definido en la configuración
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log("Conexión establecida al puerto " + port);
    });

  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
};

startServer();
