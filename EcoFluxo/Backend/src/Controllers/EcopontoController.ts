import type {Request, Response} from "express";
import prisma from "../lib/prisma.js";

export const buscarEcopontosComLixeiras = async(req:Request, res:Response)=>{
    try {
          const ecopontosComLixeiras = await prisma.ecoponto.findMany({
            include: {
            lixeiras: true, 
        },
    });
    
    return res.status(200).json(ecopontosComLixeiras);

    } catch (error) {
        return res.status(500).json({message:"Problema ao buscar os Ecopontos", error});
    }
}