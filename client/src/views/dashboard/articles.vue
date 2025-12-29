<template>
  <n-tabs type="line" v-model:value="tabRef" animated>
    <n-tab-pane name="list" tab="文章列表">
      <div v-for="(item,index) in blogList" :key="index" style="margin-bottom: 15px;">
        <n-card :title="item.title">
            <n-ellipsis :line-clamp="2" :tooltip="false">
              <div v-html="item.content"></div>
            </n-ellipsis>
          <template #footer>
            <n-space justify="space-between" align="center">
              <div>发布时间: {{ item.create_time }}</div>
              <div>分类: {{ categoryMap.get(item.category_id) ?? '未知分类' }}</div>
              <div>
                <n-space>
                  <n-button type="primary" size="small" @click="toEdit(item)">编辑</n-button>
                  <n-button type="error" size="small" @click="remove(item.id)">删除</n-button>
                </n-space>
              </div>
            </n-space>
          </template>
        </n-card>
      </div>
      <n-pagination v-model:page="page" :item-count="total" :page-size="pageSize" @update:page="loadData" v-if="total > pageSize" />
    </n-tab-pane>
    <n-tab-pane name="add" tab="添加文章">
      <n-form ref="formRef" :model="articles" :rules="rules">
        <n-form-item path="title" label="标题">
          <n-input v-model:value="articles.title" placeholder="请输入文章标题" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item :span="12" label="分类" path="selectValue">
          <n-select v-model:value="articles.selectValue" placeholder="请选择分类" :options="articles.generaOptions" />
        </n-form-item>
        <n-form-item label="内容">
          <RichTextEditor v-model="articles.content" />
        </n-form-item>
        <n-button type="primary" @click="add">提交</n-button>
      </n-form>
    </n-tab-pane>
    <n-tab-pane name="edit" tab="编辑文章">
      <n-form ref="formRef" :model="articles" :rules="rules">
        <n-form-item path="title" label="标题">
          <n-input v-model:value="articles.title" placeholder="请输入文章标题" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item :span="12" label="分类" path="selectValue">
          <n-select v-model:value="articles.selectValue" placeholder="请选择分类" :options="articles.generaOptions" />
        </n-form-item>
        <n-form-item label="内容">
          <RichTextEditor v-model="articles.content" />
        </n-form-item> 
        <n-button type="primary" @click="edit">提交</n-button>
      </n-form>
    </n-tab-pane>
  </n-tabs>
</template>

<script setup lang='ts'>
import { ref, inject } from 'vue'
import { getCategories } from '@/api/categories'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { addArticle, updateArticle, deleteArticle, getArticles } from '@/api/articles'

interface Article {
  id: number
  title: string
  content: string
  category_id: number
  create_time?: string
}

const articles = ref({
  id: 0,
  title: '',
  selectValue: null,
  generaOptions: [],
  content: '',
  category_id: 0,
  create_time: ''
})
const blogList = ref<Article[]>([])
const categoryMap = ref(new Map<number, string>())

const message = inject('message') as any
const dialog = inject('dialog') as any
const page = ref(1)
const pageSize = ref(6)
const total = ref(0)
const tabRef = ref('list')

const rules = {
  title: [
    { required: true, message: '标题不能为空', trigger: 'blur' },
    { min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur' }
  ],
  selectValue: [
    { required: true, message: '分类不能为空', trigger: 'blur', type: 'number' },
  ],
}

const add = async () => {
  const res = await addArticle({
    title: articles.value.title,
    categoryId: articles.value.selectValue,
    content: articles.value.content,
  })
  if (res.data.code === 200) {
    message.success('添加成功')
    articles.value.title = ''
    articles.value.selectValue = null
    articles.value.content = ''
    loadData()
  } else {
    message.error(`\ ${res.data.msg}`)
  }
}

const toEdit = (item: any) => {
  tabRef.value = 'edit'
  articles.value = {
    id: item.id,
    title: item.title,
    content: item.content,
    selectValue: item.category_id,
    generaOptions: articles.value.generaOptions,
    category_id: item.category_id,
    create_time: item.create_time
  }
}

const edit = async () => {
  const res = await updateArticle({
    title: articles.value.title,
    categoryId: articles.value.selectValue,
    content: articles.value.content,
    id: articles.value.id,
    category_id: articles.value.category_id
  })
  if (res.data.code === 200) {
    message.success('修改成功')
    articles.value.title = ''
    articles.value.selectValue = null
    articles.value.content = ''
    loadData()
    tabRef.value = 'list'
  } else {
    message.error(`\ ${res.data.msg}`)
  }
}

const remove = (id: number) => {
  dialog.warning({
    title: '警告',
    content: '是否删除该文章？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: async () => {
      const res = await deleteArticle(id)
      if (res.data.code === 200) {
        message.success('删除成功')
        loadData()
      } else {
        message.error(`\ ${res.data.msg}`)
      }
    }
  })
}

const loadData = async () => {
  const categoriesRes = await getCategories()
  const articlesRes = await getArticles({ page: page.value, pageSize: pageSize.value })
  if (categoriesRes.data.code === 200) {
    articles.value.generaOptions = categoriesRes.data.data.map((item: any) => ({
      label: item.name,
      value: item.id,
    }))
    categoryMap.value = new Map(categoriesRes.data.data.map((item: any) => [item.id, item.name]))
  }
  if (articlesRes.data.code === 200) {
    total.value = articlesRes.data.data.total
    blogList.value = articlesRes.data.data.list
    blogList.value.forEach(item => {
      if (item.create_time) {
        item.create_time = new Date(item.create_time).toLocaleString()
      }
    })
    console.log(`output->`, articlesRes)
  }
}
loadData()
</script>

<style scoped></style>