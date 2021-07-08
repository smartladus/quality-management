<template>

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
      <span v-if="oa_no === null">-</span>
      <span v-else>{{oa_no}}</span>
    </span>
      <span slot="cost" slot-scope="cost">
      <span>￥ {{formatCost(cost)}}</span>
    </span>
      <span slot="cert_req" slot-scope="cert_req">
      <a-list item-layout="horizontal" :data-source="cert_req">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <span slot="title">{{item.name}}（{{item.method}}）</span>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </span>

      <span slot="task_stat" slot-scope="task_stat">
      <a-tag v-if="task_stat==='DOC_PREPARE'" color="blue">资料准备</a-tag>
      <a-tag v-else-if="task_stat==='ONGOING'" color="blue">进行中</a-tag>
      <a-tag v-else-if="task_stat==='DONE'" color="green">已完成</a-tag>
      <a-tag v-else-if="task_stat==='paused'" color="orange">暂停中</a-tag>
      <a-tag v-else-if="task_stat==='CANCELLED'" color="grey">已取消</a-tag>
      <a-tag v-else-if="task_stat==='overdue'" color="red">已超期</a-tag>
      <a-tag v-else color="grey">未知状态</a-tag>
    </span>
      <span slot="start_date" slot-scope="start_date">
      <span>{{formatDate(start_date)}}</span>
    </span>
      <span slot="end_date" slot-scope="end_date">
      <span>{{formatDate(end_date)}}</span>
    </span>

      <span slot="cert_no" slot-scope="cert_no">
      <a-list v-if="cert_no !== null" item-layout="horizontal" :data-source="cert_no">
        <a-list-item slot="renderItem" slot-scope="item, index">
          <a-list-item-meta>
            <a slot="title" href="https://www.antdv.com/">{{item}}</a>
          </a-list-item-meta>
        </a-list-item>
      </a-list>
    </span>
    <span slot="action" slot-scope="text, task">
      <a-button class="task-action" type='link' icon='form' @click='$router.push("/cert/task/edit/" + task.task_no)'></a-button>
      <a-divider type="vertical" />
      <a-popconfirm title="确认删除任务？" ok-text="确认" cancel-text="取消" @confirm="doTaskDelete(task)">
        <a-button class="task-action task-action-delete" type='link' icon='delete'></a-button>
      </a-popconfirm>
    </span>
    </a-table>
</template>

<script>
import { getCertTaskList } from '@/api/cert'

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
    width: 120,
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
    dataIndex: 'cert_req',
    key: 'cert_req',
    width: 180,
    scopedSlots: { customRender: 'cert_req' },
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
    key: 'sup_model',
    width: 200,
    ellipsis: true,
  },
  {
    title: 'JV型号范围',
    dataIndex: 'jv_model',
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
    width: 300,
    scopedSlots: { customRender: 'cert_no' },
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
    getCertTaskList().then(res => {
      this.tasks = res;
    });
  },
  methods: {
    goToEdit(task) {
      this.$router.push('/cert/task/edit/' + task.task_no);

    }
  }
}
</script>

<style scoped>

</style>
