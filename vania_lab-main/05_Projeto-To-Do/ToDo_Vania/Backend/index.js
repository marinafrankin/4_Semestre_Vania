import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";


const app = new express();

//json - troca de mensagens entre backend e frontend
app.use(express.json())

//cors comunicação entre duas aplicações que rodam em portas diferentes
app.use(cors({
    credentials:true, 
    origin:"http://localhost:5173"
}))

app.use("/ToDo", routes);
app.listen(5000);