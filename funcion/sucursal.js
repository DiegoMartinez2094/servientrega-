import { con } from "../db/atlas.js";
import { Router } from "express";
import { limitGrt } from "../limit/config.js";

const sucursal = Router();

sucursal.get("/sucursal",limitGrt(), async (req, res) => {
  if(!req.rateLimit) return; 
  console.log(req.rateLimit);
  try {
    const db = await con();
    const sucursales = db.collection("sucursal");
    const result = await sucursales.find({}).toArray();
    res.send(result);
  } catch (error) {
    console.error("Error al obtener los sucursales:", error);
    res.status(500).send("Error interno del servidor");
  }
});

sucursal.get("/sucursal/:id",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const id = parseInt(req.params.id); // Convertir el parámetro a número entero
      const db = await con();
      const sucursal = db.collection("sucursal");
      const result = await sucursal.findOne({ id });
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

  sucursal.post("/sucursal",limitGrt(), async(req, res)=>{
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    let result;
    try {
        const db = await con();
        const sucursals = db.collection("sucursal");
        result = await sucursals.insertOne(req.body);
        if (result.insertedCount === 0) {
          throw new Error("No se pudo insertar el registro");
        }
        res.status(201).send(result);
    } catch (error) {
        console.log(error.message);
        res.status(500).send(error.message);
    }
  });

  sucursal.delete("/sucursal/:id",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const id = parseInt(req.params.id); 
      const db = await con();
      const sucursals = db.collection("sucursal");
  
  
      const result = await sucursals.deleteOne({ id });
  
      if (result.deletedCount === 1) {
        res.send("sucursal eliminado exitosamente");
      } else {
        res.status(404).send("sucursal no encontrada");
      }
    } catch (error) {
      console.error("Error al eliminar la pedido:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

  sucursal.put("/sucursal/:id",limitGrt(), async (req, res) => {
    if(!req.rateLimit) return; 
    console.log(req.rateLimit);
    try {
      const id = parseInt(req.params.id); 
      const updatedData = req.body; 
      const db = await con();
      const sucursals = db.collection("sucursal");
      const result = await sucursals.updateOne({ id }, { $set: updatedData });
      if (result.matchedCount === 1) {
        res.send("sucursal actualizada exitosamente");
      } else {
        res.status(404).send("sucursal no encontrada");
      }
    } catch (error) {
      console.error("Error al actualizar la sucursal:", error);
      res.status(500).send("Error interno del servidor");
    }
  });

export default sucursal;
