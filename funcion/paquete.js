import { con } from "../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../limit/config.js";

const paquete = Router();

paquete.get("/paquete",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const db = await con();
    const paquetes = db.collection("paquete");
    const result = await paquetes.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error al obtener los paquetes:", error);
    res.status(500).send("Error interno del servidor");
  }
});

paquete.get("/paquete/:id_paquete",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const id_paquete = parseInt(req.params.id_paquete);
      const db = await con();
      const paquete = db.collection("paquete");
      const result = await paquete.findOne({ id_paquete });
      if (result) {
        res.send(result);
      } else {
        res.status(404).send("paquete no encontrado");
      }
    } catch (error) {
      console.error("Error al obtener el paquete:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

  paquete.post("/paquete",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    let result;
    try {
        const db = await con();
        const paquetes = db.collection("paquete");
        result = await paquetes.insertOne(req.body);
        if (result.insertedCount === 0) {
          throw new Error("No se pudo insertar el registro");
        }
        res.status(201).send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
  });

  paquete.delete("/paquete/:id_paquete",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const id_paquete = parseInt(req.params.id_paquete); 
      const db = await con();
      const paquetes = db.collection("paquete");
  
  
      const result = await paquetes.deleteOne({ id_paquete });
  
      if (result.deletedCount === 1) {
        res.send("paquete eliminado exitosamente");
      } else {
        res.status(404).send("paquete no encontrada");
      }
    } catch (error) {
      console.error("Error al eliminar la pedido:", error);
      res.status(500).send("Error interno del servidor");
    }
  });
  
  paquete.put("/paquete/:id_paquete",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const id_paquete = parseInt(req.params.id_paquete); 
      const updatedData = req.body; 
      const db = await con();
      const paquetes = db.collection("paquete");
      const result = await paquetes.updateOne({ id_paquete }, { $set: updatedData });
      if (result.matchedCount === 1) {
        res.send("paquete actualizada exitosamente");
      } else {
        res.status(404).send("paquete no encontrada");
      }
    } catch (error) {
      console.error("Error al actualizar la paquete:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

export default paquete;