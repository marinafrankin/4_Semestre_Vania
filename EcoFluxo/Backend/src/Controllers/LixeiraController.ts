import type {Request, Response} from "express";
import prisma from "../lib/prisma.js";

export const buscarLixeiras = async(req:Request, res:Response)=>{
    try {
        const lixeiras = await prisma.lixeira.findMany();
        return res.status(200).json(lixeiras);
    } catch (error) {
        return res.status(500).json({message:"Problema ao buscar lixeiras", error});
    }
}