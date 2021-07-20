<template>
<div>
  <a-space class='action-bar'>
    <a-button icon="plus" type="primary" @click='openEditModal("new", newCategory)'>
      新建
    </a-button>

    <a-button
      icon='sync'
      :disabled="listLoading"
      @click="getAllRegion"
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
    :data-source="regions"
    :pagination=pagination
    :scroll="{y: tableHeight}"
    :rowKey="record => record.id"
    :loading="listLoading"
  >
    <template slot='continent' slot-scope='text, record'>
      <a-input
        v-if='record.editting'
        type='text'
        :value='text'
      />
      <template v-else>{{text}}</template>
    </template>

    <template slot='abbr' slot-scope='text, record'>
      <a-input
        v-if='record.editting'
        type='text'
        :value='text'
      />
      <template v-else>{{text}}</template>
    </template>

    <span slot="action" slot-scope="record">
      <a-icon class="task-action" type="form" @click='edit(record.id)'/>
      <a-divider type="vertical" />
      <a-popconfirm title="确认删除认证类型？" ok-text="确认" cancel-text="取消" @confirm="doDelete(record)">
        <a-icon class="task-action task-action-delete" type="delete"/>
      </a-popconfirm>
    </span>
  </a-table>
</div>
</template>

<script>
import { getRegionList } from '@/api/cert'
import UploadModal from '@/views/common/UploadModal'

const columns = [
  {
    title: '大洲',
    dataIndex: 'continent',
    key: 'continent',
    width: 150,
    scopedSlots: { customRender: 'continent' },
    align: 'center',
  },
  {
    title: '区域简称（2位英文字母）',
    dataIndex: 'abbr',
    key: 'abbr',
    width: 120,
    scopedSlots: { customRender: 'abbr' },
    align: 'center',
  },
  {
    title: '区域中文名称',
    dataIndex: 'region_chs',
    key: 'region_chs',
    width: 150,
    scopedSlots: { customRender: 'region_chs' },
    align: 'center',
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' },
    width: 120,
    align: 'center',
  },
]

const newCategory = {
  region: undefined
}

export default {
  name: 'RegionList',
  data() {
    return {
      listLoading: false,
      columns,
      uploadModalVisible: false,
      uploading: false,
      regions:[],
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
      tableHeight: document.documentElement.clientHeight - 300 + 'px'
    }
  },
  mounted() {
    this.getAllRegion();
    window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 300 + 'px'
    }
  },
  methods: {
    getAllRegion() {
      this.listLoading = true;
      getRegionList().then(res => {
        this.regions = res;
        this.listLoading = false;
      }).catch(err => {
        this.$notification['error']({
          message: '获取认证区域列表失败:',
          description: err
        })
        this.listLoading = false;
      })
    },
    showUploadModal() {
      this.uploadModalVisible = true;
    },
    doUpload(mode, fileList) {
      this.uploading = true;
      let data = new FormData();
      data.append('file', fileList[0]);
      let fileName = fileList[0].name;
      // uploadCategories(mode, data).then(affectedRows => {
      //   if (mode === 'replace') {
      //     if (affectedRows === -1) {
      //       this.$notification['err']({
      //         message: fileName + "：认证类型清单替换失败！"
      //       })
      //     } else {
      //       this.$notification['success']({
      //         message: fileName + "：认证类型清单替换成功！",
      //         description: "上传了 " + affectedRows + " 条数据！"
      //       })
      //     }
      //   } else {
      //     if (affectedRows === -1) {
      //       this.$notification['err']({
      //         message: fileName + "：认证类型清单更新失败！"
      //       })
      //     } else {
      //       this.$notification['success']({
      //         message: fileName + "：认证类型清单上传成功！",
      //         description: "新增了 " + affectedRows + " 条数据！"
      //       })
      //     }
      //   }
      //   this.uploading = false;
      //   this.getAllCategories();
      // }).catch(err => {
      //   this.$notification['error']({
      //     message: fileName + "文件上传失败！",
      //     description: err.message
      //   });
      //   this.uploading = false;
      // });
    },
    doDelete(record) {
      // todo 删除认证类型
    },
    edit(id) {
      console.log(id)
      const target = this.regions.find(item => item.id === id)
      target._originalData = { ...target }
      target.editting = true;
      console.log(target)
    }
  },
  components: {
    UploadModal,
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