import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"

// Importar as rotas
const app = express();
const PORT = process.env.PORT|| 5000;
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

//Fazer as rotas
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
})