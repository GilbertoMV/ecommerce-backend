const express = require("express");
const morgan = require("morgan");
const productsController = require("./src/controllers/productsController.js");
const usersController = require("./src/controllers/usersController.js");
const loginController = require ("./src/controllers/loginController.js")
const { PORT } = require("./src/db/config.js");
const validateToken = require("./src/middlewares/validateToken.js");

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

// Se manda a llamar al controlador de catálogo productos
app.use('/products',validateToken, productsController);

// Se manda a llamar al controlador del usuario
app.use('/users', usersController);

//Se manda a llamar al login
app.use('/login', loginController);
