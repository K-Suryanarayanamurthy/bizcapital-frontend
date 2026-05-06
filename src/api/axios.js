import axios from 'axios'

const API = axios.create({
    baseURL: 'https://bizcapital-backend.onrender.com',
})

// This automatically adds the token to every request
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('token')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default API