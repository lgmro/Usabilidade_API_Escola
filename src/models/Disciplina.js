import { openDb } from "../configDB.js";

export async function criarTabelaDisciplina() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Disciplina (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, sala_id TEXT NOT NULL, FOREIGN KEY (sala_id) REFERENCES Sala (id))")
    });
}

export async function selecionarDisciplinas(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Disciplina")
        .then(disciplinas => res.json(disciplinas))
    });
}

export async function selecionarDisciplina(req, res) {
    let idDisciplina = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Disciplina WHERE id=?", [idDisciplina])
        .then(disciplina => res.json(disciplina))
    });
}

export async function cadastrarDisciplina(req, res) {
    let disciplina = req.body;
    openDb().then(db => {
        db.run("INSERT INTO Disciplina (nome, sala_id) VALUES (?,?)", [disciplina.nome, disciplina.sala_id])
    });
    res.status(201).send(
        "Cadastrado com sucesso"
    );
}

export async function atualizarDisciplina(req, res) {
    let disciplina = {
        nome: req.body.nome,
        sala_id: req.body.sala_id,
        id: req.params.id,
    };
    openDb().then(db => {
        db.run("UPDATE Disciplina SET nome=?, sala_id=? WHERE id=?", [disciplina.nome, disciplina.sala_id, disciplina.id])
    });
    res.send("Disciplina Atualizada com Sucesso");
}

export async function deletarDisciplina(req, res) {
    let idDisciplina = req.params.id;
    openDb().then(db => {
         db.get("DELETE FROM Disciplina WHERE id=?", [idDisciplina])
        .then(() => res.send("Disciplina deletada com sucesso"))
    });
}