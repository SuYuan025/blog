<template>
  <div class="title">后台管理</div>
  <div class="main-panel">
    <div class="menus">
      <div v-for="(item, index) in menus" :key="index" @click="toPage(item.href)">
        {{ item.name }}
      </div>
    </div>
    <div style="padding: 20px; width: 100%;">
      <router-view />
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

const menus = [
  { name: '文章管理', href: '/dashboard/articles' },
  { name: '分类管理', href: '/dashboard/categories' },
  { name: '退出', href: 'logout' },
]

onMounted(() => {
  if (!route.path || route.path === '/dashboard') {
    router.push('/dashboard/articles')
  }
})

const toPage = (href: string) => {
  if (href === 'logout') {
    router.push('/')
  } else {
    router.push(href)
  }
}
</script>

<style scoped>
.main-panel {
  display: flex;
  color: #64676a;
  max-width: 1500px;
  margin: 0 auto;
  flex-direction: column;
}

.title {
  width: 100%;
  font-size: 24px;
  font-weight: bold;
  color: #64676a;
  margin: 0 auto;
  text-align: center;
  background: #dadada;
  padding: 10px 0;
}

.menus {
  padding: 20px 0;
  box-sizing: border-box;
  line-height: 40px;
  text-align: center;
  width: 100%;
  border: 1px solid #dadada;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

  div {
    cursor: pointer;
    margin: 0 15px;

    &:hover {
      color: #fd760e;
    }
  }
}

/* 移动端适配 */
@media (max-width: 768px) {
  .title {
    font-size: 20px;
  }

  .menus {
    line-height: 30px;
  }

  .menus div {
    margin: 0 10px;
  }
}
</style>