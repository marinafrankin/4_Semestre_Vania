
import chalk from "chalk";
import ler from "./arquivo.js";
import soma from "./math.js";
import { subtracao } from "./math.js";

const re1 = soma(2,4);
console.log(chalk.green.bold(`A soma: ${re1}`));

const re2 = subtracao(2,4);
console.log(chalk.green.bold(`A subtracao: ${re2}`));
ler();