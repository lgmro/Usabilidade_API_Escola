import { Router } from "express";
import { selecionarProfessor, selecionarProfessores, cadastrarProfessor, atualizarDadosProfessor, deletarProfessor} from "../models/Professores.js";

const professor_routes = Router();

professor_routes.get("/professores", selecionarProfessores);
professor_routes.get("/professores/:id", selecionarProfessor);
professor_routes.post("/professores", cadastrarProfessor);
professor_routes.put("/professores", atualizarDadosProfessor);
professor_routes.delete("/professores/:id", deletarProfessor);

export default professor_routes;