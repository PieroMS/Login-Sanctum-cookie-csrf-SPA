<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-tr from-indigo-100 via-white to-indigo-200 p-6">
    <div class="bg-white shadow-2xl rounded-2xl p-10 w-full max-w-md text-center">
      <svg class="mx-auto mb-4 text-indigo-500" xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13 3c-4.97 0-9 4.03-9 9a8.966 8.966 0 0 0 6.59 8.72c.49.09.66-.21.66-.47v-1.7c-2.68.58-3.25-1.14-3.25-1.14-.45-1.15-1.1-1.45-1.1-1.45-.91-.62.07-.61.07-.61 1.01.07 1.54 1.03 1.54 1.03.89 1.53 2.34 1.09 2.91.83.09-.64.35-1.09.63-1.34-2.14-.24-4.39-1.07-4.39-4.75 0-1.05.38-1.91 1.01-2.59-.1-.25-.44-1.26.1-2.63 0 0 .82-.26 2.7 1a9.43 9.43 0 0 1 2.46-.33 9.43 9.43 0 0 1 2.46.33c1.88-1.26 2.7-1 2.7-1 .54 1.37.2 2.38.1 2.63.63.68 1.01 1.54 1.01 2.59 0 3.69-2.26 4.5-4.41 4.74.36.31.68.91.68 1.84v2.72c0 .26.17.57.67.47A9 9 0 0 0 22 12c0-4.97-4.03-9-9-9Z" />
      </svg>
      <h1 class="text-2xl font-extrabold text-gray-800 mb-2">¡Hola, {{ user?.name }}!</h1>
      <p class="text-gray-600 mb-6">Has iniciado sesión correctamente.</p>

      <button
        @click="handleLogout"
        class="bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition w-full"
        :disabled="loading"
      >
        <span v-if="loading">Cerrando sesión...</span>
        <span v-else>Cerrar sesión</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  try {
    await auth.logout()
    router.push('/login')
  } catch (e) {
    console.error('No se pudo cerrar sesión')
  }
}
</script>
