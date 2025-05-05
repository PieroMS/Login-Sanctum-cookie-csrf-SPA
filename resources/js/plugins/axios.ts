import axios from 'axios';
import router from '@/router';

// Configuración de Axios
const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Envía las cookies al servidor Laravel
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Errores globales como 401 o 419
client.interceptors.response.use(
  response => response,
  async error => {
    // Si el error es 401 (no autorizado)
    if (error.response?.status === 401) {
      console.warn('No autorizado. Redirigiendo al login.')
      router.push('/login')
    }
    
    // Si el error es 419 (CSRF token expirado)
    if (error.response?.status === 419) {
      console.warn('Token CSRF inválido. Obteniendo nuevo token...')
      
      try {
        // Obtener nuevo token CSRF
        await axios.get(`${import.meta.env.VITE_API_URL}/sanctum/csrf-cookie`, { 
          withCredentials: true 
        })
        
        // Reintentar la solicitud original
        return client(error.config)
      } catch (retryError) {
        console.error('Error al renovar token CSRF', retryError)
        router.push('/login')
      }
    }
    
    return Promise.reject(error)
  }
);

export default client;