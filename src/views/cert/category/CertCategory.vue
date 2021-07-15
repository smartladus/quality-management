<template>
<page-header-wrapper>
  <a-table
    :columns="columns"
    :data-source="categories"
    :pagination=pagination
    :scroll="{ x: 1500, y: tableHeight}"
    :rowKey="record => record.id"
    :loading="listLoading"
    bordered
  >
    <span slot="compulsory" slot-scope="compulsory">
      <span>{{ compulsory ? 'Y' : 'N' }}</span>
    </span>
    <span slot="type" slot-scope="type">
      <a-tag v-for='item in type' color='blue'>{{item}}</a-tag>
    </span>

    <span slot="comments" slot-scope="comments">
      <mavon-editor
        class='editor'
        v-model='comments'
        :toolbars='toolbars'
        :boxShadow='false'
        :subfield='false'
        :class='[curMode]'
      />
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
import {getCategories} from '@/api/cert'

const columns = [
  {
    title: '区域',
    dataIndex: 'region',
    key: 'region',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '认证名称',
    dataIndex: 'cert_name',
    key: 'cert_name',
    width: 100,
    align: 'center',
    fixed: 'left',
  },
  {
    title: '认证类型',
    dataIndex: 'type',
    key: 'type',
    scopedSlots: { customRender: 'type' },
    width: 150,
    align: 'center',
  },
  {
    title: '是否强制',
    dataIndex: 'compulsory',
    key: 'compulsory',
    scopedSlots: { customRender: 'compulsory' },
    width: 100,
    align: 'center',
  },
  {
    title: '国内测试',
    dataIndex: 'compulsory',
    key: 'compulsory',
    scopedSlots: { customRender: 'compulsory' },
    width: 100,
    align: 'center',
  },
  {
    title: '持证要求',
    dataIndex: 'compulsory',
    key: 'compulsory',
    scopedSlots: { customRender: 'compulsory' },
    width: 120,
    align: 'center',
  },
  {
    title: '样机数量',
    dataIndex: 'compulsory',
    key: 'compulsory',
    scopedSlots: { customRender: 'compulsory' },
    width: 100,
    align: 'center',
  },
  {
    title: '参考周期',
    dataIndex: 'compulsory',
    key: 'compulsory',
    scopedSlots: { customRender: 'compulsory' },
    width: 100,
    align: 'center',
  },
  {
    title: '价格参考',
    dataIndex: 'compulsory',
    key: 'compulsory',
    scopedSlots: { customRender: 'compulsory' },
    width: 100,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'comments',
    key: 'comments',
    scopedSlots: { customRender: 'comments' },
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
]


export default {
  name: 'CertCategory',
  data() {
    return {
      columns,
      categories: [],
      pagination: {
        // total: this.tasks.length,
        hideOnSinglePage: true,
        pageSize: 50,
        showQuickJumper: true,
        showSizeChanger: true,
        pageSizeOptions: ["50", "100", "200", "500"],//每页中显示的数据
        showTotal: total => `共 ${total} 个`,  //分页中显示总的数据
        onShowSizeChange(current, pageSize) {
          console.log('size changed', pageSize)
        },
      },
      toolbars: {
        ol: true, // 有序列表
        ul: true, // 无序列表
        trash: true, // 清空
      },
      tableHeight: document.documentElement.clientHeight - 300 + 'px'
    }
  },
  mounted() {
    getCategories().then(res => {
      this.categories = res;
    })
    this.tableHeight = document.documentElement.clientHeight - 300 + 'px';
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
.editor{
  z-index: 0;
  border: none;
  min-height: 0;
  margin: -16px;
}
.editor.edit{
  min-height: 300px;
}
</style>