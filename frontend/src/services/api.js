import axios from 'axios';

// O Vite lê variáveis de ambiente usando "import.meta.env" em vez de "process.env"
// Ele busca automaticamente os arquivos .env.development ou .env.production
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
});

// 1. Interceptor de REQUISIÇÃO (Adiciona o token JWT se ele existir)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@App:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 2. Interceptor de RESPOSTA (Trata expiração de token ou falta de autorização)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Se o backend responder 401, significa que o token é inválido ou expirou
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('@App:token');
      localStorage.removeItem('@App:user');
      
      // Recarrega a página para fazer o App.js ler o localStorage vazio e mandar para o login
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default api;
