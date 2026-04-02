import mongoose from "../db/conn.js";
const {Schema} = mongoose;
const LivroSchema = new Schema({
    titulo:{
        type:String,
        required:true,
    },
    autor:{
        type:String,
        required:true,
    },
    isbn:{
        type:String,
        required:true,
    },
    anoPublicado:{
        type:Number
    },
    quantidadeEstoque:{
        type:Number,
        default:0
    }
},{timestamps:true});
const Livro = mongoose.model("Livro", LivroSchema);
export default Livro;