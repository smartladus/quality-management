<template>
  <page-header-wrapper
  >
    <template v-slot:extra>
      <a-button icon="plus" type="primary" @click="$router.push('/cert/task/edit/new')">
        新建
      </a-button>

      <a-button
        icon='sync'
        :disabled="listLoading"
        @click="getAllTasks"
        :loading="listLoading"
      >
        刷新
      </a-button>
      <a-button icon="upload" @click="setTaskUploadVisible(true)">
        批量上传
      </a-button>
      <task-upload-modal
        @task_list_updated="getAllTasks"
        @close="setTaskUploadVisible(false)"
        :visible="taskUploadVisible"
      />
    </template>

    <a-table
      :columns="columns"
      :data-source="tasks"
      :pagination=pagination
      :scroll="{ x: 1500, y: tableHeight}"
      :rowKey="record => record.id"
      :loading="listLoading"
      bordered
    >
      <span slot="oa_no" slot-scope="oa_no">
        <span>{{ oa_no === null ? '-' : oa_no }}</span>
      </span>
      <span slot="cost" slot-scope="cost">
        <span>￥ {{cost | numberFormat}}</span>
      </span>

      <span slot="cert_method" slot-scope="cert_method">
        <span>{{ certMethodMap[cert_method] }}</span>
      </span>

      <span slot="cert_method_desc" slot-scope="cert_method_desc">
        <span>{{ cert_method_desc === null ? '-' : cert_method_desc }}</span>
      </span>

      <span slot="sup_model" slot-scope="sup_model">
        <a-popover placement="topLeft">
          <template slot="content">
            <div class='model_pop'>
              {{ sup_model | replaceDivider }}
            </div>
          </template>
          <span>{{ sup_model | replaceDivider }}</span>
        </a-popover>
      </span>


      <span slot="jv_model" slot-scope="jv_model">
        <a-popover placement="topLeft">
          <template slot="content">
            <div class='model_pop'>
              {{ jv_model | replaceDivider }}
            </div>
          </template>
          <span>{{ jv_model | replaceDivider }}</span>
        </a-popover>
      </span>

      <span slot="task_stat" slot-scope="task_stat">
        <task-stat-tag :task-stat='task_stat'/>
      </span>
        <span slot="start_date" slot-scope="start_date">
        <span>{{start_date | date}}</span>
      </span>
        <span slot="end_date" slot-scope="end_date">
        <span>{{end_date | date}}</span>
      </span>

      <span slot="cert_no" slot-scope="cert_no">
          <span v-if='cert_no === null'>暂无</span>
          <a v-else href="https://www.antdv.com/">{{cert_no}}</a>
      </span>
      <span slot="action" slot-scope="text, task">
        <a-icon class="task-action" type="form" @click='goToEdit(task.task_no)'/>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除任务？" ok-text="确认" cancel-text="取消" @confirm="doTaskDelete(task)">
          <a-icon class="task-action task-action-delete" type="delete"/>
        </a-popconfirm>
      </span>
    </a-table>
  </page-header-wrapper>
</template>

<script>
import { getCertTaskList, deleteTask } from '@/api/cert'
import TaskUploadModal from '@/views/cert/task/taskList/TaskUploadModal'
import TaskStatTag from '@/views/cert/task/TaskStatTag'

const taskStatMap = {
  NEW: {
    name: '新建',
    color: 'blue'
  },
  DOC_PREPARE: {
    name: '资料准备',
    color: 'blue'
  },
  TEST: {
    name: '型式试验',
    color: 'blue'
  },
  GET_CERT: {
    name: '获证',
    color: 'blue'
  },
  DONE: {
    name: '已完成',
    color: 'green'
  },
  CANCELLED: {
    name: '已取消',
    color: 'gray'
  },
}

const certMethodMap = {
  ORIG: '原型',
  DERI: '派生',
  SDoC: '自我声明',
  CHAN: '变更'
}

const columns = [
  {
    title: '任务编号',
    dataIndex: 'task_no',
    key: 'task_no',
    width: 210,
    fixed: 'left',
    align: 'center',
  },
  {
    title: '外部认证申请单号',
    dataIndex: 'oa_no',
    key: 'oa_no',
    width: 200,
    scopedSlots: { customRender: 'oa_no' },
    align: 'center',
  },
  {
    title: '认证费用',
    dataIndex: 'cost',
    key: 'cost',
    width: 150,
    scopedSlots: { customRender: 'cost' },
    align: 'right',
    sorter: (a, b) => a.cost - b.cost,
  },
  {
    title: '费用承担方',
    dataIndex: 'cost_bearer',
    key: 'cost_bearer',
    width: 150,
    align: 'center',
  },
  {
    title: '供应商',
    dataIndex: 'sup_name',
    key: 'sup_name',
    width: 120,
    align: 'center',
  },
  {
    title: '认证区域',
    dataIndex: 'region',
    key: 'region',
    width: 100,
    align: 'center',
  },
  {
    title: '认证类型',
    dataIndex: 'cert_name',
    key: 'cert_name',
    width: 120,
    align: 'center',
  },
  {
    title: '获证方式',
    dataIndex: 'cert_method',
    scopedSlots: { customRender: 'cert_method' },
    key: 'cert_method',
    width: 120,
    align: 'center',
  },
  {
    title: '获证方式说明',
    dataIndex: 'cert_method_desc',
    scopedSlots: { customRender: 'cert_method_desc' },
    key: 'cert_method_desc',
    width: 150,
    align: 'center',
  },
  {
    title: '证书归属',
    dataIndex: 'cert_owner',
    key: 'cert_owner',
    width: 100,
    align: 'center',
  },
  {
    title: '供应商型号范围',
    dataIndex: 'sup_model',
    scopedSlots: { customRender: 'sup_model' },
    key: 'sup_model',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'JV型号范围',
    dataIndex: 'jv_model',
    scopedSlots: { customRender: 'jv_model' },
    key: 'jv_model',
    width: 200,
    ellipsis: true,
  },
  {
    title: '任务状态',
    key: 'task_stat',
    dataIndex: 'task_stat',
    width: 100,
    scopedSlots: { customRender: 'task_stat' },
    align: 'center',
  },
  {
    title: '开始时间',
    key: 'start_date',
    dataIndex: 'start_date',
    width: 120,
    scopedSlots: { customRender: 'start_date' },
    align: 'center',
  },
  {
    title: '完成时间',
    key: 'end_date',
    dataIndex: 'end_date',
    width: 120,
    scopedSlots: { customRender: 'end_date' },
    align: 'center',
  },
  {
    title: '证书编号',
    key: 'cert_no',
    dataIndex: 'cert_no',
    width: 200,
    scopedSlots: { customRender: 'cert_no' },
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 120,
    fixed: 'right',
    align: 'center',
  },
];

export default {
  name: 'CertTaskList',
  data() {
    return {
      taskStatMap,
      certMethodMap,
      tasks: [],
      listLoading: false,
      taskUploadVisible: false,
      columns,
      pagination: {
        // total: this.tasks.length,
        pageSize: 50,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["50", "100", "200", "500"],//每页中显示的数据
        showTotal: total => `共 ${total} 个任务`,  //分页中显示总的数据
        onShowSizeChange(current, pageSize) {
          console.log('size changed', pageSize)
        },
      },
      tableHeight: document.documentElement.clientHeight - 300 + 'px'
    }
  },
  mounted() {
    /** 控制table的高度 */
    window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 300 + 'px'
      console.log(this.tableHeight);
    }
    this.getAllTasks();
  },
  methods: {
    goToEdit(taskNo) {
      this.$router.push('/cert/task/edit/' + taskNo);
    },
    getAllTasks() {
      this.listLoading = true;
      getCertTaskList().then(res => {
        this.tasks = res;
        this.listLoading = false;
        console.log(res)
      }).catch(err => {
        this.tasks=[];
        this.$notification['error']({
          message: '获取任务清单失败:',
          description: err
        })
        this.listLoading = false;
      });
    },
    setTaskUploadVisible(visible) {
      this.taskUploadVisible = visible;
    },
    doTaskDelete(task){
      deleteTask(task.task_no).then(res => {
        if (res > 0) {
          this.$notification['success']({
            message: "任务 " + task.task_no + " 已成功删除！"
          })
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].task_no === task.task_no) {
              this.tasks.splice(i, 1);
              break;
            }
          }
        } else {
          this.$notification['error']({
            message: "任务 " + task.task_no + " 未找到，删除失败！"
          })
        }
      }).catch(err => {
        this.$notification['error']({
          message: "任务 " + task.task_no + " 未找到，删除失败！",
          description: err
        })
        console.log(err);
      });
    }
  },
  components: {
    TaskUploadModal,
    TaskStatTag
  }
}
</script>

<style scoped>
.task-action {
  font-size: 16px;
  cursor: pointer;
  color: #1890ff;
}
.task-action-delete {
  color: #ED6567;
}
.model_pop{
  max-width: 300px;
  max-height: 120px;
  word-wrap:break-word;
  overflow-y: auto;
}
</style>
