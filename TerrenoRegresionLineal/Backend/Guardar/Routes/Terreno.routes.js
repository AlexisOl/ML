const express = require('express');
const router = express.Router();

const departamentosControlador = require("../Controller/TerrrenoController")

router.get("/", departamentosControlador.obtenerTodosDepartamentos)
router.get("/porNombre/:ubicacion", departamentosControlador.terrenoUbicacion)


module.exports = router