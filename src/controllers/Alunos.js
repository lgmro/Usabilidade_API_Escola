import { Router } from "express";
import { selecionarAlunos, selecionarAluno, cadastrarAluno, atualizarDadosAluno, deletarAluno } from "../models/Alunos.js";

const Alunos_routes = Router();

Alunos_routes.get("/Alunos", selecionarAlunos);
Alunos_routes.get("/Alunos/:id", selecionarAluno);
Alunos_routes.post("/Alunos", cadastrarAluno);
Alunos_routes.put("/Alunos/:id", atualizarDadosAluno);
Alunos_routes.delete("/Alunos/:id", deletarAluno);

export default Alunos_routes;