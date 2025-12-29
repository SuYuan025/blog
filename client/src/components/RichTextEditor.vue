<template>
  <div>
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" :mode="mode" style="border-bottom: 1px solid #ccc" />
    <Editor :defaultConfig="editorConfig" :mode="mode" v-model="valueHtml" style="height: 400px; overflow-y: hidden"
      @onCreated="handleCreated" @onChange="handleChange" />
  </div>
</template>

<script setup lang='ts'>
// @ts-ignore
import '@wangeditor/editor/dist/css/style.css'
import { onBeforeUnmount, ref, shallowRef, watch, inject } from 'vue';
// @ts-ignore
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
  parseImageSrc: (src: any) => {
    const raw = typeof src === 'string' ? src : (src?.toString ? src.toString() : '')
    if (!raw) return ''
    if (!raw.startsWith('http')) {
      return `${serverUrl ?? ''}${raw}`;
    }
    return raw;
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
    const safe = typeof props.modelValue === 'string' ? props.modelValue : String(props.modelValue ?? '')
    editor.setHtml(safe);
    valueHtml.value = safe;
  }
};

const handleChange = (editor: any) => {
  const html = editor.getHtml();
  valueHtml.value = html;
  emit('update:modelValue', html);
};

watch(() => props.modelValue, (newVal) => {
  if (!editorRef.value) return
  const safe = typeof newVal === 'string' ? newVal : String(newVal ?? '')
  if (safe !== valueHtml.value) {
    editorRef.value.setHtml(safe);
    valueHtml.value = safe;
  }
});
</script>

<style scoped></style>