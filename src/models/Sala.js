import { openDb } from "../configDB.js";

export async function selecionarSalas(req, res) {
    openDb().then(db => {
        db.all("SELECT * FROM Sala")
        .then(salas => res.json(salas))
    });
}

export async function selecionarSala(req, res) {
    let idSala = req.params.id;
    openDb().then(db => {
        db.get("SELECT * FROM Sala WHERE id=?", [idSala])
        .then(sala => res.json(sala))
    });
}