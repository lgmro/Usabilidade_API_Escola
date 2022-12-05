import { openDb } from "../configDB.js";
import { selecionarAluno } from "./Alunos.js";

export async function criarTabelaAluno() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Turma (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, cpf TEXT NOT NULL, numero_matricula INTEGER, sala_id INTEGER, FOREIGN KEY (sala_id) REFERENCES Sala (id))")
    });
}

export async function selecionarTurmas(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Turma")
        .then(turmas => res.json(turmas))
    });
}

export async function selecionarTurma(req, res) {
    let idTurma = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Turma WHERE id=?", [idTurma])
        .then(turma => res.json(turma))
    });
}

export async function cadastrarTurma(req, res) {
    let turma = req.body;
    openDb().then(db => {
        db.run("INSERT INTO Turma (disciplina_id, professor_id, sala_id) VALUES (?,?,?,?)", [turma.disciplina_id, turma.professor_id, turma.sala_id])
    });
    res.status(201).send(
       "Cadastrado com sucesso"
    );
}

export async function atualizarDadosTurma(req, res) {
    let turma = {
        nome: req.body.nome,
        cpf: req.body.cpf,
        numero_matricula: req.body.numero_matricula,
        sala_id: req.body.sala_id,
        id: req.params.id,
    };
    openDb().then(db => {
        db.run("UPDATE Turma SET disciplina_id=?, professor_id=?, sala_id=? WHERE id=?", [turma.disciplina_id, turma.professor_id, turma.sala_id, turma.id])
    });
    res.send("Aleração realizada!")
}

export async function deletarTurma(req, res) {
    let idTurma = req.params.id;
    openDb().then(db => {
         db.get("DELETE FROM Turma WHERE id=?", [idTurma])
        .then(() => res.send("A Turma foi excluído do Banco de Dados com sucesso"));
    });
}

export async function matricularAlunoTurma(req, res) {
    let turmaId = req.params.id;
    let body = req.body;

    const bla = body.sala_id - 1;
    
    await openDb().then(db => {
        db.get("SELECT * FROM Aluno WHERE id=?", [body.aluno_id])
        .then(aluno => {
            //valida se o aluno está no modulo anterior ao que quer matricular
            if (aluno.sala_id === bla){
                openDb().then(db => {
                    db.get("SELECT * FROM Boletim WHERE aluno_id=?", [body.aluno_id])
                    .then(boletim => {
                        //valida se aluno foi aprovado
                        if(boletim.aprovacao){
                            openDb().then(db => {
                                db.run("INSERT INTO MatricularAluno (turma_id, aluno_id) VALUES (?,?)", [turmaId, body.aluno_id])
                            });

                            //Todo: fazer update do sala_id do aluno no banco

                            //Todo: update do boletim do aluno para excluir a nota dele ou ver uma forma de criar um novo boletim
                        }
                        res.send("Aluno Matriculado");
                    })
                });
        
            } else {
                return res.status(400).send("Aluno Náo Matriculado");
            }
        })
    });
}
