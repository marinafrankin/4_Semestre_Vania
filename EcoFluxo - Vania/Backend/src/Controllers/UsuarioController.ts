import type {Request, Response} from "express";
import {PrismaClient, Prisma} from "@prisma/client";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "sua_chave_secreta_muito_forte";
const JWT_EXPIRATION_MS = 24*60*60*1000;//um dia em milisegundos


//  Create
export const registrarMorador = async(req:Request, res:Response)=>{
    const{nome, email, senha, perfil} = req.body;
    //validação
    if(!nome && !email && !senha && !perfil){
        return res.status(400).json({message:"Todos os campos são obrigatórios"});
    }
    try {
        const hashPassword = await argon2.hash(senha);
        const novousuario = await prisma.usuario.create({
            data:{
                nome,
                email,
                senha:hashPassword,
                perfil
            },
            select:{id:true, nome:true, email:true, perfil:true, criadoEm:true}
            
        })
        return res.status(200).json({message:"Usuário inserido com sucesso", novousuario});
    } 
    catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {  
            if (error.code === 'P2002') {
               return res.status(400).json({ message: 'O email fornecido já está em uso.' });
            }
        }
        return res.status(500).json({message:"Problema ao inserir usuário", error});
    }
};

export const login = async(req:Request, res:Response)=>{
    const{email, senha} = req.body;
    if(!email && !senha){
        return res.status(402).json({message: "Os dados para o login são obrigatórios"});
    }
    try {
        const usuario = await prisma.usuario.findUnique({
            where:{email}
        });
        if(!usuario){
            return res.status(400).json({message: "Credenciais inválidas"});
        }

        const senhaCorreta = await argon2.verify(usuario.senha, senha);
        if(!senhaCorreta){
            return res.status(400).json({message: "Credenciais inválidas"});
        }

        const tokenPayload = {
            id:usuario.id,
            nome:usuario.nome,
            perfil:usuario.perfil,
            email:usuario.email
        }
        const token = jwt.sign(tokenPayload, JWT_SECRET,{expiresIn:"1h"});
        res.cookie("jwt", token,{
            httpOnly:true, // ele evita que códigos de javascript acessem aos cookies
            secure:false, // usar o "true" para obrigar o uso https
            maxAge:JWT_EXPIRATION_MS
        });
        return res.status(200).json({message:"Login realizado com sucesso", 
            usuario: {
                id:usuario.id,
                nome:usuario.nome,
                perfil:usuario.perfil,
                email:usuario.email
            },
                token:token
            });
    } catch (error) {
        console.log("Error no login:", error);
        return res.status(500).json({message: "Problema no Login", error});
    }
};


export const esqueceuSenha =async(req:Request, res:Response)=>{
    const {email} = req.body;
    if(!email)
    {
        return res.status(402).json({message:"e-mail requerido"});
    }
    try 
    {
    const usuario = await prisma.usuario.findUnique({
            where:{email}
        });
        if(!usuario){
            return res.status(400).json({message: "E-mail inválidas"});
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hashToken = await argon2.hash(resetToken);
        const resetTokenExpiry = new Date(Date.now() + RESET_TOKEN_EXPIRATION_HOUR * 60 * 60 * 1000);

        await prisma.usuario.update({
            where:{id: usuario.id},
            data:{
                resetToken: hashToken,
                resetTokenExpiry: resetTokenExpiry
            },
        });

        sendPasswordResetEmail(usuario.email, resetToken).cath(err=>console.error("Falha no envio do e-mail"););
    } 
    catch (error)
    {
        return res.status(200).json({message: "Se o e-mail estiver cadastrado, você receberá um link"});
    }
}
