import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";


// Interface que contenha os dados do token

export interface UsuarioPayload{
    id:number;
    nome:string;
    email:string;
    perfil:"MORADOR" | "GESTOR";
}

export interface AuthRequest extends Request{
    user?:UsuarioPayload;
}

export const atenticacaoToken = (req:AuthRequest, res:Response, next:NextFunction)=>{

}


export const autorizacaoPerfil = (perfilPermitido:"MORADOR" | "GESTOR")=>{
    return (req:AuthRequest, res:Response, next:NextFunction)=>{
        if(!req.user){
            return res.status(402).json({message:"Acesso Negado"});
        }
        if(req.user.perfil !== perfilPermitido){
            return res.status(402).json({message:"Acesso Negado"});
        }
        next();
    }
}