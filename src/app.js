import express from "express";
import db from "./config/db.js";
import routes from "./routes/index.js";

db.on("error", console.log.bind(console, "Erro de conexão com o banco."));
db.once("open", () => {
  console.log("Conectado ao Banco de Dados MongoDB Atlas!");
});

const app = express();
app.use(express.json());
routes(app);

export default app;
