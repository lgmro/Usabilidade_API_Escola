import { Router } from "express";
import { criarTabelaBoletim, atualizarBoletim, cadastrarBoletim, deletarBoletim, selecionarBoletim, selecionarBoletins } from "../models/Boletins.js";

const boletins_routes = Router();

criarTabelaBoletim()

boletins_routes.get("/boletins", selecionarBoletins);
boletins_routes.get("/boletins/:id", selecionarBoletim);
boletins_routes.post("/boletins", cadastrarBoletim);
boletins_routes.put("/boletins/:id", atualizarBoletim);
boletins_routes.delete("/boletins/:id", deletarBoletim);

export default boletins_routes;