import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8888', // URL do seu backend Fastify
});

export default api;