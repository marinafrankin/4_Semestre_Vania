import Style from "./LivroItem.module.css";

export default function LivroItem({ livro, onEdit, onAdquire, onDelete }) {
  return (
    <div className={Style.mainDiv}>
      <div>
        <div className={Style.tituloStyle}>{livro.titulo}</div>
        <div className={Style.propStyle}><span className={Style.spanStyle}>Autor: </span>{livro.autor}</div>
        <div className={Style.propStyle}><span className={Style.spanStyle}>Isbn: </span>{livro.isbn}</div>
        <div className={Style.propStyle}><span className={Style.spanStyle}>Ano de Publicação: </span>{livro.ano_publicacao}</div>
        <div className={Style.propStyle}><span className={Style.spanStyle}>Quantidade de Estoque: </span>{livro.quantidade_estoque}</div>
      </div>

      <div className="flex pt-6 gap-3">
        <div>
          {
            <button onClick={onEdit} className={Style.editar}>Editar</button>
          } 
        </div>
        <div>
          { 
            <button onClick={onAdquire} className={Style.adquirir}>Adquirir 1</button> 
          } 
        </div>
        <div>
          { 
            <button onClick={onDelete} className={Style.excluir}>Excluir</button> 
          } 
        </div>
      </div>
    </div>
  )
}