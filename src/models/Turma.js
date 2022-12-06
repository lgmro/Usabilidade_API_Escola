import { openDb } from "../configDB.js";

export async function criarTabelaTurma() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Turma (id INTEGER PRIMARY KEY NOT NULL, disciplina_id INTEGER, professor_id INTEGER, FOREIGN KEY (disciplina_id) REFERENCES Disciplina(id), FOREIGN KEY (sala_id) REFERENCES Sala (id))")
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
        db.run("INSERT INTO Turma (disciplina_id, professor_id) VALUES (?,?)", [turma.disciplina_id, turma.professor_id])
    });
    res.status(201).send(
       "Cadastrado com sucesso"
    );
}

export async function atualizarDadosTurma(req, res) {
    let turma = {
        disciplina_id: req.body.disciplina_id,
        professor_id: req.body.professor_id,
        id: req.params.id,
    };
    openDb().then(db => {
        db.run("UPDATE Turma SET disciplina_id=?, professor_id=? WHERE id=?", [turma.disciplina_id, turma.professor_id, turma.id])
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

export async function selecionarMatriculas(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM MatricularAluno")
        .then(matriculas => res.json(matriculas))
    });
}

export async function selecionarMatricula(req, res) {
    let idMatricula = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM MatricularAluno WHERE id=?", [idMatricula])
        .then(matricula => res.json(matricula))
    });
}

export async function matricularAlunoTurma(req, res) {
    let turmaId = req.params.id;
    let body = req.body;

    const validarSala = body.sala_id - 1;

    await openDb().then(db => {
        db.get("SELECT * FROM Aluno WHERE id=?", [body.aluno_id])
        .then(aluno => {
            //valida se o aluno está no modulo anterior ao que quer matricular
            if (aluno.sala_id === validarSala){

                openDb().then(db => {
                    db.get("SELECT aprovacao FROM Boletim WHERE aluno_id=? AND turma_id=?", [body.aluno_id, body.turma_antiga])
                    .then(aprovacao => {
                        //valida se aluno foi aprovado
                        if(!!aprovacao){

                            openDb().then(db => {
                                db.run("INSERT INTO MatricularAluno (turma_id, aluno_id) VALUES (?,?)", [turmaId, body.aluno_id])
                            });

                            //faz o update no banco da nova sala_id(modulo) do aluno
                            openDb().then(db => {
                                db.run("UPDATE Aluno SET sala_id=? WHERE id=?", [body.sala_id, aluno.id])
                            });
                            
                            res.send("Aluno Matriculado");
                        }else {
                            res.send("Aluno Precisa ser aprovado no modulo ou ele não faz parte dessa turma");
                        }
                    })
                });
        
            } else if (aluno.sala_id === 1) {
                openDb().then(db => {
                    db.run("INSERT INTO MatricularAluno (turma_id, aluno_id) VALUES (?,?)", [turmaId, body.aluno_id])
                });
                res.send("Aluno Matriculado");
            } else {
                res.send("Aluno Náo Matriculado");
            }
        })
    });
}

export async function pegarAlunosTurma(req, res) {
    let idTurma = req.params.id;
    openDb().then(async db => {
         let matriculas = await db.all("SELECT * FROM MatricularAluno WHERE turma_id=?", [idTurma])
         let alunosTurma = await Promise.all(matriculas.map(async (val) => {
            let aluno = await db.get("SELECT * FROM Aluno WHERE id=?", [val.aluno_id])
            return aluno
        }))
        res.json(alunosTurma)
    });
    
}