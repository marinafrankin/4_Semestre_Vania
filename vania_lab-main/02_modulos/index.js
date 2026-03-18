import chalk from "chalk";
import {soma} from "./math.js"; // é necessário a extensão do arquivo
import subtracao from "./math.js";
import lerArquivo from "./arquivo.js";

const sum = soma(10, 5);
console.log(chalk.blue.bold(`A soma é: ${sum} \n`));

const sub = subtracao(10, 5);
console.log(chalk.red.bold(`A subtração é: ${sub} \n`));

lerArquivo("dados.txt");