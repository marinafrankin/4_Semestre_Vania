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
    }
}