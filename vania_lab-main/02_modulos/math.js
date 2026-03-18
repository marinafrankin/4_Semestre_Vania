export function soma(x, y) // quando importar a soma, será obrigado colocá-la entre chaves, por não ter 'default'
{
    console.log(`Somando ${x} + ${y}...`);

    return x + y;
}

export default function subtracao(x, y) // quando importar a subtração com 'default', não precisa colocá-la entre chaves
{
    console.log(`Subtraindo ${x} - ${y}...`);

    return x - y;
}

