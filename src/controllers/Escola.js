import { Router } from "express";
import { criarTabelaEscola, selecionarEscola, atualizarDadosEscola } from "../models/Escola.js";

const Escola_routes = Router();

criarTabelaEscola();

Escola_routes.get("/escola/:id", selecionarEscola);
Escola_routes.patch("/escola/:id", atualizarDadosEscola);


export default Escola_routes;