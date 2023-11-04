import { con } from "../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../limit/config.js";

const envio = Router();

envio.get("/envio",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const db = await con();
    const pedidos = db.collection("envio");
    const result = await pedidos.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    res.status(500).send("Error interno del servidor");
  }
});

envio.get("/envio/:id",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id = parseInt(req.params.id); // Convertir el parámetro a número entero
    const db = await con();
    const envio = db.collection("envio");
    const result = await envio.findOne({ id });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send("pedido no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener el pedido:", error);
    res.status(500).send("Error interno del servidor");
  }
});

envio.post("/envio",limitGrt(), async(req, res)=>{
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  let result;
  try {
      const db = await con();
      const envios = db.collection("envio");
      result = await envios.insertOne(req.body);
      if (result.insertedCount === 0) {
        throw new Error("No se pudo insertar el registro");
      }
      res.status(201).send(result);
  } catch (error) {
      console.log(error.message);
      res.status(500).send(error.message);
  }
});


envio.delete("/envio/:id",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id = parseInt(req.params.id); 
    const db = await con();
    const envios = db.collection("envio");


    const result = await envios.deleteOne({ id });

    if (result.deletedCount === 1) {
      res.send("envio eliminado exitosamente");
    } else {
      res.status(404).send("envio no encontrada");
    }
  } catch (error) {
    console.error("Error al eliminar la pedido:", error);
    res.status(500).send("Error interno del servidor");
  }
});


envio.put("/envio/:id",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const id = parseInt(req.params.id); 
    const updatedData = req.body; 
    const db = await con();
    const envios = db.collection("envio");
    const result = await envios.updateOne({ id }, { $set: updatedData });
    if (result.matchedCount === 1) {
      res.send("pedido actualizada exitosamente");
    } else {
      res.status(404).send("pedido no encontrada");
    }
  } catch (error) {
    console.error("Error al actualizar la pedido:", error);
    res.status(500).send("Error interno del servidor");
  }
});

export default envio;
