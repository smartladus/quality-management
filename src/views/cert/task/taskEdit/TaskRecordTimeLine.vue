<template>
<div>
  <a-button icon='plus' type='dashed' block @click='showNewRecEditor'>新建一条记录</a-button>
  <mark-down-editor
    class='newRecEditor'
    ref='newRecEditor'
    mode='edit'
    :preview-after-action='false'
    v-model='newRecord.content'
    @save='insertRecord'
    @cancel='resetNewRecEditor'
    v-if='newRecEditorVisible'
  >
    <template v-slot:extra-of-edit>
      <a-date-picker
        show-time
        placeholder="选择时间"
        v-model='newRecord.record_time'
      />
      <task-stat-selector
        v-model='newRecord.task_stat'
      />
    </template>
  </mark-down-editor>
  <a-divider></a-divider>
  <a-empty v-if='taskRecords.length === 0'/>
  <a-timeline v-else>
    <a-timeline-item v-for="record in taskRecords" :key="record.record_no">
      <mark-down-editor
        mode='preview'
        action-style='icon'
        :title='record.record_no'
        v-model='record.content'
        @save='updateRecord(record)'
      >
        <template v-slot:extra-of-preview>
          <task-stat-tag :task-stat='record.task_stat'/>
          <span>{{record.record_time | dayjs}}</span>
          <a-popconfirm title="确认删除记录？" ok-text="确认" cancel-text="取消" @confirm="deleteRecord(record.record_no)">
            <a-button type="danger">删除</a-button>
          </a-popconfirm>
        </template>
      </mark-down-editor>
    </a-timeline-item>
  </a-timeline>
</div>
</template>

<script>
import {getTaskRecord, insertTaskRecord, updateTaskRecord, deleteTaskRecord} from '@/api/cert'
import MarkDownEditor from '@/components/Editor/MarkDownEditor'
import TaskStatTag from '@/views/cert/task/TaskStatTag'
import TaskStatSelector from '@/views/cert/task/TaskStatSelector'
import moment from 'moment'

export default {
  name: 'TaskRecordTimeLine',
  data() {
    return{
      newRecord: {
        task_stat: undefined,
        record_time: moment(),
        content: '',
      },
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
    MarkDownEditor,
    TaskStatTag,
    TaskStatSelector
  },
  methods: {
    showNewRecEditor() {
      this.newRecEditorVisible = true;
    },
    updateRecord(record) {
      // 解决思路是吧editor的content作为v-model传出来就行了
      console.log('更新记录：', record);
      // todo 更新记录，先检查下传过来的record对不对
      updateTaskRecord(record).then(res => {
        if (res === 'SUCCESS') {
          this.$notification['success']({
            message: '任务记录已保存',
          })
        } else {
          this.$notification['error']({
            message: '任务记录保存失败:',
            description: err
          })
        }
      }).catch(err => {
        // todo 如果更新记录失败了，因为v-model存在，已经改掉了界面显示，好像有点问题
        this.$notification['error']({
          message: '任务记录保存失败:',
          description: err
        })
      });
    },
    insertRecord() {
      let record = {
        record_no: null,
        task_no: this.taskNo,
        task_stat: this.newRecord.task_stat,
        content: this.newRecord.content,
        record_time: this.newRecord.record_time
      }

      // console.log(record)
      // this.resetNewRecEditor();
      // return

      if (record.task_stat === undefined) {
        this.$notification['error']( {
          message: '未选择记录的任务状态！'
        });
        return;
      }
      if (record.content === undefined || record.content === null || record.content === '') {
        this.$notification['error']( {
          message: '未输入任何记录内容！'
        });
        return;
      }
      if (record.record_time === null || record.record_time === undefined) {
        this.$notification['error']( {
          message: '未选择记录时间！'
        });
        return;
      }

      insertTaskRecord(record).then(res => {
        console.log('新增记录：', {res});
        this.taskRecords.unshift(res);
        this.$notification['success']({
          message: '上传任务记录成功'
        })
      }).catch(err => {
        this.$notification['error']({
          message: '上传任务记录失败:',
          description: err
        })
      })
      this.resetNewRecEditor();
    },
    resetNewRecEditor() {
      this.newRecEditorVisible = false;
      this.newRecord.content = '';
      this.newRecord.task_stat = undefined;
    },
    deleteRecord(recNo){
      console.log('删除记录：', {recNo});
      deleteTaskRecord(recNo).then(res => {
        if (eval(res).deletedCount > 0) {
          for (let i = 0; i < this.taskRecords.length; i++) {
            if(this.taskRecords[i].record_no === recNo) {
              this.taskRecords.splice(i, 1);
            }
          }
          this.$notification['success']({
            message: '删除任务记录成功'
          })
        } else {
          this.$notification['error']({
            message: '未找到对应记录'
          })
        }
      }).catch(err => {
        this.$notification['error']({
          message: '删除任务记录失败:',
          description: err
        })
      });
    },
  }
}
</script>

<style scoped>
.newRecEditor{
  margin-top: 12px;
}
</style>