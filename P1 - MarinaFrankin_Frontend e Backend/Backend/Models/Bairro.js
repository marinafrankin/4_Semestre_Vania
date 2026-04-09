import mongoose from "../db/conn.js";
const {Schema} = mongoose;
const BairroSchema = new Schema({
    titulo:{
        type:String,
        required:true,
    },
    descricao:{
        type:String,
        required:true,
    },
    morador:{
        type:String,
        required:true,
    },
    data_reclamacao  :{
        type:String,
        required:true,
    },
    tipo:{
        type:String,
        required:true,
    }
},{timestamps:true});
const Bairro = mongoose.model("Bairro", BairroSchema);
export default Bairro;