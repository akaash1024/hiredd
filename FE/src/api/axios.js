// import axios from "axios";

// // Now this will work
// let API = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export const api = axios.create({
//     baseURL: API,
//     withCredentials: true,
//     headers: { "Content-Type": "application/json" },
// })


import axios from "axios";

// Foolproof method - no env variables needed
const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
let API = isProduction ? "https://hiredd-vwh1.onrender.com" : "http://localhost:3000";

console.log("🔥 Current hostname:", window.location.hostname);
console.log("🔥 Is production:", isProduction);
console.log("🔥 API URL:", API);

export const api = axios.create({
    baseURL: API,
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
})