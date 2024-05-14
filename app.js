const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const productsController = require("./src/controllers/productController.js");
const usersController = require("./src/controllers/userController.js");
const loginController = require ("./src/controllers/loginController.js");
const validateToken = require("./src/middlewares/validateToken.js");
const { PORT } = require("./src/db/config.js");

const app = express();

// Habilitar CORS
app.use(cors({
  origin: '*', // Considerar configurar dominios específicos en producción
  optionsSuccessStatus: 200
}));

// Middleware para ver los logs de las solicitudes
app.use(morgan("dev"));

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Conexion al puerto definido en la configuración
app.listen(PORT, () => {
  console.log("Conexion establecida al puerto " + PORT);
});

// Rutas de los productos con validación de token
app.use('/products', validateToken, productsController);

// Rutas de usuarios sin validación de token
app.use('/user', usersController);

// Ruta de login sin validación de token
app.use('/login', loginController);
