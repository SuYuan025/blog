import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import router from '@/router/index'
import { createPinia } from 'pinia'
import axios from 'axios'

const pinia = createPinia()
axios.defaults.baseURL = 'http://localhost:1025'

const app = createApp(App)

app.use(naive)
app.use(pinia)
app.use(router)

app.mount('#app')