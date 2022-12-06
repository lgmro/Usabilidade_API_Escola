import { openDb } from "../configDB.js";

export async function criarTabelaEscola() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Escola (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, cnpj TEXT NOT NULL )")
    });
}

export async function selecionarEscola(req, res) {
    let idEscola = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Escola WHERE id=?", [idEscola])
        .then(escola => res.json(escola))
    });
}

export async function atualizarDadosEscola(req, res) {
    let escolaId = req.params.id;
    let escola = req.body;

    openDb().then(db => {
        db.run("UPDATE Escola SET nome=? WHERE id=?", [escola.nome, escolaId])
    });
    res.send("Aleração realizada!")
}
