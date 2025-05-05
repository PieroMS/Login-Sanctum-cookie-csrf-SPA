import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia) //  Esto debe ir ANTES de usar cualquier store
app.use(router)

app.mount('#app')
