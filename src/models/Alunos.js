import { openDb } from "../configDB.js";

export async function criarTabelaAluno() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Aluno (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, cpf TEXT NOT NULL, numero_matricula INTEGER, sala_id INTEGER, FOREIGN KEY (sala_id) REFERENCES Sala (id))")
    });
}

export async function selecionarAlunos(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Aluno")
        .then(alunos => res.json(alunos))
    });
}

export async function selecionarAluno(req, res) {
    let idAluno = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Aluno WHERE id=?", [idAluno])
        .then(aluno => res.json(aluno))
    });
}

export async function cadastrarAluno(req, res) {
    let aluno = req.body;
    openDb().then(db => {
        db.get("SELECT 1 FROM Aluno WHERE cpf=? OR numero_matricula=?", [aluno.cpf, aluno.numero_matricula]).then(existe => {
            if (!!existe === true) {
                res.send("Já existe um aluno com esse CPF e/ou Matrícula.")
            } else {
                db.run("INSERT INTO Aluno (nome, cpf, numero_matricula, sala_id) VALUES (?,?,?,?)", [aluno.nome, aluno.cpf, aluno.numero_matricula, aluno.sala_id])
                res.status(201).send(
                    "Cadastrado com sucesso"
                ); 
            }
        }) 
});
}

export async function atualizarDadosAluno(req, res) {
    let aluno = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        numero_matricula: req.body.numero_matricula,
        id: req.params.id,
    };
    openDb().then(db => {
        db.run("UPDATE Aluno SET nome=?, cpf=?, numero_matricula=? WHERE id=?", [aluno.nome, aluno.cpf, aluno.numero_matricula, aluno.id])
    });
    res.send("Aleração realizada!")
}

export async function deletarAluno(req, res) {
    let idAluno = req.params.id;
    openDb().then(db => {
         db.get("DELETE FROM Aluno WHERE id=?", [idAluno])
        .then(() => res.send("O Aluno foi excluído do Banco de Dados com sucesso"));
    });
}