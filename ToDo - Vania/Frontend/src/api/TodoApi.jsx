import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000/ToDo",
    headers:{
        "Content-Type":"Application/json"
    }
})
export const createTodo = (payload)=>api.post('/Create', payload);
export const getTodos = ()=>api.get('/getAll');

export default api;