import { defineStore } from 'pinia'
import client from '@/plugins/axios'

interface User {
  id: number;
  name: string;
  email: string;
  // [key: string]: any; // Para otros campos del usuario
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    loading: false,
    error: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user
  },
  
  actions: {
    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null
    
        await client.get('/sanctum/csrf-cookie')
    
        const response = await client.post('/login', {
          email,
          password
        })
    
        this.user = response.data
    
        return this.user
      } catch (error: any) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión'
        throw error
      } finally {
        this.loading = false
      }
    },
    
    async logout() {
      try {
        this.loading = true
        await client.post('/logout')
        this.user = null
        return true
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
        throw error
      } finally {
        this.loading = false
      }
    },
    
    clearErrors() {
      this.error = null
    }
  }
})