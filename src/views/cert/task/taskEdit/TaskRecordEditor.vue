<template>
<div>
  <a-card v-if='record !== undefined' :title='record.record_no' size='small'>
    <template v-if='mode === "preview"'>
      <template slot='extra'>
        {{ record.record_time | dayjs }}
        <task-stat-tag :task-stat='record.task_stat'/>
        <a-button type='link' @click='edit' icon='edit'/>
      </template>
      <markdown-preview :initialValue='record.content'/>
    </template>
    <template v-else-if='mode === "edit"'>
      <template slot='extra'>
        <a-space class="actions">
          <a-button @click="cancel">取消</a-button>
          <a-button type="primary" @click="save">确认</a-button>
        </a-space>
      </template>
      <markdown-pro
        v-model='record.content'
        :height='300'
        :toolbars='toolbars'
        :bordered='false'
      />
    </template>
  </a-card>
</div>
</template>

<script>
import {MarkdownPro, MarkdownPreview} from 'vue-meditor'
import TaskStatSelector from '@/views/cert/task/TaskStatSelector'
import TaskStatTag from '@/views/cert/task/TaskStatTag'

export default {
  name: 'TaskRecordEditor',
  props: ['initMode', 'oriRecord'],
  data() {
    return {
      mode: 'edit',
      oriContent: '',
      record: undefined,
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
  mounted() {
    this.mode = this.initMode;
    this.record = this.oriRecord;
    this.oriContent = this.record.content;
    console.log(this.record)
  },
  components: {
    MarkdownPro,
    MarkdownPreview,
    TaskStatSelector,
    TaskStatTag
  },
  methods: {
    edit() {
      this.mode = 'edit';
    },
    save() {
      this.mode = 'preview';
      this.$emit("updated", this.record);
    },
    cancel() {
      this.record.content = this.oriContent;
      this.mode = 'preview';
    }
  }
}
</script>

<style scoped>

</style>