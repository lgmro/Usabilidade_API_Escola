import router from "./routes.js";
import express from "express";

const app = express();

app.use(express.json());
app.use(router);
app.listen(3000, () => console.log("Api iniciada na porta 3000."));