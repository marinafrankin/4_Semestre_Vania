import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000/Tarefa",
    headers:{
        "Content-Type":"Application/json"
    }
})
export const createLivro = (payload)=>api.post('/Create', payload);

export const getLivros = ()=>api.get('/getAll');
export const getLivrosPorAutor = (autor)=>api.get("/getByAuthor", { params: { autor } });
export const getOne = (id)=>api.get(`/${id}`);

export const adquireOne = (id) => api.get(`/adquire/${id}`);

export const deleteLivro = (id) => api.delete(`/${id}`);

export const updateAll = (id, data)=>api.put(`/${id}`, data);
export const updatePartial = (id, data)=>api.patch(`/${id}`, data);
export const updateCompleto = (id, data) => api.put(`/${id}`, data);

export const adquirirLivro = (id) => api.get(`/adquire/${id}`);

export default api;