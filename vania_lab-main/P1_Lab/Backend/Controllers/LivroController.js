import Livro from "../Models/Livro.js";
import { Types } from "mongoose";

export default class livroController
{
    static async create(req, res){
        const {titulo, autor, isbn, ano_publicacao, quantidade_estoque} = req.body;

        if (!titulo) return res.status(422).json({message: "Por favor, informe um título!"});
        if (!autor) return res.status(422).json({message: "Por favor, informe um autor!"});
        if (!isbn) return res.status(422).json({message: "Por favor, informe um isbn!"});
        if (!ano_publicacao) return res.status(422).json({message: "Por favor, informe um ano de publicação!"});
        if (!quantidade_estoque) return res.status(422).json({message: "Por favor, informe a quantidade disponível no estoque!"});

        const livro = new Livro({
            titulo,
            autor,
            isbn,
            ano_publicacao,
            quantidade_estoque
        })

        try
        {
            const novoLivro = await livro.save();
            res.status(201).json({message: "Livro inserido com sucesso!", novoLivro});
        }
        catch (error)
        {
            res.status(400).json({message: "Não foi possível inserir o livro."});
        }
    }

    static async getAll(req, res){
        try 
        {
            const livros = await Livro.find({}).sort("-createdAt");
    
            res.status(200).json({livros});
        } 
        catch (error) 
        {
            res.status(500).json({message:"Erro ao buscar todos os livros!", error});
        }
    }

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
    }

    static async remove(req, res){
        const id = req.params.id;
        const ObjectId = Types.ObjectId;

        if(!ObjectId.isValid(id))
        {
            return res.status(422).json({message: "Id inválido!"});
        }

        try 
        {
            const livro = await Livro.findOne({_id: id});
            
            if (!livro)
            {
                return res.status(404).json({message: "Livro não encontrado!"});
            }

            await Livro.findByIdAndDelete(id);
            res.status(200).json({message: "Livro removido com sucesso!"});
        } 
        catch (error) 
        {
            res.status(500).json({message: "Erro ao remover o livro!"});
        }
    }

    static async getOne(req, res){
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

            res.status(200).json(livro);
        } 
        catch (error) 
        {
            res.status(500).json({message: "Erro ao buscar um livro!", error});
        }
    }

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

            livro.quantidade_estoque = livro.quantidade_estoque + 1;
            await livro.save();

            res.status(200).json(livro);
        } 
        catch (error) 
        {
            res.status(500).json({message: "Erro ao buscar um livro!", error});
        }
    }

    static async updatePartial(req, res){
        try 
        {
            const id = req.params.id;
            const {quantidade_estoque} = req.body;
            const ObjectId = Types.ObjectId;

            if (!ObjectId.isValid(id))
            {
                return res.status(422).json({message: "Id inválido!"});
            }

            if (!quantidade_estoque)
            {
                return res.status(422).json({message: "A quantidade do estoque não foi informada!"});
            }

            const updatedLivro = await Livro.findByIdAndUpdate(id, {quantidade_estoque}, {new: true});

            if (!updatedLivro)
            {
                return res.status(404).json({message: "Livro não encontrado!"})
            }

            return res.status(200).json({message: "A quantidade do estoque foi alterada com sucesso!", updatedLivro});
        } 
        catch (error) 
        {
            return res.status(500).json({message: "Erro ao buscar um livro", error});
        }
    }

    static async updateFull(req, res){
        try 
        {
            const id = req.params.id;
            const {titulo, autor, isbn, ano_publicacao, quantidade_estoque} = req.body;
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
                ano_publicacao,
                quantidade_estoque
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
    }
}