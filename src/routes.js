import { Router } from "express";
import { atualizarDisciplina, cadastrarDisciplina, deletarDisciplina, selecionarDisciplina, selecionarDisciplinas } from "./controllers/Disciplina.js";
import { selecionarProfessor, selecionarProfessores, cadastrarProfessor, atualizarDadosProfessor, deletarProfessor} from "./controllers/Professor.js";

const router = Router();

// Rota inicial
router.get("/", (req, res) => res.json({
    "statusCode": 200,
    "messagem": "API Escola Hogwarts de Azkaban"
}));

// Rotas professor
router.get("/professores", selecionarProfessores);
router.get("/professor", selecionarProfessor);
router.post("/professor", cadastrarProfessor);
router.put("/professor", atualizarDadosProfessor);
router.delete("/professor", deletarProfessor);

// Rotas disciplina
router.get("/disciplinas", selecionarDisciplinas);
router.get("/disciplina", selecionarDisciplina);
router.post("/disciplina", cadastrarDisciplina);
router.put("/disciplina", atualizarDisciplina);
router.delete("/disciplina", deletarDisciplina);

export default router;