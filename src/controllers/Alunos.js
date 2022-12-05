import { Router } from "express";
import { selecionarAlunos, selecionarAluno, cadastrarAluno, atualizarDadosAluno, deletarAluno } from "../models/Alunos.js";

const Alunos_routes = Router();

Alunos_routes.get("/alunos", selecionarAlunos);
Alunos_routes.get("/alunos/:id", selecionarAluno);
Alunos_routes.post("/alunos", cadastrarAluno);
Alunos_routes.put("/alunos/:id", atualizarDadosAluno);
Alunos_routes.delete("/alunos/:id", deletarAluno);

export default Alunos_routes;