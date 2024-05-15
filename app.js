import express from "express"
import morgan from "morgan"
import productsController from "./src/controllers/productController.js"
import usersController from "./src/controllers/userController.js"
import loginController from  "./src/controllers/loginController.js"
import registerController from './src/controllers/registerController.js'
import categoryController from './src/controllers/categoryController.js'
import { PORT } from "./src/db/config.js"
import {validateToken} from "./src/middlewares/validateToken.js"

const app = express();

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Conexion al puerto 4000
app.listen(PORT, () => {
  console.log("Conexion establecida al puerto " + PORT);
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
