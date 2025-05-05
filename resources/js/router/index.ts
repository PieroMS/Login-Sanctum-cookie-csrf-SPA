import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/auth/Login.vue'),
  },
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/Home.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()

  // Solo intentar obtener el usuario si NO estás yendo al login
  if (to.path !== '/login' && auth.user === null) {
    try {
      await auth.getUser()
    } catch {
      // Ignorar errores si no está autenticado
    }
  }

  // Si la ruta requiere auth y no hay usuario, redirige
  if (to.meta.requiresAuth && !auth.user) {
    return next('/login')
  }

  next()
})


export default router
