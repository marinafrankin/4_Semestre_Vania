import mongoose from "../Db/conn.js";

const { Schema } = mongoose;

const livroSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    autor: {
        type: String,
        required: true
    },
    isbn: {
        type: String,
        required: true
    },
    ano_publicacao: {
        type: Number,
        required: true
    },
    quantidade_estoque: {
        type: Number,
        required: true
    }
}, {timestamps: true})

const Livro = mongoose.model("Livro", livroSchema);

export default Livro;