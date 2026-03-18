import {Router} from "express";
import ToDoController from "../Controllers/ToDoController.js";
const routes = Router();

//rotas
routes.post('/Create', ToDoController.Create);
routes.get('/getAll', ToDoController.getAll);
export default routes;