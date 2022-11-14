import { Router } from "express";
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

export default router;