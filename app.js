const express = require("express");
const morgan = require("morgan");
const productsController = require("./controllers/productsController.js");
const usersController = require("./controllers/usersController.js");
const { PORT } = require("./db/config.js");

const app = express();

// Middleware para habilitar CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Reemplaza * con el dominio de tu aplicación si es necesario
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
app.use('/products', productsController);

// Se manda a llamar al controlador del usuario
app.use('/users', usersController);

