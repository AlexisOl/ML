const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./configs/Db');

const rutas = require("./Routes/Terreno.routes")

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/terrenos', rutas);



sequelize.authenticate()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('error:', err);
  });