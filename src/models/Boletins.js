import { openDb } from "../configDB.js";

export async function criarTabelaBoletim() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Boletim (id INTEGER PRIMARY KEY NOT NULL, turma_id INTEGER NOT NULL, aluno_id INTEGER NOT NULL, nota_final REAL NOT NULL, aprovacao INTEGER, FOREIGN KEY (turma_id) REFERENCES Turma (id), FOREIGN KEY (aluno_id) REFERENCES Aluno (id))")
    });
}

export async function selecionarBoletins(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Boletim")
        .then(boletins => res.json(boletins))
    });
}

export async function selecionarBoletim(req, res) {
    let idBoletim = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Boletim WHERE id=?", [idBoletim])
        .then(boletim => res.json(boletim))
    });
}

export async function cadastrarBoletim(req, res) {
    let boletim = req.body;
    let status = 0
    if (boletim.nota_final >= 6) {
        status = 1
    } else {
        status = 0
    }
    openDb().then(db => {
        db.run("INSERT INTO Boletim (turma_id, aluno_id, nota_final, aprovacao) VALUES (?,?,?,?)", [boletim.turma_id, boletim.aluno_id, boletim.nota_final, status])
    });
    res.status(201).send(
        {
            mensagem: "Cadastrado com sucesso",
            aprovacao: status
        }
    );
}

export async function atualizarBoletim(req, res) {
    let boletim = req.body;
    let status = 0
    if (boletim.nota_final >= 6) {
        status = 1
    } else {
        status = 0
    }
    openDb().then(db => {
        db.run("UPDATE Boletim SET turma_id=?, aluno_id=?, nota_final=?, aprovacao=? WHERE id=?", [boletim.turma_id, boletim.aluno_id, boletim.nota_final, status, boletim.id])
    });
    res.send(
        {
            mensagem: "Boletim Atualizada com Sucesso",
            aprovacao: status
        }
    );
}

export async function deletarBoletim(req, res) {
    let idBoletim = req.params.id;
    openDb().then(db => {
         db.get("DELETE FROM Boletim WHERE id=?", [idBoletim])
        .then(() => res.send("Boletim deletada com sucesso"))
    });
}