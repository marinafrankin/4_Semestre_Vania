import React from "react";
export default function BairroItem({bairro, onDelete }){
    return(
        <div className="flex flex-col sm:flex-row sm:items-center 
            sm:justify-between p-3 border rounded hover:shadow-sm" >
                <div>
                    <div className="font-medium">{bairro.titulo}</div>
                    <div className="text-sm">Tipo:{bairro.tipo}</div>
                    <div className="font-medium">{bairro.descricao}</div>
                    <div className="text-sm text-gray-600">{bairro.morador}</div>
                    <div className="text-sm">Data de reclamação:{bairro.data_reclamacao}</div>
                </div>
      </div>
    );
}