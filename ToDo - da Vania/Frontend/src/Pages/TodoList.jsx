import React, {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import TodoItem from "../Components/TodoItem";
import {getTodos, deleteTodo, updatePartial} from "../api/TodoApi";

export default function TodoList(){
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const fetchTodo = async()=>{
        try {
            setLoading(true);
            const res = await getTodos();
            setTodos(res.data.tarefas)
        } catch (err) {
            setError(err.message || "Erro ao buscar as tarefas");
        }
        finally{
            setLoading(false);
        }
    }
    useEffect(()=>{fetchTodo()}, []);
    const handleDelete = async (id)=>{
        if(!confirm("Excluir esta tarefa?")){
            return
        }
        await deleteTodo(id);
        setTodos(todos.filter(t=>t._id !== id))
    }
    const handleUpdate = async (id)=>{
        navigate(`/edit/${id}`);
    }
    const handleEnd = async (id)=>{
        try {
            await updatePartial(id, {situacao:"Finalizada"});
            //Após a alteração da situação no BD, 
            // é alterada a situacao na lista sem buscar novamente no BD
            setTodos(prevTodos=>prevTodos.map(todo=>todo._id === id?
                {...todo,situacao:'Finalizada'}:todo));
            

        } catch (error) {
            console.error("Erro ao finalizar a tarefa:", error);
        }
    }

    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <Link to='/new' className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg shadow-sm transition-all flex items-center gap-2">Nova Tarefa</Link>

            </div>
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-600">{error}</p>}
            <div className="space-y-3">
                {todos?.length === 0 && !loading?(
                    <p className="text-gray-500">Nenhuma Tarefa encontrada!</p>
                ):(
                    todos?.map(todo=>(
                        <TodoItem 
                            key={todo._id}
                            todo = {todo}
                            onDelete={() => handleDelete(todo._id)}
                            onEdit={()=> handleUpdate(todo._id)}
                            onEnd={()=> handleEnd(todo._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}