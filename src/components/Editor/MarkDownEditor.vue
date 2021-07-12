<template>
<a-card
  size='small'
  :title='title'
>
  <template v-if='curMode === "edit"' slot='extra'>
    <a-space>
      <slot name='extra-of-edit'></slot>
      <a-button @click="cancel">取消</a-button>
      <a-button type="primary" @click="save">确认</a-button>
    </a-space>
  </template>
  <template v-else slot='extra'>
    <a-space>
      <slot name='extra-of-preview'></slot>
      <a-button type="primary" @click="edit">编辑</a-button>
    </a-space>
  </template>
  <mavon-editor
    class='editor'
    :placeholder='placeholder'
    :toolbars='toolbars'
    :boxShadow='false'
    :bordered='false'
    :defaultOpen='curMode'
    :editable='curMode === "edit"'
    :subfield='curMode === "edit"'
    :toolbarsFlag='curMode === "edit"'
    previewBackground='#ffffff'
    v-model='curContent'
    @click='edit'
    @blur='save'
  />
</a-card>
</template>

<script>

export default {
  name: 'MarkDownEditor',
  data() {
    return {
      curMode: 'preview',
      oriContent: '',
      curContent: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        strikethrough: true, // 中划线
        ol: true, // 有序列表
        ul: true, // 无序列表
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
      },
    }
  },
  props: {
    title: String,
    mode: {
      type: String,
      default: 'edit',
    },
    content: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '开始编辑',
    }
  },
  methods: {
    edit() {
      this.curMode = 'edit';
    },
    save() {
      this.curMode = 'preview';
      this.oriContent = this.curContent;
      this.$emit('updated', this.curContent);
    },
    cancel() {
      this.curMode = 'preview';
      this.curContent = this.oriContent;
    },
  },
  mounted() {
    this.curContent = this.content;
    this.oriContent = this.content;
    this.curMode = this.mode;
  },
}
</script>

<style scoped>
.editor{
  z-index: 0;
  border: none;
}
</style>