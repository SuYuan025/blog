<template>
    <div>
      <Toolbar
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :defaultConfig="editorConfig"
        :mode="mode"
        v-model="valueHtml"
        style="height: 400px; overflow-y: hidden"
        @onCreated="handleCreated"
        @onChange="handleChange"
      />
    </div>
</template>
  
<script setup lang='ts'>
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, watch, inject } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';

const serverUrl = inject('serverUrl');
const editorRef = shallowRef()
const toolbarConfig = { excludeKeys: ['group-video'] };
const editorConfig: any = { placeholder: '请输入内容...', MENU_CONF: {} };
const mode = ref('default');
const valueHtml = ref('');

editorConfig.MENU_CONF['uploadImage'] = {
  base64Limit: 10 * 1024, // 10KB
  server: `${serverUrl}/upload/rich_editor_upload`,
}

editorConfig.MENU_CONF['insertImage'] = {
  parseImageSrc: (src: string) => {
    // 如果是相对路径，则补全为完整路径
    if (src && !src.startsWith('http')) {
      return `${serverUrl}${src}`;
    }
    return src;
  },
}

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;

  editor.destroy();
});

const handleCreated = (editor: any) => {
  console.log('created', editor);
  editorRef.value = editor;
  // 编辑器创建后，设置初始内容
  if (props.modelValue) {
    editor.setHtml(props.modelValue);
    valueHtml.value = props.modelValue;
  }
};

const handleChange = (editor: any) => {
  const html = editor.getHtml();
  valueHtml.value = html;
  emit('update:modelValue', html);
};

watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && newVal !== valueHtml.value) {
    editorRef.value.setHtml(newVal);
    valueHtml.value = newVal;
  }
});
</script>
  
<style scoped>
  
</style>