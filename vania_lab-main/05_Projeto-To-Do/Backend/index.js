import express from "express";
import cors from "cors"; // faz a comunicação entre back-end e front-end, que são elementos que estão em portas diferentes
import routes from "./Routes/routes.js";

const app = express(); // instância do express

// json - fazer troca de mensagens entre back-end e front-end
app.use(express.json());

// cors - comunicação entre duas aplicações que rodam em portas diferentes
app.use(cors({
    credentials: true, // segurança
    origin: "http://localhost:3000" // onde está rodando o front-end
}))

app.use("/ToDo", routes); // junta a URL do 'ToDo' com a rota do routes.js
app.listen(5000); // a porta da qual irá escutar/rodar o back-end 