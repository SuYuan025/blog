import { createRouter, createWebHistory } from "vue-router";

let routes: any = [
  { path: '/test', name: 'test', component: () => import('@/views/test.vue') },
  { path: '/login', name: 'login', component: () => import('@/views/login.vue') }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
