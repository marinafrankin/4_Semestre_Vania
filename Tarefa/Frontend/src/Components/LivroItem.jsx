import React from "react";
export default function LivroItem({livro, onEnd, onEdit, onAdquire, onDelete }){
    return(
        <div className="flex flex-col sm:flex-row sm:items-center 
            sm:justify-between p-3 border rounded hover:shadow-sm" >
                <div>
                    <div className="font-medium">{livro.titulo}</div>
                    <div className="font-medium">{livro.autor}</div>
                    <div className="text-sm text-gray-600">{livro.isbn}</div>
                    <div className="text-sm">Ano Publicado:{livro.anoPublicacao}</div>
                    <div className="text-sm">Estoque:{livro.quantidadeEstoque}</div>
                </div>
                
                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                        <button onClick={onEdit} 
                        className="text-sm px-2 py-1 bg-green-600 text-white rounded">
                            Editar
                        </button>

                        <button onClick={onAdquire} 
                        className="text-sm px-2 py-1 bg-blue-600 text-white rounded">
                            Adquirir
                        </button>

                        <button onClick={onDelete} 
                        className="text-sm px-2 py-1 bg-red-600 text-white rounded">
                            Deletar
                        </button>
                </div>

               
      </div>
    );
}