import { openDb } from "../configDB.js";

export async function criarTabelaProfessor() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Professor (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, cpf TEXT NOT NULL, titulo_academico TEXT NOT NULL, disciplina_id INTEGER, FOREIGN KEY (disciplina_id) REFERENCES Disciplina (id))")
    });
}

export async function selecionarProfessores(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Professor")
        .then(professores => res.json(professores))
    });
}

export async function selecionarProfessor(req, res) {
    let idProfessor = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Professor WHERE id=?", [idProfessor])
        .then(professor => res.json(professor))
    });
}

export async function cadastrarProfessor(req, res) {
    let professor = req.body;
    openDb().then(db => {
        db.get("SELECT 1 FROM Professor WHERE cpf=?", [professor.cpf]).then(existe => {
            if (!!existe === true) {
                res.send("Já existe um professor com esse CPF.")
            } else {
                db.run("INSERT INTO Professor (nome, cpf, titulo_academico, disciplina_id) VALUES (?,?,?,?)", [professor.nome, professor.cpf, professor.titulo_academico, professor.disciplina_id])
                res.status(201).send(
                    "Cadastrado com sucesso"
                ); 
            }
        }) 
});
}

export async function atualizarDadosProfessor(req, res) {
    let professor = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        titulo_academico: req.body.titulo_academico,
        disciplina_id: req.body.disciplina_id,
        id: req.params.id,
    };
    openDb().then(db => {
        db.run("UPDATE Professor SET nome=?, cpf=?, titulo_academico=? WHERE id=?", [professor.nome, professor.cpf, professor.titulo_academico, professor.id])
    });
    res.send("Aleração realizada!")
}

export async function deletarProfessor(req, res) {
    let idProfessor = req.params.id;
    openDb().then(db => {
         db.get("DELETE FROM Professor WHERE id=?", [idProfessor])
        .then(() => res.send("O professor foi excluído do Banco de Dados com sucesso"));
    });
}