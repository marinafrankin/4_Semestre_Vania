import {readFile, readFileSync} from "fs";
import {readFile as readFilePromise} from "fs/promises"; // apelidando para diferenciá-lo

// Síncrono
console.log("Iniciando leitura síncrona");
const sincro = readFileSync("dados.txt", "utf-8");
console.log("Leitura síncrona terminou: " + sincro);

// Callback (função como parâmetro da função)
console.log("Iniciando leitura callback");
readFile("dados.txt", "utf-8", (err, conteudo)=>{
    if(err) 
    {
        console.error("Erro ao ler o arquivo (callback): " + err);
        return
    }

    console.log("Callback terminou: " + conteudo);
})

// Promise
console.log("Iniciando leitura promises");
readFilePromise("dados.txt", "utf-8")
.then(conteudo => console.log("Promise terminou: " + conteudo)) // se não der erro, executa aqui
.catch(erro => console.log("Erro no promise: " + erro)); // se der erro, executa aqui

// Async / Await
console.log("Iniciando a leitura async/await");
async function ler()
{
    try {
        const conteudo = await readFilePromise("dados.txt", "utf-8");
        console.log("Terminou async/await: ", conteudo);    
    } 
    catch (err) {
        console.log("Erro no async/await: ", err);
    }
}

ler();
console.log("Terminou tudo");