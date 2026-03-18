import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import { getLivros, adquireOne, deleteLivro } from "../../api/livroapi.js";
import { Link } from "react-router-dom";
import LivroItem from "../Components/LivroItem.jsx";

export default function Home() {
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetch = async () => {
        try {
            setLoading(true);

            const res = await getLivros();
            setLivros(res.data.livros);
        }
        catch (erro) {
            setError(erro.message || "Erro");
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetch();
    }, []);

    const handleEdit = async (id) => {
        navigate(`/edit/${id}`);
    };

    const handleAdquire = async (id) => {
    try {
      const res = await adquireOne(id);
      const livroAtualizado = res.data;

      setLivros(prev =>
        prev.map(l => (l._id === id ? livroAtualizado : l))
      );
    } 
    catch (erro) {
      console.error(erro);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLivro(id);
      setLivros(prev => prev.filter(livro => livro._id !== id));
    }
    catch (erro)
    {
      console.error(erro);
    }
  }

  return(
    <div className="flex flex-col justify-center">
      <div className="max-w-2xl mx-auto pt-8 px-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Todos os Livros</h2>
      </div>

      {loading && <p>Carregando...</p>}
      {error && <p>{error}</p>}

      <div className="w-full flex gap-8">
        {livros?.length === 0 && !loading ? (
          <p className="text-red-500">Nenhum livro encontrado!</p>
        ) : (
          livros?.map(livro => (
            <LivroItem
              key = {livro._id}
              livro = {livro}
              onEdit = {() => handleEdit(livro._id)}
              onAdquire={() => handleAdquire(livro._id)}
              onDelete={() => handleDelete(livro._id)}
            />
          ))
        )}
      </div>
    </div>
    )
}