import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import { getOne, updateAll } from "../api/TodoApi";

export default function TodoEdit(){
    const[titulo, setTitulo] = useState("");
    const[descricao, setDescricao] = useState("");
    const[dataLimite, setDataLimite] = useState("");
    const[situacao, setSituacao] = useState("");
    const[saving, setSaving] = useState(false);
    //todo guarda a tarefa retornada getOne
    //const[todo, setTodo] = useState(null);
    const[loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const {id} = useParams();
    useEffect(()=>{
        if(id){
            getOne(id)
            .then((res)=>{
                const data = res.data.tarefa;
                //setTodo(data);
                setTitulo(data.titulo);
                setDescricao(data.descricao);
                setSituacao(data.situacao);
                if(data.dataLimite){
                setDataLimite(new Date(data.dataLimite).toISOString().split("T")[0]);
                }
                setLoading(false);
                console.log("carregou");
            })
            .catch((err)=>{
                // Isso vai te dizer se o erro é 404 (ID não achou nada) ou 500 (Erro no servidor)
    console.log("Erro completo do Axios:", err.response); 
    
    // Verifique se o ID que chegou aqui é o que você esperava
    console.log("Tentou buscar o ID:", id); 

    alert("Erro na API: " + (err.response?.data?.message || err.message));
    navigate("/");
            })
        }
    },[id, navigate])
    const handleSubmit = async(e)=>{
        e.preventDefault()
        setSaving(true);
        try {
            await updateAll(id, {titulo, descricao, dataLimite, situacao});
            navigate("/");
        } catch (error) {
            console.log("Erro ao alterar a tarefa:" + (error.message || "Erro"));
        }
        finally{
            setSaving(false);
        }
    }   
    if (loading) {
        return <div className="p-4 text-center">Carregando dados da tarefa...</div>;
    }
    return(
        <form onSubmit={handleSubmit} className = "space-y-4">
            <input type="hidden" value={situacao}/>
            <div>
                <label className="block text-sm">Título</label>
                <input required value={titulo} onChange={e=>setTitulo(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
                <label className="block text-sm">Descrição</label>
                <textarea required value={descricao} onChange={e=>setDescricao(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>
            <div>
                <label className="block text-sm">Data Limite</label>
                <input required value={dataLimite} onChange={e=>setDataLimite(e.target.value)} type="date" className="w-full border rounded px-3 py-2"/>
            </div>
            <div className="flex itens-center gap-3">
                <button disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">
                    {saving?"Alterando....":"Alterar"} 
                </button>
                <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">
                    Cancelar
                </button>
            </div>
        </form>
    )
}