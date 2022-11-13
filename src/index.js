import { atualizarDadosProfessor, cadastrarProfessor, criarTabelaProfessor } from "./controllers/Professor.js";

import express from "express";
const app = express();
app.use(express.json());

criarTabelaProfessor();

app.get("/", (req, res) => res.send("Welcome to API"));

app.post("/professor", (req, res) => {
    cadastrarProfessor(req.body); 
    res.json({
        "statusCode": 200
    })
});

app.put("/professor", (req, res) => {
    if (req.body && !req.body.id) {
        res.json({
            "statusCode": 400,
            "message": "Id não informado"
        })
    } else {
        atualizarDadosProfessor(req.body); 
        res.json({
        "statusCode": 200
        })
        
    }
});

app.listen(3000, () => console.log("Api iniciada na porta 3000."));