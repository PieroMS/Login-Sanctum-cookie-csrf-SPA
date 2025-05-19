import axios from 'axios';
import Cookies from 'js-cookie'
import router from '../router/index.js';

// Configuración de Axios
const client = axios.create({
  baseURL: 'http://login.test:8000',
  withCredentials: true, // Envía las cookies al servidor Laravel
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Configurar interceptor para agregar el token a todas las peticiones
client.interceptors.request.use(config => {
  const token = Cookies.get('XSRF-TOKEN')
  if (token) {
    config.headers['X-XSRF-TOKEN'] = decodeURIComponent(token)
  }
  return config
})


client.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      console.warn('No autorizado. Redirigiendo al login.');
      router.push('/login');
      return;
    }

    if (error.response?.status === 419 && !originalRequest._retry) {
      console.warn('Token CSRF inválido. Intentando renovar...');

      originalRequest._retry = true; // Previene múltiples reintentos

      try {
        await client.get('/sanctum/csrf-cookie', {
          withCredentials: true
        });

        // Reintenta la solicitud original una sola vez
        return client(originalRequest);
      } catch (retryError) {
        console.error('Error al renovar token CSRF', retryError);
        router.push('/login');
      }
    }

    return Promise.reject(error);
  }
);


export default client;