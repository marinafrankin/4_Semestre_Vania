import { useState } from "react";
import { getLivrosPorAutor } from "../../api/livroapi.js";

export default function FindByAuthor() {
  const [autor, setAutor] = useState("");
  const [livros, setLivros] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
   const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!autor.trim()) {
      setError("Por favor, digite o nome do autor!");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const res = await getLivrosPorAutor(autor);
      setLivros(res.data.livros);
    } 
    catch (erro) {
      setLivros([]);
      setError("Erro ao buscar livros por autor!");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1><strong>Pesquisar por Autor</strong></h1>
      <label>Digite o nome do autor: </label>
      <input type="text" value={autor} onChange={(e) => setAutor(e.target.value)} className="border p-2 mx-2"/>
      <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">Buscar</button>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

       {searched && !loading && livros.length === 0 && !error && (
          <div>
            <p className="text-red-500">Nenhum livro encontrado para o autor "{autor}"!</p>
          </div>
        )}

      {livros.length > 0 && (
        <ul className="mt-4">
          {livros.map((livro) => (
            <li key={livro._id}>
              <strong>{livro.titulo}</strong> — {livro.autor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}