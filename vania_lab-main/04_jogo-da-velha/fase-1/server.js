import { WebSocketServer } from "ws";
import { createServer } from "http";
import { readFile } from "fs";
import { join } from "path";

// servidor HTTP
const server = createServer((req, res)=>{
    readFile(join("public", "index.html"), (err, data) =>{ // auxilia no encontro do caminho do arquivo em todos os sistemas operacionais (usando public/index.html ou public\index.html)
        if (err) 
        {
            res.writeHead(500);
            return res.end("Erro ao carregar o index.html");
        }

        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    });
});

// servidor WebSocket - jogo da velha
const wss = new WebSocketServer({server});
let currentPlayer = "X";
let board = Array(9).fill(null);
let gameActive = true;
const players = [];

function broadCast(data) // função para enviar mensagens para todos os usuarios no jogo
{
    wss.clients.forEach(client => {     // vai percorrer os clients
        if(client.readyState == client.OPEN)    // se estiver conectado, executa aqui
        {
            client.send(JSON.stringify(data));
        }
    })
};

function checkWin(board, symbol) // função para verificar se há vencedores na rodada
{
    const winConditions = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas vertificais
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // linhas horizontais
        [0, 4, 8], [2, 4, 6] // linhas diagonais
    ];

    // a função some verifica as situações dadas, a função every verifica cada um dos índices
    return winConditions.some(condition => condition.every(index => board[index] == symbol));
};

// verificando conexão dos jogadores - criando objeto 'ws' com todas as informações de cada jogador que conectou no jogo
wss.on("connection", (ws)=>{    
    if(players.length < 2)
    {
        // jogadores
        const symbol = players.length == 0 ? "X" : "O";  // se for o primeiro jogador será "X" e se for o segundo será o "O"
        players.push({ws, symbol}); // atribuindo o simbolo ao jogador
        ws.send(JSON.stringify({type: "assign", symbol}));
    }
    else 
    {
        // telespectadores
        ws.send(JSON.stringify({type: "assign", symbol: null}));
    }


// mostrar o estado atual do jogo para os jogadores
ws.send(JSON.stringify({type: "state", board, currentPlayer, gameActive}))

// verificando se alguém saiu do jogo (fechou a conexão)
ws.on("close", ()=>{
    // procurar quem se desconectou
    const index = players.findIndex(p => p.ws === ws);
    if(index !== -1)
    {
        // remover o jogador que se desconectou
        players.splice(index, 1);
        currentPlayer = "X";
        gameActive = true;
        board = Array(9).fill(null);
        broadCast({type: "gameOver", board, currentPlayer, gameActive, reason: "disconnect"})
        broadCast({type: "state", board, currentPlayer, gameActive})
    }
});

// verificando as jogadas, com a mensagem que foi transformada em JSON
ws.on("message", (msg)=>{
    const data = JSON.parse(msg);    // destransformando a mensagem

    // se o tipo for restart, reiniciará o jogo
    if(data.type === "restart")
    {
        board = Array(9).fill(null);
        currentPlayer = "X";
        gameActive = true;
        broadCast({type: "state", board, currentPlayer, gameActive});
        return;
    };

    // verificando se o jogo está ativo ou não
    if(!gameActive)
    {
        return;
    }

    if(data.type == "play")
    {
        const{index, symbol} = data; // descontrução para evitar usar "data.x"
        const player = players.find(p => p.ws === ws);

            // se encontrou jogador ou se o símbolo do jogador for diferente 
            if(!player || player.symbol !== symbol)
            {
                return;
            }

            // verificando se a casa do tabuleiro está vazia
            if(symbol === currentPlayer && board[index] == null)
            {
                // preenchendo a casa com o respectivo símbolo
                board[index] = symbol;
            

            // verificando se há vencedor
            if(checkWin(board, symbol))
            {
                broadCast({type: "gameOver", winner: symbol, board});
                gameActive = false;
                currentPlayer = null;
            }   
            // verificando se ainda há casas disponíveis no tabuleiro
            else if(board.every(cell => cell !== null)) 
            {
                broadCast({type: "gameOver", winner: null, board});
                gameActive = false;
                currentPlayer = null;
            }
            // mudando a vez após o player jogar
            else 
            {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                broadCast({type: "play", index, symbol, next: currentPlayer, board});
            }
        }}
    });
});

server.listen(3000, () => console.log("Jogo da velha rodando em http://localhost:3000"));