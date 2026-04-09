import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:5000/P1_Vania",
    headers:{
        "Content-Type":"application/json"
    }
})
export const createBairro = (payload)=>api.post('/create', payload);

export const getBairros = ()=>api.get('/getAll');
export const getBairroPorTipo = (tipo)=>api.get("/getAllByTipo", { params: { tipo } });
export const getOne = (id)=>api.get(`/${id}`);

export const deleteBairro = (id) => api.delete(`/${id}`);

export const updateAll = (id, data)=>api.put(`/${id}`, data);
export const updatePartial = (id, data)=>api.patch(`/${id}`, data);
export const updateCompleto = (id, data) => api.put(`/${id}`, data);

export default api;