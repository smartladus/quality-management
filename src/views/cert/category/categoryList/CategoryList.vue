<template>
<div>
  <a-space class='action-bar'>
    <a-button icon="plus" type="primary" @click='openEditModal("new", newCategory)'>
      新建
    </a-button>

    <a-button
      icon='sync'
      :disabled="listLoading"
      @click="getAllCategories"
      :loading="listLoading"
    >
      刷新
    </a-button>
    <a-button icon='upload' @click='showUploadModal'>
      批量上传
    </a-button>
    <upload-modal
      v-model='uploadModalVisible'
      :uploading='uploading'
      title='批量上传认证类型'
      tip-of-add='已选择增量上传，仅增加区域和认证名称都不同的行。'
      @upload='doUpload'
    />
  </a-space>

  <a-table
    :columns="columns"
    :data-source="categories"
    :pagination=pagination
    :scroll="{ x: 1500, y: tableHeight}"
    :rowKey="category => category.id"
    :loading="listLoading"
    bordered
  >
    <span slot="compulsory" slot-scope="compulsory">
      <span>{{ compulsory ? 'Y' : 'N' }}</span>
    </span>
    <span slot="type" slot-scope="type">
      <a-tag v-for='(item, index) in type' color='blue' :key='index'>{{item}}</a-tag>
    </span>

    <span slot="action" slot-scope="record">
      <a-icon class="task-action" type="form" @click='openEditModal("edit", record)'/>
      <a-divider type="vertical" />
      <a-popconfirm title="确认删除认证类型？" ok-text="确认" cancel-text="取消" @confirm="doDelete(record)">
        <a-icon class="task-action task-action-delete" type="delete"/>
      </a-popconfirm>
      </span>
  </a-table>

  <category-edit-modal
    :title='editModal.title'
    v-model='editModal.visible'
    :category='editModal.category'
  />
</div>
</template>

<script>
import { getCategories, uploadCategories } from '@/api/cert'
import UploadModal from '@/views/common/UploadModal'
import CategoryEditModal from '@/views/cert/category/categoryList/CategoryEditModal'

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
    dataIndex: 'test_domestic',
    key: 'test_domestic',
    width: 100,
    align: 'center',
  },
  {
    title: '持证要求',
    dataIndex: 'hold_requirement',
    key: 'hold_requirement',
    width: 120,
    align: 'center',
  },
  {
    title: '样机数量',
    dataIndex: 'sample_qty',
    key: 'sample_qty',
    width: 100,
    align: 'center',
  },
  {
    title: '参考周期',
    dataIndex: 'time_cost',
    key: 'time_cost',
    width: 100,
    align: 'center',
  },
  {
    title: '价格参考',
    dataIndex: 'cost',
    key: 'cost',
    scopedSlots: { customRender: 'cost' },
    width: 100,
    align: 'center',
  },
  {
    title: '备注',
    dataIndex: 'comments',
    key: 'comments',
    align: 'left',
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

const newCategory = {
  region: undefined
}

export default {
  name: 'CategoryList',
  data() {
    return {
      listLoading: false,
      columns,
      uploadModalVisible: false,
      uploading: false,
      newCategory,
      categories: [],
      editModal: {
        title: '',
        visible: false,
        category: undefined
      },
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
    this.getAllCategories();
    window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 300 + 'px'
    }
  },
  methods: {
    getAllCategories() {
      this.listLoading = true;
      getCategories().then(res => {
        this.categories = res;
        this.listLoading = false;
        console.log(res)
      }).catch(err => {
        this.tasks=[];
        this.$notification['error']({
          message: '获取认证类型清单失败:',
          description: err
        })
        this.listLoading = false;
      });
    },
    showUploadModal() {
      this.uploadModalVisible = true;
    },
    doUpload(mode, fileList) {
      this.uploading = true;
      let data = new FormData();
      data.append('file', fileList[0]);
      let fileName = fileList[0].name;
      uploadCategories(mode, data).then(res => {
          if (res.result === 'SUCCESS') {
            this.$notification['success']({
              message: `${fileName}：认证类型清单${mode === 'replace' ? '替换' : '更新'}成功！`,
              description: `${mode === 'replace' ? '上传了' : '新增了'} ${res.data.length} 条数据！`
            })
            this.tasks = mode === 'replace' ? res.data : this.tasks.concat(res.data);
          } else {
            this.$notification['error']({
              message: `${fileName}：认证类型清单${mode === 'replace' ? '替换' : '更新'}失败！`
            })
          }
        this.uploadModalVisible = false;
        this.uploading = false;
        this.getAllCategories();
      }).catch(err => {
        this.$notification['error']({
          message: fileName + "文件上传失败！",
          description: err.message
        });
        this.uploading = false;
      });
    },
    openEditModal(mode, record) {
      this.editModal.title = mode === 'new' ? '新建认证类型' : '编辑认证类型';
      this.editModal.visible = true;
      this.editModal.category = record;
    },
    doDelete(record) {
      // todo 删除认证类型
    }
  },
  components: {
    UploadModal,
    CategoryEditModal
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
.action-bar{
  position: absolute;
  right: -8px;
  top: 36px;
}
</style>