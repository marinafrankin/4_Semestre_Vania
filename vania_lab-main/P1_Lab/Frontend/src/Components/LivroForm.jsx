import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./LivroForm.module.css";

export default function LivroForm({ initialData, onSubmit }) {
    const [formData, setFormData] = useState(initialData || {
        titulo: "",
        autor: "",
        isbn: "",
        ano_publicacao: null,
        quantidade_estoque: 1
    }); 

    const navigate = useNavigate();

    useEffect(() => {
        if (initialData) {
            setFormData(initialData)
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({...prevData, [name]: value}));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className={Style.form}>
            <div>
                <label className={Style.formLabel}>Título</label>
                <input required name="titulo" value={formData.titulo} onChange={handleChange} className={Style.formInput}/>
            </div>

            <div>
                <label className={Style.formLabel}>Autor</label>
                <input required name="autor" value={formData.autor} onChange={handleChange} className={Style.formInput}/>
            </div>

            <div>
                <label className={Style.formLabel}>ISBN</label>
                <input required name="isbn" value={formData.isbn} onChange={handleChange} className={Style.formInput}/>
            </div>

            <div>
                <label className={Style.formLabel}>Ano de Publicação</label>
                <input type="number" required name="ano_publicacao" value={formData.ano_publicacao || ''} onChange={handleChange} className={Style.formInput}/>
            </div>

            <div>
                <label className={Style.formLabel}>Quantidade em Estoque</label>
                <input type="number" required name="quantidade_estoque" value={formData.quantidade_estoque} onChange={handleChange} className={Style.formInput}/>
            </div>

            <div className={Style.botoes}>
                <button type="submit" className={Style.salvar}>Criar</button>
                <button type="button" onClick={() => navigate(-1)} className={Style.cancelar}>Cancelar</button>
            </div>
        </form>
    );
}