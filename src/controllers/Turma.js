import { Router } from "express";
import { matricularAlunoTurma, selecionarTurmas, selecionarTurma, cadastrarTurma, atualizarDadosTurma, deletarTurma, pegarAlunosTurma, selecionarMatriculas, selecionarMatricula } from "../models/Turma.js";

const Turma_routes = Router();

Turma_routes.get("/turma", selecionarTurmas);
Turma_routes.get("/turma/:id", selecionarTurma);
Turma_routes.get("/turma/:id/alunosTurma", pegarAlunosTurma);
Turma_routes.get("/turmas/matricula", selecionarMatriculas);
Turma_routes.get("/turma/matricula/:id", selecionarMatricula);
Turma_routes.post("/turma", cadastrarTurma);
Turma_routes.put("/turma/:id", atualizarDadosTurma);
Turma_routes.patch("/turma/:id/matricula", matricularAlunoTurma);
Turma_routes.delete("/turma/:id", deletarTurma);

export default Turma_routes;