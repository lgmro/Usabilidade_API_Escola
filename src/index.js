import router from "./routes.js";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors())
app.use(express.json());
app.use(router);
app.listen(5000, () => console.log("Api iniciada na porta 5000."));