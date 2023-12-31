import dotenv from "dotenv";
import express from "express";

import envio from "./funcion/envio.js";
import paquete from "./funcion/paquete.js"
import sucursal from "./funcion/sucursal.js";

dotenv.config();
const app = express();

app.use(express.json());
const config = JSON.parse(process.env.MY_SERVER);


app.use("/envio",envio);
app.use("/paquete",paquete);
app.use("/sucursal",sucursal);

app.listen(config.port, config.hostname, () => {
  console.log(`Servidor iniciado en http://${config.hostname}:${config.port}`);
});
