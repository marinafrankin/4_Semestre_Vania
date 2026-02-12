
//Chalk é um módulo externo (instalado)
import chalk from "chalk";

//fs é um módulo nativo (não precisa instalar)
import fs from "fs";


export default function ler(){
    fs.readFile("dados.txt", "utf-8", (err, data)=>{
        if(err)
        {
            //Interpolação
            console.log(chalk.red(`Deu erro na leitura do arquivo: ${err}`));
            return;
        }

        //concatenação
        console.log(chalk.blue("Dados do arquivo:" + data));


    });
}