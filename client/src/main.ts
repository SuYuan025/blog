import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import router from '@/router/index'
import { createPinia } from 'pinia'
import axios from 'axios'

const pinia = createPinia()
axios.defaults.baseURL = 'http://localhost:1025'

const { message, dialog, notification } = createDiscreteApi(
    ['message', 'dialog', 'notification'],
)

const app = createApp(App)

app.provide('axios', axios)
app.provide("message", message);
app.provide('dialog', dialog)
app.provide('notification', notification)

app.use(naive)
app.use(pinia)
app.use(router)

app.mount('#app')