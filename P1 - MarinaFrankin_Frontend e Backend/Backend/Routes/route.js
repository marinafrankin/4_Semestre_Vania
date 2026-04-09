import {Router} from "express";
import BairroController from "../Controllers/BairroController.js";
const routes = Router();

//rotas
routes.post("/create", BairroController.Create);

routes.get("/getAll", BairroController.getAll);
routes.get("/getAllByTipo", BairroController.getAllByTipo);
routes.get("/:id", BairroController.getOne);

routes.delete("/:id", BairroController.delete);

routes.put("/:id", BairroController.updateFull);
routes.patch("/:id", BairroController.updatePartial);

export default routes;