import { Request, Response } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_muito_forte";
const JWT_EXPIRATION_MS = 24*60*60*1000;// um dia em milisegundos

// Create
export const create = async(req:Request, res:Response)=>{
    // Tem que ser igual ao schema.prisma 
    const{nome, email, senha, perfil} = req.body;

    //Validação
    if(!nome && !email && !senha && !perfil ){
        return res.status(400).json({message:"Todos os campos são obrigatórios"});
    }
    try {
        const hashPassword = await argon2.hash(senha);
        const novoUsuario = await prisma.usuario.create({
            data:{
                nome,
                email,
                senha:hashPassword,
                perfil
            },
            select:{id:true, nome:true, email:true, perfil:true, criadoEm:true}
        })
    } catch (error) {
        
    }
}