import axios from "axios";

const API = axios.create({
    baseURL: "https://auth-lite-backend.onrender.com/api",
    headers: { "Content-Type": "application/json" }
});

export default API