import { Router } from 'express';
import { 
    buscarLixeiras
    
} from "../Controllers/LixeiraController.js";


const routerLixeira = Router();

routerLixeira.get('/lixeiras', buscarLixeiras); 

export default routerLixeira;