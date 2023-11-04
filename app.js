import dotenv from "dotenv";
import express from "express";

import envio from "./funcion/envio.js";

dotenv.config();
const app = express();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);


app.use("/envio",envio,);

app.listen(config.port, config.hostname, () => {
  console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
});
