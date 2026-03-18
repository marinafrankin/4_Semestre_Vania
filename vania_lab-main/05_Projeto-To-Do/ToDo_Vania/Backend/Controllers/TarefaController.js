import Tarefa from "../Models/Tarefa.js";
import {Types} from "mongoose";

export default class tarefaController{
    static async create(req, res){
        const {titulo, descricao, dataLimite, situacao} = req.body;

        if(!titulo)
        {
            return res.status(422).json({message:"Preencha o Título"});
        
        }
        if(!descricao)
        {
            return res.status(422).json({message:"Preencha a Descrição"});
        
        }
        if(!dataLimite)
        {
            return res.status(422).json({message:"Preencha a data limite"});
        
        }
        if(!situacao)
        {
            return res.status(422).json({message:"Situação é obrigatória"});
        
        }
        const tarefa = new Tarefa({
            titulo,
            descricao,
            dataLimite,
            situacao
        });
        try{
            const novatarefa = await tarefa.save();
            res.status(200).json({message:"Tarefa inserida com sucesso!", novatarefa});
        }
        catch(error){
            res.status(500).json({message:"Problema ao inserir a tarefa",error});
        }
    }//create
    static async remove(req, res){
        const id = req.params.id;
        const ObjectId = Types.ObjectId;
        if(!ObjectId.isValid(id))
        {
            return res.status(422).json({message:"Id inválido"});
        }
        try
        {
            const tarefa = await Tarefa.findOne({_id:id});
            if(!tarefa){
                return res.status(404).json({message:"Tarefa não encontrada"});
            }
            await Tarefa.findByIdAndDelete(id);
            res.status(200).json({message:"Tarefa removida com sucesso!!"});
        }
        catch(error){

            res.status(500).json({message:"Problema ao remover a tarefa",error});
        }

    }//fim remove
    static async getAll(req, res){
        const {status} = req.params;
        if(!status){
            try {
                const tarefas = await Tarefa.find({}).sort("-createdAt");
    
                res.status(200).json({tarefas});
            } catch (error) {
                res.status(500).json({message:"Erro ao buscar todas as tarefas", error});
            }
        }

        const tarefas = await Tarefa.find({status}).sort("-createdAt");
        
        res.status(200).json({tarefas});

    }

    static async getOne(req, res){
        
            const id = req.params.id;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
            {
                return res.status(422).json({message: "Id inválido"});
            }
            try {
            const tarefa = await Tarefa.findById(id);

            if (!tarefa)
            {
                return res.status(404).json({message: "Tarefa não encontrada"})
            }

            res.status(200).json(tarefa);
            } catch (error) {
                res.status(500).json({message: "Erro ao buscar uma tarefa", error});
            }
    }

    static async updateParcial(req, res){
        try {
            const id = req.params.id;
            const {situacao} = req.body;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
            {
                return res.status(422).json({message: "Id inválido"});
            }

            if (!situacao)
            {
                return res.status(422).json({message: "Situação não informada"});
            }

            const updatedTarefa = await Tarefa.findByIdAndUpdate(id, {situacao}, {new: true}); // o 'new: true' faz a alteração e retorna o resultado atualizado

            if (!updatedTarefa)
            {
                return res.status(404).json({message: "Tarefa não encontrada"})
            }

            return res.status(200).json({message: "Situação alterada com sucesso", updatedTarefa});
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar uma tarefa", error});
        }
    }

    static async updateCompleto(req, res){
        try {
            const id = req.params.id;
            const {titulo, descricao, dataLimite, situacao} = req.body;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
            {
                return res.status(422).json({message: "Id inválido"});
            }

            if (!titulo || !descricao || !dataLimite || !situacao)
            {
                return res.status(422).json({message: "Todos os dados da tarefa são obrigatórios"});
            }

            const updateData = {
                titulo,
                descricao,
                dataLimite: new Date(dataLimite + "T00:00:00"),
                situacao
            }

            // updateData["descricao"] = descricao

            const updatedTarefa = await Tarefa.findByIdAndUpdate(id, updateData, {new: true}); // o 'new: true' faz a alteração e retorna o resultado atualizado

            if (!updatedTarefa)
            {
                return res.status(404).json({message: "Tarefa não encontrada"})
            }

            return res.status(200).json({message: "Tarefa alterada com sucesso", updatedTarefa});
        } catch (error) {
            return res.status(500).json({message: "Erro ao buscar uma tarefa", error});
        }
    }
}//class