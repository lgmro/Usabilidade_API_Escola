import { openDb } from "../configDB.js";

export async function criarTabelaProfessor() {
    openDb().then(db => {
        db.exec("CREATE TABLE IF NOT EXISTS Professor (id INTEGER PRIMARY KEY, nome TEXT, cpf TEXT, titulo_academico TEXT, disciplina TEXT)")
    });
}

export async function cadastrarProfessor(professor) {
    openDb().then(db => {
        db.run("INSERT INTO Professor (nome, cpf, titulo_academico, disciplina) VALUES (?,?,?,?)", [professor.nome, professor.cpf, professor.titulo_academico, professor.disciplina])
    });
}

export async function atualizarDadosProfessor(professor) {
    openDb().then(db => {
        db.run("UPDATE Professor SET nome=?, cpf=?, titulo_academico=?, disciplina=? WHERE id=?", [professor.nome, professor.cpf, professor.titulo_academico, professor.disciplina, professor.id])
    });
}