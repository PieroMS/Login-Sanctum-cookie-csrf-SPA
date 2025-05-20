<template>
  <div class="min-h-screen flex">
    <div
      class="hidden md:flex w-1/2 bg-indigo-500 items-center justify-center p-8"
    >
    </div>
    
    <div class="flex flex-col justify-center w-full md:w-1/2 bg-white p-8 md:p-16">
      <div class="max-w-md w-full mx-auto">
        <h2 class="text-3xl font-bold text-gray-800 mb-2">Bienvenido de nuevo</h2>
        <p class="text-gray-500 mb-8">Ingresa tus credenciales para continuar</p>
        
        <!-- Mensaje de error -->
        <div v-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
          {{ error }}
        </div>
        
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>
          
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              v-model="password"
              required
              class="mt-1 w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="••••••••"
            />
          </div>
          
          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center space-x-2">
              <input type="checkbox" v-model="remember" class="form-checkbox text-indigo-500" />
              <span>Recordarme</span>
            </label>
            <a href="#" class="text-indigo-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          
          <button
            type="submit"
            class="w-full bg-indigo-500 text-white py-2 rounded-xl hover:bg-indigo-600 transition"
            :disabled="loading"
          >
            <span v-if="loading">Cargando...</span>
            <span v-else>Ingresar</span>
          </button>
          
          <div class="text-center text-sm mt-4">
            ¿No tienes una cuenta? 
            <router-link to="" class="text-indigo-500 font-medium hover:underline">
              Regístrate aquí
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const remember = ref(false)
const router = useRouter()
const auth = useAuthStore()

// Computed properties para acceder a estado del store
const loading = computed(() => auth.loading)
const error = computed(() => auth.error)

const handleLogin = async () => {
  try {
    await auth.login(email.value, password.value, remember.value)
      router.push('/')
    } catch (error) {
      console.error('Error de login:', error)
    }
}
</script>