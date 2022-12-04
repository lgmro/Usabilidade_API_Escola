import { Router } from "express";
import { criarTabelaDisciplina, atualizarDisciplina, cadastrarDisciplina, deletarDisciplina, selecionarDisciplina, selecionarDisciplinas } from "../models/Disciplina.js";

const disciplina_routes = Router();

criarTabelaDisciplina()

disciplina_routes.get("/disciplinas", selecionarDisciplinas);
disciplina_routes.get("/disciplinas/:id", selecionarDisciplina);
disciplina_routes.post("/disciplinas", cadastrarDisciplina);
disciplina_routes.put("/disciplinas", atualizarDisciplina);
disciplina_routes.delete("/disciplinas/:id", deletarDisciplina);

export default disciplina_routes;