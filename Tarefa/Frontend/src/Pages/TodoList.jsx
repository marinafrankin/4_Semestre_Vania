import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import LivroItem from "../Components/LivroItem";
import {getLivros, updatePartial} from "../api/LivroApi";

export default function LivroList(){
    const [livros, setLivros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchLivro = async()=>{
        try {
            setLoading(true);
            const res = await getLivros();
            setLivros(res.data.tarefas)
        } catch (err) {
            setError(err.message || "Erro ao buscar livros");
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{fetchLivro()}, []);

    const handleEnd = async (id)=>{
        try {
            await updatePartial(id);
            //Após a alteração da situação no BD, 
            // é alterada a situacao na lista sem buscar novamente no BD
            setLivros(prevLivros=>prevLivros.map(livro=>livro._id === id?
                {...livro}:livro));
            

        } catch (error) {
            console.error("Não foram encontrados livros para o autor", error);
        }
    }

    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <Link to='/new' className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2">Nova Livro</Link>

            </div>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <div className="space-y-3">
                {livros?.length === 0 && !loading?(
                    <p className="text-gray-500">Nenhum Livro encontrado!</p>
                ):(
                    livros?.map(livro=>(
                        <TodoItem 
                            key={livro._id}
                            livro = {livro}
                            onEnd={()=> handleEnd(livro._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}