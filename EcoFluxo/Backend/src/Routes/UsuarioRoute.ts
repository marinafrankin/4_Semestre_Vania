import { Router } from 'express';
import { 
    login, 
    esqueceuSenha,
    registrarMorador 
    
} from "../Controllers/UsuarioController.js";


const routerUsuario = Router();

routerUsuario.post('/register', registrarMorador); 
routerUsuario.post('/forgot', esqueceuSenha); 
routerUsuario.post('/login', login);

export default routerUsuario;