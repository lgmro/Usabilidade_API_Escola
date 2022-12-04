import { Router } from "express";
import { selecionarSalas, selecionarSala } from "../models/Sala.js";

const sala_routes = Router();

sala_routes.get("/salas", selecionarSalas);
sala_routes.get("/salas/:id", selecionarSala);

export default sala_routes;