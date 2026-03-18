import express from "express";
import cors from "cors";
import routes from "./Routes/routes.js";

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))

app.use("/Livros", routes);
app.listen(5000);