import mongoose from "mongoose";

async function main()
{
    // await mongoose.connect("mongodb://localhost:27017/ToDo")
    await mongoose.connect("mongodb://127.0.0.1:27017/ToDo");
    console.log("conectou mongoose")
}

// se não conseguir fazer a conexão na Main, entra aqui
main().catch((err => console.log(err)));

// exportando o mongoose para usar em outros lugares mais facilmente
export default mongoose;