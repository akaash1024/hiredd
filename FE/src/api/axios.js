import axios from "axios";


let API = "http://localhost:3000"
export const api = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
})

