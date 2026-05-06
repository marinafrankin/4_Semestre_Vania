import { Router } from 'express';
import { 
    buscarEcopontosComLixeiras
    
} from "../Controllers/EcopontoController.js";


const routerEcoponto = Router();

routerEcoponto.get('/ecopontosComLixeiras', buscarEcopontosComLixeiras); 

export default routerEcoponto;