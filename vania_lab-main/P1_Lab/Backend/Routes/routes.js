import { Router } from "express";
import LivroController from "../Controllers/LivroController.js";

const routes = Router();

routes.post("/create", LivroController.create);
routes.get("/getAll", LivroController.getAll);
routes.get("/getAllByAuthor", LivroController.getAllByAuthor);
routes.get("/:id", LivroController.getOne);
routes.get("/adquire/:id", LivroController.adquireOne);
routes.delete("/:id", LivroController.remove);
routes.patch("/:id", LivroController.updatePartial);
routes.put("/:id", LivroController.updateFull);

export default routes;