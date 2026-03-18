import mongoose from "../db/conn.js";

const { Schema } = mongoose;

// Schema é para definir atributos
const tarefaSchema = new Schema({
    titulo: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    dataLimite: {
        type: Date,
        required: true
    },
    situacao: {
        type: String,
        required: true
    }
}, {timestamps: true}) // timestamps é o tempo em que foi criado um registro no banco - createdAt

const Tarefa = mongoose.model("Tarefa", tarefaSchema);

export default Tarefa;