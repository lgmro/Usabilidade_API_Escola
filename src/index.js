import { atualizarDadosProfessor, cadastrarProfessor, criarTabelaProfessor, deletarProfessor, selecionarProfessor, selecionarProfessores } from "./controllers/Professor.js";

import express from "express";
const app = express();
app.use(express.json());

app.get("/", (req, res) => res.send("Welcome to API"));

app.get("/professores", async (req, res) => {
    let professores = await selecionarProfessores();
    res.json(professores);

});

app.get("/professor", async (req, res) => {
    let professor = await selecionarProfessor(req.body.id);
    res.json(professor);

});

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

app.delete("/professor", async (req, res) => {
    let professor = await deletarProfessor(req.body.id);
    res.json(professor);

});

app.listen(3000, () => console.log("Api iniciada na porta 3000."));