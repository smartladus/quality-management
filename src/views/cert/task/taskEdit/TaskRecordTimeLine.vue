<template>
<div>
  <a-button icon='plus' type='dashed' block @click='showNewRecEditor'>新建一条记录</a-button>
  <task-record-editor
    init-mode='edit'
    :ori-record='newRecord()'
    @updated='saveRecord'
    v-show='newRecEditorVisible'
  />
  <a-divider></a-divider>
  <a-empty v-if='taskRecords.length === 0'/>
  <a-timeline v-else>
    <a-timeline-item v-for="record in taskRecords" :key="record.record_no">
      <task-record-editor
        init-mode='preview'
        :ori-record='record'
        @updated='updateRecord'
      />
    </a-timeline-item>
  </a-timeline>
</div>
</template>

<script>
import {getTaskRecord} from '@/api/cert'
import {MarkdownPro, MarkdownPreview} from 'vue-meditor'
import TaskRecordEditor from '@/views/cert/task/taskEdit/TaskRecordEditor'

export default {
  name: 'TaskRecordTimeLine',
  data() {
    return{
      taskRecords: [],
      newRecEditorVisible: false
    }
  },
  props: ['taskNo'],
  mounted() {
    getTaskRecord(this.taskNo).then(records => {
      this.taskRecords = records;
    }).catch(err => {
      this.$notification['error']({
        message: '获取任务记录失败:',
        description: err
      })
    })
  },
  components: {
    MarkdownPro,
    MarkdownPreview,
    TaskRecordEditor
  },
  methods: {
    showNewRecEditor() {
      this.newRecEditorVisible = true;
    },
    updateRecord(record) {
      console.log('更新记录：', {record});
      // todo 更新记录
    },
    saveRecord(record) {
      console.log('新增记录：', {record});
      // todo 新增记录
    },
    newRecord() {
      return {
        task_no: this.taskNo,
        record_no: 'xx',
        content: 'haha',

      }
    }
  }
}
</script>

<style scoped>
</style>