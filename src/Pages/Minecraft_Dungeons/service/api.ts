import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888', // URL do backend Fastify
});

export default api;