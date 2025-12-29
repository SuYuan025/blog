import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import naive from 'naive-ui'
import { createDiscreteApi } from 'naive-ui'
import router from '@/router/index'
import { createPinia } from 'pinia'
import axios from 'axios'
import { adminStore } from '@/stores/adminStore'

const pinia = createPinia()
axios.defaults.baseURL = 'http://localhost:1025'
axios.interceptors.request.use(
  (config) => {
    const store = adminStore();
    if (store.token) {
      config.headers.token = store.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

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