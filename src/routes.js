import { Router } from "express";

const router = Router();

// Rota inicial
router.get("/", (req, res) => res.json({
    "statusCode": 200,
    "messagem": "API Escola Hogwarts de Azkaban"
}));

export default router;