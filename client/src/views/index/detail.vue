<template>
  <div class="container">
    <n-button @click="$router.back()" style="margin-top: 20px;">返回</n-button>
    <n-h1>{{ article.title }}</n-h1>
    <div v-html="article.content" class="blog-content"></div>
    <n-space justify="space-between" align="center" style="font-size: 20px;" class="article-meta">
      <div>发布时间: {{ article.create_time }}</div>
      <div>分类: {{ categoryMap.get(article.category_id) ?? '未知分类' }}</div>
    </n-space>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted } from 'vue'
import { getArticle } from '@/api/articles'
import { getCategories } from '@/api/categories'
import { useRoute } from 'vue-router'

const route = useRoute()

const article = ref({
  id: 0,
  title: '',
  content: '',
  category_id: 0,
  create_time: ''
})

const categoryMap = ref(new Map<number, string>())

const load = async (id: number) => {
  const categoriesRes = await getCategories()
  if (categoriesRes.data.code === 200) {
    const categories = categoriesRes.data.data as any[]
    categoryMap.value = new Map<number, string>(categories.map((item: any) => [item.id, item.name]))
  }
  const res = await getArticle(id)
  if (res.data && res.data.code === 200) {
    article.value = res.data.data
    article.value.create_time = new Date(article.value.create_time ?? '').toLocaleString()
  }
}

onMounted(() => {
  const paramId = route.params.id
  const id = typeof paramId === 'string' ? Number(paramId) : Number(paramId as any)
  if (Number.isFinite(id) && id > 0) {
    load(id)
  }
})
</script>

<style scoped>
.container {
  margin: 0 auto;
}
</style>