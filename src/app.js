import professores from "./controllers/Professores.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use(professores);

//Quando não encontrar alguma rota
app.use((req,res,next) => {
    const erro = new Error('Não Encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status | 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});


app.listen(5000, () => console.log("Api iniciada na porta 5000."));