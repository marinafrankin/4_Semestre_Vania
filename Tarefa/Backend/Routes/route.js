import {Router} from "express";
import LivroController from "../Controllers/LivroController.js";
const routes = Router();

//rotas
routes.post('/Create', LivroController.Create);
routes.get('/getAll', LivroController.getAll);
routes.get('/:id', LivroController.getOne);
routes.put('/:id', LivroController.updateAll);
routes.patch('/:id', LivroController.updatePartial);
export default routes;