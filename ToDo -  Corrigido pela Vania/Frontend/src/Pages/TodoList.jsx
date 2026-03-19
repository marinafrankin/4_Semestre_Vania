import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import TodoItem from "../Components/TodoItem";
import {getTodos} from "../api/TodoApi";

export default function TodoList(){
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
    const handleDelete = async(id)=>{

    }

    return(
        <div>
            <div className="flex items-center justify-between mb-4">
                <Link to='/new' className="text-sm text-blue-600">Nova Tarefa</Link>

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
                            onDelete={()=>handleDelete(todo._id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}