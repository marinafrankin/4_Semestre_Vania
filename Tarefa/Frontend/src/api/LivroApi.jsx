import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000/Livros",
    headers:{
        "Content-Type":"Application/json"
    }
})
export const createLivro = (payload)=>api.post('/Create', payload);
export const getLivros = ()=>api.get('/getAll');
export const getOne = (id)=>api.get(`/${id}`);
export const updateAll = (id, data)=>api.put(`/${id}`, data);
export const updatePartial = (id, data)=>api.patch(`/${id}`, data);
export default api;