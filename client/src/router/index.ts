import { createRouter, createWebHistory } from "vue-router";

let routes: any = [
  { path: "/test", name: "测试", component: () => import("@/views/test.vue") },
  { path: "/login", name: "登录", component: () => import("@/views/login.vue"),
  },
  {
    path: "/dashboard", name: "后台", component: () => import("@/views/dashboard/index.vue"),
    children: [
      { path: "/dashboard/articles", name: "文章管理", component: () => import("@/views/dashboard/articles.vue")},
      { path: "/dashboard/categories", name: "分类管理", component: () => import("@/views/dashboard/categories.vue")},
    ]
  },
  { path: "/", name: "主页", component: () => import("@/views/index/index.vue") }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router
