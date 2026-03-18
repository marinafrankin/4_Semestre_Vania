import { Router } from "express";
import TarefaController from "../Controllers/TarefaController.js";

// instância do Router
const routes = Router();

// Criando rotas
routes.post("/create", TarefaController.create); // para chamar um método estático, precisa informar o nome da classe - nesse caso, chamando o método create
routes.get("/getAll", TarefaController.getAll); // pegar todas as tarefas
routes.delete("/:id", TarefaController.remove); // excluir determinada tarefa com ID
//routes.get("/:id", TarefaController.getOne); // pegar determinada tarefa com ID

export default routes;