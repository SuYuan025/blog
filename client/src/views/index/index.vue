<template>
  <div class="container">
    <div class="nav">
      <div @click="home">首页</div>
      <n-popselect v-model:value="value" :options="Categories" scrollable>
        <div>分类 <span>{{ category }}</span></div>
      </n-popselect>
      <div @click="dashboard">后台</div>
    </div>
    <n-divider />
    <n-space class="search">
      <n-input v-model:value="pageInfo.keyword" placeholder="请输入搜索内容" style="width: 500px;" />
      <n-button type="primary" ghost @click="loadData">搜索</n-button>
      <n-button @click="cancelCategory" v-if="value || pageInfo.keyword">清空筛选</n-button>
    </n-space>
    <div v-for="(item, index) in blogList" :key="index" style="margin-bottom: 15px; cursor: pointer;">
      <n-card :title="item.title" @click="router.push(`/detail/${item.id}`)">
        <n-ellipsis :line-clamp="2" :tooltip="false">
          <div v-html="item.content"></div>
        </n-ellipsis>
        <template #footer>
          <n-space justify="space-between" align="center" class="article-meta">
            <div>发布时间: {{ item.create_time }}</div>
            <div>分类: {{ categoryMap.get(item.category_id) ?? '未知分类' }}</div>
          </n-space>
        </template>
      </n-card>
    </div>
    <n-pagination v-model:page="pageInfo.page" :item-count="pageInfo.total" :page-size="pageInfo.pageSize"
      @update:page="loadData" v-if="pageInfo.total > pageInfo.pageSize" />
    <div class="footer">
      <div @click="handleLinkClick('https://www.bilibili.com/video/BV1t3411F7VH')">power by B站:明明明明明歌</div>
      <div @click="handleLinkClick('https://beian.miit.gov.cn')">豫ICP备2025147378号</div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref, reactive, computed, watch } from 'vue'
import { getCategories } from '@/api/categories';
import { getArticles } from '@/api/articles'
import router from '@/router';

interface Category {
  label: string;
  value: string;
}

const value = ref<string | null>(null)
const Categories = ref<Category[]>([])
const categoryMap = ref(new Map<number, string>())
const blogList = ref<any[]>([])

const pageInfo = reactive({
  page: 1,
  pageSize: 10,
  total: 0,
  keyword: ''
})

const category = computed(() => {
  if (!value.value) return ''
  const selected = Categories.value.find(opt => opt.value === value.value)
  return selected ? selected.label : ''
})

const home = () => {
  router.push('/')
}

const dashboard = () => {
  router.push('/dashboard')
}

const cancelCategory = () => {
  value.value = null
  pageInfo.keyword = ''
  loadData()
}

const handleLinkClick = (url: string) => {
  window.open(url, '_blank')
}

const loadData = async () => {
  const categoriesRes = await getCategories()
  const categoryId = value.value || ''
  const articlesRes = await getArticles({ page: pageInfo.page, pageSize: pageInfo.pageSize, keyword: pageInfo.keyword, categoryId })
  if (categoriesRes.data.code === 200) {
    Categories.value = categoriesRes.data.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id.toString()
      }
    })
    categoryMap.value = new Map(categoriesRes.data.data.map((item: any) => [item.id, item.name]))
  }
  if (articlesRes.data.code === 200) {
    pageInfo.total = articlesRes.data.data.total
    blogList.value = articlesRes.data.data.list
    blogList.value.forEach(item => {
      if (item.create_time) {
        item.create_time = new Date(item.create_time).toLocaleString()
      }
    })
  }
}

watch(value, () => {
  pageInfo.page = 1
  loadData()
})

loadData()
</script>

<style scoped>
.container {
  margin: 0 auto
}

.search {
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.nav {
  display: flex;
  font-size: 20px;
  padding-top: 20px;
  color: #64676a;
  flex-wrap: wrap;

  div {
    cursor: pointer;
    margin-right: 15px;
    margin-bottom: 10px;

    &:hover {
      color: #f60;
    }

    span {
      font-size: 12px;
    }
  }
}

.footer {
  text-align: center;
  line-height: 25px;
  color: #64676a;

  div {
    cursor: pointer;

    &:hover {
      color: #f60;
    }
  }
}
</style>