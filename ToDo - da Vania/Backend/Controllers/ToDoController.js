import ToDo from "../Models/ToDo.js";
import {Types} from "mongoose";
export default class ToDoController{
    static async Create(req, res){
        const {titulo, descricao, dataLimite, situacao} = req.body;
        if(!titulo)
        {
            res.status(422).json({message:"O título é obrigatório"});
            return;
        }
        if(!descricao || !dataLimite || !situacao){
            res.status(422).json({message:"Todos os campos são obrigatórios"});
            return;
        }
        const Tarefa = new ToDo({
            titulo,
            descricao,
            dataLimite,
            situacao
        });
        try {
            const novaTarefa = await Tarefa.save();
            res.status(200).json({message:"Tarefa inserida com sucesso", novaTarefa});
        } catch (error) {
            res.status(500).json({message:"Problema ao inserir a tarefa", error}); 
        }
    }//fim do create
    static async getAll(req, res){
        try {
            const tarefas = await ToDo.find({});
            res.status(200).json({tarefas});
        } catch (error) {
            res.status(500).json({message:"Problema ao buscar todas as tarefas", error}); 
        }
    }//fim do getAll
    static async delete(req, res){
        try {
            const id = req.params.id;
            const ObjectId = Types.ObjectId;
            if(!ObjectId.isValid(id))
            {
                res.status(422).json({message:"Identificador da tarefa é inválido"});
                return;
            }
            //deletar a tarefa
            const tarefa = await ToDo.findOne({_id : id});
            if(!tarefa){
                res.status(422).json({message:"Tarefa não foi encontrada"});
                return;
            }
            await ToDo.findByIdAndDelete(id);
            res.status(200).json({message:"Tarefa excluida com sucesso"});
        } catch (error) {
            res.status(500).json({message:"Problema ao excluir a tarefa", error}); 
        }
    }//fim delete
    static async getOne(req, res){
        const id = req.params.id;
        console.log(id);
        const ObjectId = Types.ObjectId;
        //verificou se o id da tarefa passado por parâmetro é do tipo Object(mongodb usa para id)
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador da tarefa inválido"});
            return
        }
        try {
            const tarefa = await ToDo.findById(id);
            if(!tarefa){
                res.status(404).json({message:"Não encontrou a tarefa"});
                return
            }
            res.status(200).json({tarefa});
        } catch (error) {
            res.status(500).json({message:"Problema ao buscar uma tarefa", error});
        }
    }
    static async updateAll(req, res){
        const id = req.params.id;
        const{titulo, descricao, dataLimite, situacao} = req.body;
        
        const ObjectId = Types.ObjectId;
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador da tarefa inválido"});
            return
        }
        if(!titulo || !descricao || !dataLimite || !situacao){
            return res.status(422).json({message:"Todos os dados são obrigatórios"});
        }
        const updateData = {
            titulo,
            descricao,
            dataLimite,
            situacao,

        };
        try {
            const updateTarefa = await ToDo.findByIdAndReplace(id, updateData,{
                new:true, runValidators:true
            });
            if(!updateTarefa){
                return res.status(404).json({message:"Tarefa para alteração não foi encontrada"});
            }
            return res.status(200).json({message:"Tarefa alterada com sucesso",tarefa:updateTarefa })
        } catch (error) {
            res.status(500).json({message:"Problema ao alterar uma tarefa", error});
        }
    }
    static async updatePartial(req, res){
        const id = req.params.id;
        const{situacao} = req.body;
        
        const ObjectId = Types.ObjectId;
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador da tarefa inválido"});
            return
        }
        if(!situacao){
            return res.status(422).json({message:"Situação não informada"});
        }
        console.log(id);
        try {
            const updateSituacao = await ToDo.findByIdAndUpdate(id, {situacao},{
                new:true, runValidators:true
            });
            if(!updateSituacao){
                return res.status(404).json({message:"Tarefa para alteração da Situação não foi encontrada"});
            }
            return res.status(200).json({message:"Situação da Tarefa alterada com sucesso",tarefa:updateSituacao })
        } catch (error) {
            res.status(500).json({message:"Problema ao alterar a situação da tarefa", error});
        }
    }
}