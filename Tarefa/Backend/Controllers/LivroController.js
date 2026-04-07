import Livro from "../Models/Livro.js";
import {Types} from "mongoose";
export default class LivroController{
    static async Create(req, res){
        const {titulo, autor, isbn, anoPublicacao, quantidadeEstoque} = req.body;
        if(!titulo)
        {
            res.status(422).json({message:"O título é obrigatório"});
            return;
        }
        if(!autor || !isbn){
            res.status(422).json({message:"Todos os campos são obrigatórios"});
            return;
        }
        const Livros = new Livro({
            titulo,
            autor,
            isbn,
            anoPublicacao,
            quantidadeEstoque
        });
        try {
            const novoLivro = await Livros.save();
            res.status(200).json({message:"Livro inserido com sucesso", novoLivro});
        } catch (error) {
            res.status(500).json({message:"Problema ao inserir livro", error}); 
        }
    }//fim do create


    static async getAll(req, res){
        try {
            const livros = await Livro.find({});
            res.status(200).json({livros});
        } catch (error) {
            res.status(500).json({message:"Problema ao buscar todos os livros", error}); 
        }
    }//fim do getAll


    static async getAllByAuthor(req, res){
        const {autor} = req.query;

        if (!autor) return res.status(400).json({ message: "Informe o autor." });
        try 
        {
            const livros = await Livro.find({ autor: { $regex: autor, $options: "i" } }).sort("-createdAt");
            res.status(200).json({livros});
        } 
        catch (error) 
        {
            res.status(500).json({message:"Erro ao buscar todos os livros!", error});
        }
    }//fim do getAllByAuthor


    static async delete(req, res){
        try {
            const id = req.params.id;
            const ObjectId = Types.ObjectId;
            if(!ObjectId.isValid(id))
            {
                res.status(422).json({message:"Identificador de livro inválido"});
                return;
            }

            //deletar a tarefa
            const livro = await Livro.findOne({_id : id});
            if(!livro){
                res.status(422).json({message:"Livro não encontrado"});
                return;
            }
            await Livro.findByIdAndDelete(id);
            res.status(200).json({message:"Livro excluido com sucesso"});
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
            res.status(422).json({message:"Identificador do livro inválido"});
            return
        }
        try {
            const livro = await ToDo.findById(id);
            if(!livro){
                res.status(404).json({message:"Livro não encontrado"});
                return
            }
            res.status(200).json({livro});
        } catch (error) {
            res.status(500).json({message:"Problema ao buscar livro", error});
        }
    }//fim do getOne


    static async adquireOne(req, res){
        const id = req.params.id;
        const ObjectId = Types.ObjectId;

        if (!ObjectId.isValid(id))
        {
            return res.status(422).json({message: "Id inválido!"});
        }
        try
        {
            const livro = await Livro.findById(id);
            if (!livro)
            {
                return res.status(404).json({message: "Livro não encontrado!"})
            }

            livro.quantidadeEstoque = livro.quantidadeEstoque + 1;
            await livro.save();
            res.status(200).json(livro);
        } 
        catch (error) 
        {
            res.status(500).json({message: "Erro ao buscar um livro!", error});
        }
    }//fim do adquireOne


    static async updateAll(req, res){
        const id = req.params.id;
        const{titulo, autor, isbn, anoPublicacao, quantidadeEstoque} = req.body;
        
        const ObjectId = Types.ObjectId;
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador de livro inválido"});
            return
        }
        if(!titulo || !autor || !isbn){
            return res.status(422).json({message:"Todos os dados são obrigatórios"});
        }
        const updateData = {
            titulo,
            autor,
            isbn,
            anoPublicacao,
            quantidadeEstoque,

        };
        try {
            const updateLivro = await Livro.findByIdAndReplace(id, updateData,{
                new:true, runValidators:true
            });
            if(!updateLivro){
                return res.status(404).json({message:"Livro para alteração não encontrado"});
            }
            return res.status(200).json({message:"Livro alterada com sucesso",livro:updateLivro })
        } catch (error) {
            res.status(500).json({message:"Problema ao alterar um livro", error});
        }
    }//fim do updateAll

    static async updatePartial(req, res){
        const id = req.params.id;
        const{situacao} = req.body;
        
        const ObjectId = Types.ObjectId;
        
        if(!ObjectId.isValid(id)){
            res.status(422).json({message:"Identificador do livro inválido"});
            return
        }
        if(!isbn){
            return res.status(422).json({message:"Autor não informado"});
        }
        console.log(id);
        try {
            const updateIsbn = await Livro.findByIdAndUpdate(id, {isbn},{
                new:true, runValidators:true
            });
            if(!updateIsbn){
                return res.status(404).json({message:"Livro para alteração da Isbn não foi encontrado"});
            }
            return res.status(200).json({message:"Isbn do Livro alterado com sucesso",livro:updateIsbn })
        } catch (error) {
            res.status(500).json({message:"Problema ao alterar o Isbn do livro", error});
        }
    }//fim do updatePartial


    static async updateFull(req, res){
        try 
        {
            const id = req.params.id;
            const {titulo, autor, isbn, anoPublicacao, quantidadeEstoque} = req.body;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
            {
                return res.status(422).json({message: "Id inválido"});
            }

            if (!titulo || !autor || !isbn)
            {
                return res.status(422).json({message: "Por favor, verifique os campos obrigatórios!"});
            }

            const updateData = {
                titulo,
                autor,
                isbn,
                anoPublicacao,
                quantidadeEstoque
            }

            const updatedLivro = await Livro.findByIdAndUpdate(id, updateData, {new: true});

            if (!updatedLivro)
            {
                return res.status(404).json({message: "Livro não encontrado!"})
            }

            return res.status(200).json({message: "Livro alterado com sucesso", updatedLivro});
        } 
        catch (error) 
        {
            return res.status(500).json({message: "Erro ao buscar um livro", error});
        }
    }//fim do updateFull
}