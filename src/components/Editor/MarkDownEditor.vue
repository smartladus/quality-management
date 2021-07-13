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
      <a-button @click="edit">编辑</a-button>
    </a-space>
  </template>
  <mavon-editor
    class='editor'
    :class='[curMode]'
    :placeholder='placeholder'
    :toolbars='toolbars'
    :boxShadow='false'
    :bordered='false'
    :defaultOpen='curMode'
    :editable='curMode === "edit"'
    :subfield='curMode === "edit"'
    :toolbarsFlag='curMode === "edit"'
    previewBackground='#FFFFFF'
    v-model='curContent'
    @change='onChange'
  />
</a-card>
</template>

<script>

export default {
  name: 'MarkDownEditor',
  data() {
    return {
      curMode: this.mode,
      curContent: this.content,
      oriContent: this.content,
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
    // 标题
    title: String,
    // 模式：edit | preview
    mode: {
      type: String,
      default: 'edit',
    },
    // 内容,v-model
    content: String,
    // 占位内容
    placeholder: {
      type: String,
      default: '开始编辑...',
    },
    // 取消或保存后是否自动进入预览模式
    previewAfterAction: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'content',
    event: 'change'
  },
  watch: {
    content(val, oldVal) {
      this.curContent = val;
    },
  },
  methods: {
    onChange(val) {
      this.$emit('change', val);
    },
    // 进入编辑模式
    edit() {
      this.curMode = 'edit';
    },
    // 保存内容，
    save() {
      // 默认保存后自动进入预览模式
      if (this.previewAfterAction) {
        this.curMode = 'preview'
      }
      this.oriContent = this.curContent;
      this.$emit('save');
    },
    cancel() {
      // 默认取消后自动进入预览模式
      if (this.previewAfterAction) {
        this.curMode = 'preview';
      }
      this.curContent = this.oriContent;
      this.$emit('cancel');
    },
    // 重置编辑器，编辑模式，内容为空
    // reset() {
    //   this.curMode = 'edit';
    //   this.curContent = '';
    // }
  },
  mounted() {

  },
}
</script>

<style scoped>
.editor{
  z-index: 0;
  border: none;
  min-height: 0;
  margin: -10px;
}
.editor.edit{
  min-height: 300px;
}
</style>