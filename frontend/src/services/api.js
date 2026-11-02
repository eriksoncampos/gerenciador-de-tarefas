import axios from 'axios';

/*const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});*/

const api = axios.create({
  baseURL: 'https://gerenciador-de-tarefas-vwo0.onrender.com/api',
});

export default api;