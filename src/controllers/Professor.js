import { openDb } from "../configDB.js";

export async function criarTabelaProfessor() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Professor (id INTEGER PRIMARY KEY NOT NULL, nome TEXT NOT NULL, cpf TEXT NOT NULL, titulo_academico TEXT NOT NULL, disciplina_id INTEGER, FOREIGN KEY (disciplina_id) REFERENCES Disciplina (id))")
    });
}

export async function cadastrarProfessor(professor) {
    openDb().then(db => {
        db.run("INSERT INTO Professor (nome, cpf, titulo_academico, disciplina_id) VALUES (?,?,?,?)", [professor.nome, professor.cpf, professor.titulo_academico, professor.disciplina_id])
    });
}

export async function atualizarDadosProfessor(professor) {
    openDb().then(db => {
        db.run("UPDATE Professor SET nome=?, cpf=?, titulo_academico=?, disciplina=? WHERE id=?", [professor.nome, professor.cpf, professor.titulo_academico, professor.disciplina, professor.id])
    });
}

export async function selecionarProfessores() {
    return openDb().then(db => {
        return db.all("SELECT * FROM Professor")
        .then(res=>res)
    });
}

export async function selecionarProfessor(id) {
    return openDb().then(db => {
        return db.get("SELECT * FROM Professor WHERE id=?", [id])
        .then(res=>res)
    });
}

export async function deletarProfessor(id) {
    return openDb().then(db => {
        return db.get("DELETE FROM Professor WHERE id=?", [id])
        .then(res=>res)
    });
}