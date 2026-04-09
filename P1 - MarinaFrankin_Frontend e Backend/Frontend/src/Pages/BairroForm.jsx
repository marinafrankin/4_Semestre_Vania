import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { createBairro } from "../api/BairroApi";

export default function BairroForm(){
    const[titulo, setTitulo] = useState("");
    const[descricao, setDescricao] = useState("");
    const[morador, setMorador] = useState("");
    const[data_reclamacao, setDataReclamacao] = useState(0);
    const[tipo, setTipo] = useState("");
    const[saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setSaving(true);
        try {
            await createBairro({titulo, descricao, morador, data_reclamacao, tipo});
            navigate("/");
        } catch (error) {
            console.log("Erro ao criar reclamação de bairro:" + (error.message || "Erro"));
        }
        finally{
            setSaving(false);
        }
    }   

    return(
        <form onSubmit={handleSubmit} className = "space-y-4">
            <div>
                <label className="block text-sm">Título:</label>
                <input required value={titulo} onChange={e=>setTitulo(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Tipo de reclamação:</label>
                <input required value={tipo} onChange={e=>setTipo(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Descrição da reclamação:</label>
                <input required value={descricao} onChange={e=>setDescricao(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Morador:</label>
                <input required value={morador} onChange={e=>setMorador(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Data da Reclamação:</label>
                <input required type="date" value={data_reclamacao} onChange={e=>setDataReclamacao(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div className="flex itens-center gap-3">
                <button disabled={saving} className="px-4 py-2 bg-green-600 text-white rounded">
                    {saving?"Salvando....":"Salvar"} 
                </button>
                
                <button type="button" onClick={()=>navigate(-1)} className="px-4 py-2 border rounded">
                    Cancelar
                </button>
            </div>
        </form>
    )
}