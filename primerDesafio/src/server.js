import express, { query } from "express"
import productManager from "./productManager.js"
const PORT = 8080;
const Manager = new productManager("productos.json");

const app = express()
app.get("/", ( req, res)=>{
    res.json({status:"Hola"})
})
app.get("/products",async (req, res)=>{
    let data = await Manager.getAll()
    if(req.query.limit){
        data = data.slice(0,req.query.limit)
    }
    res.json(data);
})

app.get("/products/:id", async (req, res)=>{
    const id = Number(req.params.id)
    const data = await Manager.getById(id)
    console.log(data)
    res.json(data)
})


app.listen(PORT, ()=>{
    console.log(`Servidor en puerto ${PORT}`);
});

