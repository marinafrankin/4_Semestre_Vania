import Bairro from "../Models/Bairro.js";
import {Types} from "mongoose";
export default class BairroController{
    static async Create(req, res){
        const {titulo, descricao, morador, data_reclamacao , tipo} = req.body;
        if(!titulo)
        {
            res.status(422).json({message:"O título é obrigatório"});
            return;
        }
        if(!descricao || !morador ||!data_reclamacao  ||!tipo){
            res.status(422).json({message:"Todos os campos são obrigatórios"});
            return;
        }
        const Bairros = new Bairro({
            titulo,
            descricao,
            morador,
            data_reclamacao ,
            tipo
        });
        try {
            const novoBairro = await Bairros.save();
            res.status(200).json({message:"Reclamação inserida com sucesso", novoBairro});
        } catch (error) {
            res.status(500).json({message:"Problema ao inserir reclamacao", error:error.message}); 
        }
    }//fim do create


    static async getAll(req, res){
        try {
            const bairros = await Bairro.find({});
            res.status(200).json({bairros});
        } catch (error) {
            res.status(500).json({message:"Problema ao buscar todas as reclamações", error}); 
        }
    }//fim do getAll


    static async getAllByTipo(req, res){
        const {tipo} = req.query;

        if (!tipo) return res.status(400).json({ message: "Informe o tipo de reclamação." });
        try 
        {
            const bairros = await Bairro.find({ tipo: { $regex: tipo, $options: "i" } }).sort("-createdAt");
            res.status(200).json({bairros});
        } 
        catch (error) 
        {
            res.status(500).json({message:"Erro ao buscar todas as reclamações!", error});
        }
    }//fim do getAllByAuthor


    static async getOne(req, res){
        const id = req.params.id;
        console.log(id);
        const ObjectId = Types.ObjectId;

        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador de reclamação inválido"});
            return
        }
        try {
            const bairro = await Bairro.findById(id);
            if(!bairro){
                res.status(404).json({message:"Reclamação não encontrado"});
                return
            }
            res.status(200).json({bairro});
        } catch (error) {
            res.status(500).json({message:"Problema ao buscar reclamação", error});
        }
    }//fim do getOne


    static async delete(req, res){
        try {
            const id = req.params.id;
            const ObjectId = Types.ObjectId;
            if(!ObjectId.isValid(id))
            {
                res.status(422).json({message:"Identificador de reclamação inválido"});
                return;
            }

            //deletar a tarefa
            const bairro = await Bairro.findOne({_id : id});
            if(!bairro){
                res.status(422).json({message:"Reclamação não encontrada"});
                return;
            }
            await Bairro.findByIdAndDelete(id);
            res.status(200).json({message:"Reclamação excluida com sucesso"});
        } catch (error) {
            res.status(500).json({message:"Problema ao excluir a reclamação", error}); 
        }
    }//fim delete



    static async updateAll(req, res){
        const id = req.params.id;
        const{titulo, descricao, morador, data_reclamacao , tipo} = req.body;
        
        const ObjectId = Types.ObjectId;
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador de reclamação inválido"});
            return
        }
        if(!titulo || !descricao || !morador ||!data_reclamacao ||!tipo){
            return res.status(422).json({message:"Todos os dados são obrigatórios"});
        }
        const updateData = {
            titulo,
            descricao,
            morador,
            data_reclamacao,
            tipo,

        };
        try {
            const updateBairro = await Bairro.findByIdAndReplace(id, updateData,{
                new:true, runValidators:true
            });
            if(!updateBairro){
                return res.status(404).json({message:"Reclamação para alteração não encontrado"});
            }
            return res.status(200).json({message:"Reclamação alterada com sucesso",bairro:updateBairro })
        } catch (error) {
            res.status(500).json({message:"Problema ao alterar uma reclamação", error});
        }
    }//fim do updateAll


    static async updatePartial(req, res){
        const id = req.params.id;
        const{tipo} = req.body;
        
        const ObjectId = Types.ObjectId;
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador do tipo de reclamação inválido"});
            return
        }
        if(!tipo){
            return res.status(422).json({message:"Tipo não informado"});
        }
        console.log(id);
        try {
            const updateTipo = await Bairro.findByIdAndUpdate(id, {tipo},{
                new:true, runValidators:true
            });
            if(!updateTipo){
                return res.status(404).json({message:"Reclamação para alteração do Tipo não foi encontrado"});
            }
            return res.status(200).json({message:"Tipo de reclamação alterado com sucesso",bairro:updateTipo })
        } catch (error) {
            res.status(500).json({message:"Problema ao alterar o Tipo de reclamação", error});
        }
    }//fim do updatePartial


    static async updateFull(req, res){
        try 
        {
            const id = req.params.id;
            const {titulo, descricao, morador, data_reclamacao , tipo} = req.body;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
            {
                return res.status(422).json({message: "Id inválido"});
            }

            if (!titulo || !descricao || !morador ||!data_reclamacao ||!tipo)
            {
                return res.status(422).json({message: "Por favor, verifique os campos obrigatórios!"});
            }

            const updateData = {
                titulo,
                descricao,
                morador,
                data_reclamacao,
                tipo
            }

            const updatedBairro = await Bairro.findByIdAndUpdate(id, updateData, {new: true});

            if (!updatedBairro)
            {
                return res.status(404).json({message: "Reclamação não encontrada!"})
            }

            return res.status(200).json({message: "Reclamação alterada com sucesso", updatedBairro});
        } 
        catch (error) 
        {
            return res.status(500).json({message: "Erro ao buscar uma reclamação", error: error.message});
        }
    }//fim do updateFull
}