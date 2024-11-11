import express from "express";
import session from "express-session";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import './src/controllers/facebook_authController.js';

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
import color from './src/routes/colorsRoutes.js'
import size from './src/routes/sizesRoutes.js'
import order_detail from './src/routes/order_detailRoutes.js' 
import shopping_cart_detail from './src/routes/shopping_cart_detailsRoutes.js'
import image from './src/routes/imagesRoutes.js'
import product_size from './src/routes/product_sizeRoutes.js'
import product_color from './src/routes/product_colorRoutes.js'
import search from './src/routes/searchRoutes.js'
import mp from './src/routes/payment.routes.js'
import password from './src/routes/recoveryRoutes.js'
import facebook from './src/routes/facebook_auth.routes.js'
import {validateToken} from "./src/middlewares/validateToken.js"
import { connectToDatabase } from './src/config/db.js';

const app = express();
dotenv.config();

// Conectar a la base de datos
const startServer = async () => {
  try {
    await connectToDatabase();
    console.log("Conexión a la base de datos establecida exitosamente.");
    
    // El middleware
    app.use(morgan("dev"));
    app.use(express.json());
    app.use(session({
      secret: process.env.SESSION_KEY, // Cambia esto a una clave secreta
      resave: false,
      saveUninitialized: false,
    }));
    
    // Inicializa Passport y usa la sesión
    app.use(passport.initialize());
    app.use(passport.session()); 
    
    // Habilitar CORS
    app.use(cors({
      origin: '*', // Considerar configurar dominios específicos en producción
      optionsSuccessStatus: 200
    }));
    
    // Rutas de la aplicación
    app.use('/register', register);
    app.use('/login', login);
    app.use('/products', product);
    app.use('/users',validateToken,user);
    app.use('/categories', category);
    app.use('/shipments', shipment);
    //TODO: para usar dos iguales se necesita estar la mas detallada al iniciox
    app.use('/carts',shopping_cart_detail);
    app.use('/carts', shopping_cart);
    app.use('/address',address);
    //TODO: para usar dos iguales se necesita estar la mas detallada al inicio
    app.use('/orders', order_detail);
    app.use('/orders', order);
    app.use('/rewards', reward);
    app.use('/rates', rate);
    app.use('/histories', history);
    //TODO: para usar dos iguales se necesita estar la mas detallada al inicio
    app.use('/colors',product_color);
    app.use('/colors', color);
    app.use('/sizes', product_size);
    app.use('/sizes', size);
    app.use('/images', image);
    app.use('/searches',search);
    //Ruta para hacer el pago
    app.use('/pago',mp);
    //Ruta para hacer oauth
    app.use('/facebook', facebook);
    //Olvido de contraseña
    app.use('/password',password);

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
