import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import { createLivro } from "../api/LivroApi";

export default function LivroForm(){
    const[titulo, setTitulo] = useState("");
    const[autor, setAutor] = useState("");
    const[isbn, setIsbn] = useState("");
    const[anoPublicacao, setAnoPublicado] = useState(0);
    const[quantidadeEstoque, setQuantidadeEstoque] = useState(0);
    const[saving, setSaving] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async(e)=>{
        e.preventDefault()
        setSaving(true);
        try {
            await createLivro({titulo, autor, isbn, anoPublicacao, quantidadeEstoque});
            navigate("/");
        } catch (error) {
            console.log("Erro ao criar livro:" + (error.message || "Erro"));
        }
        finally{
            setSaving(false);
        }
    }   

    return(
        <form onSubmit={handleSubmit} className = "space-y-4">
            <div>
                <label className="block text-sm">Título</label>
                <input required value={titulo} onChange={e=>setTitulo(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Autor</label>
                <input required value={autor} onChange={e=>setAutor(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Isbn</label>
                <input required value={isbn} onChange={e=>setIsbn(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Quantidade</label>
                <input required type="number" value={quantidadeEstoque} onChange={e=>setQuantidadeEstoque(e.target.value)} className="w-full border rounded px-3 py-2"/>
            </div>

            <div>
                <label className="block text-sm">Ano de Publicação</label>
                <input required type="number" value={anoPublicacao} onChange={e=>setAnoPublicado(e.target.value)} className="w-full border rounded px-3 py-2"/>
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