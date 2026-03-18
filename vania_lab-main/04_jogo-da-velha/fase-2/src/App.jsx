// useEffect controla 'efeitos colaterais', como abrir uma conexão com o servidor, para funcionamento de comunicação entre APIs
// useState controla os estados
import { useState, useEffect } from 'react'
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import {ToastContainer, toast} from "react-toastify";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";


function checkWin(board)
{
  const winConditions = [
      [0,1,2], [3,4,5],[6,7,8],
      [0,3,6], [1,4,7],[2,5,8],
      [0,4,8], [2,4,6] ];
  
  // percore o array de lista de possibilidades e atribui cada número do array a uma letra (0, 1, 2 = a, b, c)
  const winnerLine = winConditions.find(([a, b, c]) => 
    board[a] && board[a] === board[b] && board[a] === board[c]);

  // finaliza aqui caso haja vencedores e retorna o vencedor (O ou X)
  if (winnerLine) return board[winnerLine[0]];

  // finaliza aqui caso haja empate e retorna 'empate' - o every verifica todas as possibilidades
  if (board.every(bo => bo !== null)) return "draw";

  // retorna null se não há vencedores nem empate ainda
  return null;
}

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [mySymbol, setMySymbol] = useState(null);
  const [scores, setScores] = useState({x: 0, o: 0, draw: 0});
  const [ws, setWs] = useState(null); // Incluindo

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setWs(socket);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // verificando assign
      if (data.type === "assign")
      {
        if (!data.symbol) 
        { 
          toast.success("Você é um espectador e não pode jogar"); 
        }
        else 
        {
          setMySymbol(data.symbol);
          toast.success(`Você é o jogador ${data.symbol}`);
        }
      }

      // verificando info
      if (data.type === "info")
      {
        toast.info(data.message);
      }

      // verificando update - atualizar por jogadas
      if (data.type === "update")
      {
        setBoard(data.board);
        setCurrentPlayer(data.next);
        const winner = checkWin(data.board);

        if (winner)
        {
          if (winner === "draw")
          {
            // o spread envia as propriedades de um objeto para outro objeto, como se estivesse descompactando
            // adicionando +1 de score
            setScores(prevScores => ({...prevScores, draw: prevScores.draw + 1}));
          }
          else 
          {
            setScores(prevScores => ({...prevScores, [winner]: prevScores[winner] + 1}));
          }
        }
      }

      // verificando restart
      if (data.type === "restart")
      {
        setBoard(data.board);
        setCurrentPlayer(data.next);
      }
    }
    return() => socket.close();
  }, [])

  // Reagir e atualizar a exibição
  const winner = checkWin(board);
  const handlePlay = (index) => {
    if (ws && ws.readyState === 1 && !board[index] && !checkWin(board))
    {
      ws.send(JSON.stringify({type:"play", index, symbol:mySymbol}));
    }
  }

  const handleRestart = () => {
    if(ws && ws.readyState === 1)
    {
      ws.send(JSON.stringify({type: "restart"}));
    }
  }

  return(
    <div className="game">
      <h1>Jogo da Velha</h1>

      <Scoreboard scores={scores} />
      <Board 
        board={board}
        onPlay={handlePlay}
        disabled={!!winner || currentPlayer !== mySymbol}
        />

        {winner && (
          <div className="game-status">
            <p>
              {winner === "draw" ? "Empate":`Vencedor: ${winner}`}
            </p>
            <button onClick={handleRestart}>Jogar Novamente</button>
          </div>
        )}
        <ToastContainer position="top-center" autoClose={4000}/>
    </div>
  );
}

export default App
