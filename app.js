import express from "express"
import morgan from "morgan"
import cors from 'cors'
import productsController from "./src/controllers/productController.js"
import usersController from "./src/controllers/userController.js"
import loginController from  "./src/controllers/loginController.js"
import registerController from './src/controllers/registerController.js'
import categoryController from './src/controllers/categoryController.js'
import {validateToken} from "./src/middlewares/validateToken.js"

const app = express();

// Habilitar CORS
app.use(cors({
  origin: '*', // Considerar configurar dominios específicos en producción
  optionsSuccessStatus: 200
}));

// Conexion al puerto definido en la configuración
app.listen(process.env.DB_PORT, () => {
  console.log("Conexion establecida al puerto " + process.env.DB_PORT);
});

// El middleware para ver los estatus
app.use(morgan("dev"));
app.use(express.json());

//Se manda a llamar al register
app.use('/register',registerController);

//Se manda a llamar al login
app.use('/login', loginController);

// Se manda a llamar al controlador de catálogo productos
app.use('/products',validateToken, productsController);

// Se manda a llamar al controlador del usuario
app.use('/user',validateToken, usersController);

app.use('/categorys',categoryController);
