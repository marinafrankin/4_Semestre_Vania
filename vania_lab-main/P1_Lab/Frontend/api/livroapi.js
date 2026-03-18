import axios from "axios";

const api = axios.create({
    baseURL:"http://localhost:5000/Livros",
    headers:{
        "Content-Type":"application/json"
    }
})

export const createLivro = (payload) => api.post("/create", payload);
export const getLivros = () => api.get("/getAll");
export const getLivrosPorAutor = (autor) => api.get("/getAllByAuthor", { params: { autor } });
export const getOne = (id) => api.get(`/${id}`);
export const adquireOne = (id) => api.get(`/adquire/${id}`);
export const deleteLivro = (id) => api.delete(`/${id}`);
export const updateParcial = (id, data) => api.patch(`/${id}`, data);
export const updateCompleto = (id, data) => api.put(`/${id}`, data);
export const adquirirLivro = (id) => api.get(`/adquire/${id}`);

export default api;