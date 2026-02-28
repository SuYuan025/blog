import { createRouter, createWebHistory } from "vue-router";

let routes: any = [
  { path: "/test", name: "测试", component: () => import("@/views/test.vue") },
  // 登陆页
  {
    path: "/login",
    name: "登录",
    component: () => import("@/views/login.vue"),
  },
  // 后台管理页
  {
    path: "/dashboard",
    name: "后台",
    component: () => import("@/views/dashboard/index.vue"),
    children: [
      {
        path: "/dashboard/articles",
        name: "文章管理",
        component: () => import("@/views/dashboard/articles.vue"),
      },
      {
        path: "/dashboard/categories",
        name: "分类管理",
        component: () => import("@/views/dashboard/categories.vue"),
      },
    ],
  },
  // 主页
  {
    path: "/",
    name: "主页",
    component: () => import("@/views/index/index.vue"),
  },
  // 文章详情页
  {
    path: "/detail/:id",
    name: "文章详情",
    component: () => import("@/views/index/detail.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
