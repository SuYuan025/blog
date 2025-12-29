<template>
  <div>
    <n-button @click="addModal = true" style="margin-bottom: 16px;" type="primary">增加</n-button>
    <n-table :bordered="false" :single-line="false">
      <thead>
        <tr>
          <th>编号</th>
          <th>名称</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(category, index) in categoryList" :key="index">
          <td>{{ category.id }}</td>
          <td>{{ category.name }}</td>
          <td>
            <n-space>
              <n-button type="primary" size="small" @click="toEdit(category.id)">编辑</n-button>
              <n-button size="small" @click="remove(category.id)">删除</n-button>
            </n-space>
          </td>
        </tr>
      </tbody>
    </n-table>

    <n-modal v-model:show="addModal" preset="dialog" title="Dialog">
      <template #header>
        <div>增加</div>
      </template>
      <n-input placeholder="请输入名称" v-model:value="category.name" />
      <template #action>
        <n-button type="primary" @click="add">提交</n-button>
      </template>
    </n-modal>
    
    <n-modal v-model:show="editModal" preset="dialog" title="Dialog">
      <template #header>
        <div>修改</div>
      </template>
      <n-input placeholder="请输入名称" v-model:value="category.name" />
      <template #action>
        <n-button type="primary" @click="edit(category.id)">提交</n-button>
      </template>
    </n-modal>
  </div>
</template>
  
<script setup lang='ts'>
import { ref, reactive, inject } from 'vue'
import { getCategories, addCategory, deleteCategory, updateCategory } from '@/api/categories'

interface Category {
  id: number
  name: string
}

const categoryList = ref<Category[]>([])
const category = reactive({ id: 0, name: '' })
const addModal = ref(false)
const editModal = ref(false)
const message = inject('message') as any
const dialog = inject('dialog') as any

const add = async () => {
  if (!category.name) {
    message.error('请输入名称')
    return
  }
  const res = await addCategory({ name: category.name })
  if (res.data.code === 200) {
    message.success('添加成功')
    addModal.value = false
    category.name = ''
    loadData()
  } else {
		message.error(`\ ${res.data.msg}`)
  }
}

const toEdit = (id: number) => {
  editModal.value = true
  category.id = id
}

const edit = async(id: number) => {
  const res = await updateCategory({ id, name: category.name })
  if (res.data.code === 200) {
    message.success('修改成功')
    editModal.value = false
    category.name = ''
    loadData()
  } else {
    message.error(`\ ${res.data.msg}`)
  }
}

const remove = (id: number) => {
  dialog.warning({
    title: '警告',
    content: '是否删除该分类？',
    positiveText: '确定',
    negativeText: '取消',
    draggable: true,
    onPositiveClick: async () => {
      const res = await deleteCategory(id)
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
  const res = await getCategories()
  categoryList.value = res.data.data
}
loadData()
</script>
  
<style scoped>
  
</style>