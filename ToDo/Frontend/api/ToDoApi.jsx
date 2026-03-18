import axios from "axios";
const api = axios.create({
    baseURL: "http://localhost:5000/Todo",
    headers: {
        'Content - Type':'Application/json'
    }
})

export const createTodo = (payload)=>api.post('/Create', payload);
export default api;