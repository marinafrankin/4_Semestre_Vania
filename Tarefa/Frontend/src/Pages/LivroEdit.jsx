import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOne, updateCompleto } from "../api/LivroApi";

export default function LivroEdit() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    isbn: "",
    anoPublicacao: "",
    quantidadeEstoque: ""
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);

  useEffect(() => {
    const fetchLivro = async () => {
      try {
        setLoading(true);
        const res = await getOne(id);

        setFormData({
          titulo: res.data.titulo || "",
          autor: res.data.autor || "",
          isbn: res.data.isbn || "",
          anoPublicacao: res.data.anoPublicacao || "",
          quantidadeEstoque: res.data.quantidadeEstoque || ""
        });
      } 
      catch (erro) {
        setError("Erro ao/em carregar dados do livro!");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchLivro();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccessMsg(null);

    try {
      await updateCompleto(id, formData);
      setSuccessMsg("Livro atualizado com sucesso !");
      setTimeout(() => navigate("/"), 1500);
    } 
    catch (erro) {
      setError("Erro ao atualizar o livro !");
    } 
    finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando dados do livro...</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl mb-4"><strong>Editar Livro</strong></h1>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {successMsg && <p className="text-green-500 mb-2">{successMsg}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Título:</label>
          <input required type="text" name="titulo" value={formData.titulo} onChange={handleChange} className="w-full border p-2"/>
        </div>

        <div>
          <label className="block mb-1">Autor:</label>
          <input required type="text" name="autor" value={formData.autor} onChange={handleChange} className="w-full border p-2"/>
        </div>

        <div>
          <label className="block mb-1">ISBN: </label>
          <input required type="text" name="isbn" value={formData.isbn} onChange={handleChange} className="w-full border p-2"/>
        </div>

        <div>
          <label className="block mb-1">Ano de Publicação:</label>
          <input required type="number" name="anoPublicacao" value={formData.anoPublicacao} onChange={handleChange} className="w-full border p-2"/>
        </div>

        <div>
          <label className="block mb-1">Quantidade de Estoque:</label>
          <input required type="number" name="quantidadeEstoque" value={formData.quantidadeEstoque} onChange={handleChange} className="w-full border p-2"/>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Salvar</button>
          <button type="button" onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Cancelar</button>
        </div>
      </form>
    </div>
  );
}
