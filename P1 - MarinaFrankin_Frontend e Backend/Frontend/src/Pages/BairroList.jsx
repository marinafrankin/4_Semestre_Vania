import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import BairroItem from "../Components/BairroItem";
import {getBairros, deleteBairro} from "../api/BairroApi";

export default function BairroList(){
    const [bairros, setBairros] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchBairro = async()=>{
        try {
            setLoading(true);
            const res = await getBairros();
            setBairros(res.data.bairros);
            
        } catch (err) {
            setError(err.message || "Erro ao buscar reclamações");
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{fetchBairro()}, []);

    const handleEnd = async (id)=>{
        try {
            await updatePartial(id);
            setBairros(prevBairros=>prevBairros.map(bairro=>bairro._id === id?
                {...bairro}:bairro));
            

        } catch (error) {
            console.error("Não foram encontradas reclamações por tipo", error);
        }
    }

    const handleDelete = async (id) => {
        try {
            await deleteBairro(id);
            setBairros(prevBairros => prevBairros.filter(bairro => bairro._id !== id));
        } catch (error) {
            console.error("Erro ao deletar a reclamações", error);
        }
    };
    
    return(
        <div>
            <div className="max-w-2xl mx-auto pt-8 px-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Todas as reclamações</h2>
            </div>
            
            <div className="flex items-center justify-between mb-4">
                <Link to='/new' 
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                                text-white text-sm font-medium rounded-lg shadow-sm 
                                transition-all flex items-center gap-2">Nova Reclamação</Link>

                <Link to='/buscarPorTipo'
                    className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 
                                text-white text-sm font-medium rounded-lg shadow-sm 
                                transition-all flex items-center gap-2">Buscar por Tipo</Link>
            </div>
            
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <div className="space-y-3">
                {bairros?.length === 0 && !loading?(
                    <p className="text-gray-500">Nenhuma reclamação encontrada!</p>
                ):(
                    bairros?.map(bairro=>(
                        <BairroItem
                            key={bairro._id}
                            bairro = {bairro}
                            onEnd={()=> handleEnd(bairro._id)}
                            onDelete={() => handleDelete(bairro._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}