import fs from "fs";

export default function lerArquivo(nome)
{
    fs.readFile(`${nome}`, "utf-8", (err, data)=> { // 'callback' é quando dentro de uma função é passada como argumento uma outra função
        if(err)
        {
            console.log("Erro ao ler o arquivo", err);

            return;
        }

        console.log("Dados do arquivo: ", data);
    } ); 
}