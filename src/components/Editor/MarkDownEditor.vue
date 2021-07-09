<template>
<div class='main'>
  <div class='title'>
    {{ title }}
    <a-button type='link' @click='setMode("edit")' icon='edit'/>
  </div>
  <mavon-editor
    class="editor"
    ref="md"
    :placeholder="placeHolder"
    :boxShadow="false"
    v-model="curContent"
    :toolbars="toolbars"
    :subfield="false"
    :toolbarsFlag='editorSetting.toolbarsFlag'
    :editable="editorSetting.editable"
    :defaultOpen="editorSetting.defaultOpen"
  />
  <a-space class="actions" v-if='mode === "edit"'>
    <a-button @click="cancel">取消</a-button>
    <a-button type="primary" @click="save">确认</a-button>
  </a-space>
</div>

</template>

<script>
export default {
  name: 'MarkDownEditor',
  data() {
    return {
      task_stat: undefined,
      mode: 'preview',
      editorSetting: {
        toolbarsFlag: false,
        editable: false,
        defaultOpen: 'preview'
      },
      oriContent: '',
      curContent: '',
      toolbars: {
        bold: true, // 粗体
        italic: true, // 斜体
        ol: true, // 有序列表
        ul: true, // 无序列表
        undo: true, // 上一步
        redo: true, // 下一步
      },
    }
  },
  watch: {
    mode(val, oldVal) {
      if (val === 'edit') {
        this.editorSetting.toolbarsFlag = true;
        this.editorSetting.editable = true;
        this.editorSetting.defaultOpen = 'edit';
      } else {
        this.editorSetting.toolbarsFlag = false;
        this.editorSetting.editable = false;
        this.editorSetting.defaultOpen = 'preview';
      }
    }
  },
  methods: {
    setMode(mode) {
      this.mode = mode;
    },
    save() {
      this.mode = 'preview';
      this.$emit('updated', this.curContent);
    },
    cancel() {
      this.mode = 'preview';
      this.curContent = this.oriContent;
    }
  },
  mounted() {
    this.curContent = this.content;
    this.oriContent = this.content;
  },
  props: ['title', 'placeHolder', 'content'],
}
</script>

<style scoped>
.main{
  position: relative;
  margin-bottom: 24px;
}
.editor{
  z-index: 1;
  border: 1px solid #d9d9d9;
  min-height: 0;
  height: 200px;
}
.actions{
  z-index: 10;
  position: absolute;
  top: 54px;
  right: 5px;
}
.title {
  color: rgba(0,0,0,.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>