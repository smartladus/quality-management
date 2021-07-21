<template>
<div>
  <a-space class='action-bar'>
    <a-button icon="plus" type="primary" @click='addNewLine'>
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
    id='regionTable'
    :columns="columns"
    :data-source="regions"
    :pagination='false'
    :scroll="{y: tableHeight}"
    :rowKey="record => record.id"
    :loading="listLoading"
  >
    <template slot='continent' slot-scope='text, record'>
      <a-select
        v-if='record.editting'
        style='width: 100px'
        placeholder='选择大洲'
        v-model='record.continent'
      >
        <a-select-option v-for="continent in continents" :value="continent" :key="continent">
          {{ continent }}
        </a-select-option>
      </a-select>
      <template v-else>{{record.continent}}</template>
    </template>

    <template v-for='col in ["abbr", "region_chs"]' :slot='col' slot-scope='text, record'>
      <a-input
        v-if='record.editting'
        type='text'
        v-model='record[col]'
        style='max-width: 150px'
      />
      <template v-else>{{record[col]}}</template>
    </template>

    <span slot="action" slot-scope="text, record">
      <template v-if='!record.editting'>
        <a-button @click='edit(record, "edit")' :size='actionButtonSize'>编辑</a-button>
        <a-divider type="vertical" />
        <a-popconfirm title="确认删除认证类型？" ok-text="确认" cancel-text="取消" @confirm="doDelete(record)">
          <a-button type="danger" ghost :size='actionButtonSize'>删除</a-button>
        </a-popconfirm>
      </template>
      <template v-else>
        <a-button type='primary' :size='actionButtonSize' @click='saveEdit(record, "new")'>保存</a-button>
        <a-divider type="vertical" />
        <a-button :size='actionButtonSize' @click='cancelEdit(record)'>取消</a-button>
      </template>
    </span>
  </a-table>
</div>
</template>

<script>
import { getRegionList, saveRegion, deleteRegion, uploadRegionList } from '@/api/cert'
import UploadModal from '@/views/common/UploadModal'
import { momentToString } from 'ant-design-vue/lib/_util/moment-util'
import moment from 'moment'

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
    title: '区域简称（2~3位英文字母）',
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

const continents = ['亚洲', '欧洲', '北美洲', '南美洲', '非洲', '南极洲', '全球']

export default {
  name: 'RegionList',
  data() {
    return {
      listLoading: false,
      columns,
      uploadModalVisible: false,
      uploading: false,
      regions:[],
      continents,
      actionButtonSize: 'small',
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
        for(let region of res) {
          region.editting = false;
        }
        this.regions = res;
        console.log(this.regions)
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
      uploadRegionList(mode, data).then(affectedRows => {
        if (mode === 'replace') {
          if (affectedRows === -1) {
            this.$notification['err']({
              message: fileName + "：认证区域清单替换失败！"
            })
          } else {
            this.$notification['success']({
              message: fileName + "：认证区域清单替换成功！",
              description: "上传了 " + affectedRows + " 条数据！"
            })
          }
        } else {
          if (affectedRows === -1) {
            this.$notification['err']({
              message: fileName + "：认证区域清单更新失败！"
            })
          } else {
            this.$notification['success']({
              message: fileName + "：认证区域清单上传成功！",
              description: "新增了 " + affectedRows + " 条数据！"
            })
          }
        }
        this.uploading = false;
        this.uploadModalVisible = false;
        this.getAllRegion();
      }).catch(err => {
        this.$notification['error']({
          message: fileName + "文件上传失败！",
          description: err.message
        });
        this.uploading = false;
      });
    },
    doDelete(record) {
      deleteRegion(record).then(res => {
        if (res.deletedCount > 0) {
          this.regions.splice(this.regions.findIndex(region => region.id === record.id), 1);
          this.$notification['success']({
            message: '认证区域已删除！',
          });
        } else {
          this.$notification['error']({
            message: '认证区删除改失败！'
          });
        }
      }).catch(err => {
        this.$notification['error']({
          message: '认证区删除改失败！',
          description: err.message
        });
      });
    },
    edit(record) {
      record._originalData = { ...record }
      record.editting = true;
    },
    saveEdit(record, mode) {
      if (mode === 'new') {
        record.id = undefined;
      }
      console.log('saving region: ', record);
      saveRegion(record).then(res => {
        if (res !== null) {
          this.$notification['success']({
            message: '认证区域修改已保存！',
          });
          record.id = res.id;
          record._originalData = undefined
          record.editting = false;
        } else {
          this.$notification['error']({
            message: '认证区域修改失败！'
          });
          this.cancelEdit(record);
        }
      }).catch(err => {
        this.$notification['error']({
          message: '认证区域修改失败！',
          description: err.message
        })
        this.cancelEdit(record);
      })
    },
    cancelEdit(record){
      Object.keys(record).forEach(key => { record[key] = record._originalData[key] })
      record._originalData = undefined
    },
    addNewLine() {
      let region = {
        id: momentToString(moment()),
        continent: undefined,
        abbr:'',
        region_chs:'',
        editting: true
      }
      console.log('adding region: ', region)
      this.regions.unshift(region);
      //- 获取table的dom节点
      let parentDom = document.getElementById('regionTable')
      // 获取table下ant-table-body的dom节点
      let childDom = parentDom && parentDom.getElementsByClassName('ant-table-body')
      // 滚动条置顶
      childDom[0].scrollTop = 0
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