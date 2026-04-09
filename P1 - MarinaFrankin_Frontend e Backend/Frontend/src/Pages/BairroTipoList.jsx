import { useState } from "react";
import { getBairroPorTipo } from "../api/BairroApi";

export default function FindPorTipo() {
  const [tipo, setTipo] = useState("");
  const [bairros, setBairros] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false)

  const handleSearch = async () => {
    if (!tipo.trim()) {
      setError("Por favor, digite o tipo de reclamação !");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSearched(true);
      const res = await getBairroPorTipo(tipo);
      setBairros(res.data.bairros);
    } 
    catch (erro) {
      setBairros([]);
      setError("Erro ao buscar reclamações por tipo!");
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1><strong>Pesquisar por Tipo</strong></h1>
      <label>Digite o tipo de reclamação: </label>
      <input type="text" value={tipo} onChange={(e) => setTipo(e.target.value)} className="border p-2 mx-2"/>
      <button onClick={handleSearch} className="bg-blue-500 text-white px-3 py-1 rounded">Buscar</button>

      {loading && <p>Carregando...</p>}
      {error && <p className="text-red-500">{error}</p>}

       {searched && !loading && bairros.length === 0 && !error && (
          <div>
            <p className="text-red-500">Nenhuma reclamação encontrada para o tipo "{tipo}"!</p>
          </div>
        )}

      {bairros.length > 0 && (
        <ul className="mt-4">
          {bairros.map((bairro) => (
            <li key={bairro._id}>
              <strong>{bairro.tipo}</strong> — {bairro.descricao}.
              <br></br> 
              <strong>Relato feito por: </strong> {bairro.morador}
              <br></br>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}