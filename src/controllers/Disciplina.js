import { openDb } from "../configDB.js";

export async function selecionarDisciplinas(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Disciplina")
        .then(disciplinas => res.json(disciplinas))
    });
}

export async function selecionarDisciplina(req, res) {
    let idDisciplina = req.body.id;
    openDb().then(db => {
        db.get("SELECT * FROM Professor WHERE id=?", [idDisciplina])
        .then(disciplina => res.json(disciplina))
    });
}

export async function cadastrarDisciplina(req, res) {
    let disciplina = req.body;
    openDb().then(db => {
        db.run("INSERT INTO Disciplina (nome, sala_id) VALUES (?,?,)", [disciplina.nome, disciplina.sala_id])
    });
    res.json({
        "statusCode": 200
    })
}

export async function atualizarDisciplina(req, res) {
    let disciplina = req.body;
    openDb().then(db => {
        db.run("UPDATE Disciplina SET nome=?, sala_id=? WHERE id=?", [disciplina.nome, disciplina.sala_id])
    });
    res.json({
        "statusCode": 200
    })
}

export async function deletarDisciplina(req, res) {
    let idDisciplina = req.body.id;
    openDb().then(db => {
         db.get("DELETE FROM Disciplina WHERE id=?", [idDisciplina])
        .then(() => res.json({
            "statusCode": 200
        }))
    });
}