<template>
<div class='main'>
  <div class='title'>
    {{ title }}
    <a-button type='link' @click='edit()' icon='edit'/>
  </div>
  <div class='editor'>
    <markdown-preview
      v-if='isPreview'
      :initialValue='curContent'
    />
    <template v-else>
      <markdown-pro
        v-model='curContent'
        :height='300'
        :toolbars='toolbars'
        :bordered='false'
      />
      <a-space class="actions">
        <a-button @click="cancel">取消</a-button>
        <a-button type="primary" @click="save">确认</a-button>
      </a-space>
    </template>
  </div>
</div>

</template>

<script>

import {MarkdownPro, MarkdownPreview} from 'vue-meditor'

export default {
  name: 'MarkDownEditor',
  data() {
    return {
      task_stat: undefined,
      isPreview: true,
      oriContent: '',
      curContent: '',
      toolbars: {
        h1: false,
        h2: false,
        h3: false,
        hr: false,
        theme: false,
        quote: false,
        image: false,
        table: false,
        code: false,
        link: false,
        fullscreen: false,
        preview: false,
        split: false,
      },
    }
  },
  watch: {
    content(val, oldVal) {
      this.oriContent = val;
      this.curContent = val;
    }
  },
  methods: {
    edit() {
      this.isPreview = false;
    },
    save() {
      this.isPreview = true;
      this.$emit('updated', this.curContent);
    },
    cancel() {
      this.isPreview = true;
      this.curContent = this.oriContent;
    }
  },
  mounted() {
    this.curContent = this.content;
    this.oriContent = this.content;
  },
  props: ['title', 'placeHolder', 'content'],
  components: {
    MarkdownPro,
    MarkdownPreview
  }
}
</script>

<style scoped>
.main{
  position: relative;
  margin-bottom: 24px;
}
.editor{
  border: #d6d6d6 1px solid;
  border-radius: 2px;
}
.actions{
  position: absolute;
  top: 53px;
  right: 5px;
}
.title {
  color: rgba(0,0,0,.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>