<template>
<div>
  <sub-tab-list-page
    :upload-modal-info='uploadModalInfo'
    @upload='doUpload'
    @reloadList='reloadSuppliers'
    @createItem='openEditModal("new")'
  >

  </sub-tab-list-page>
  <a-table
    :columns='columns'
    :data-source='suppliers'
    :rowKey="supplier => supplier.id"
    :loading="listLoading"
    :scroll="{ x: 900, y: tableHeight}"
    bordered
  >
    <span slot="mainProducts" slot-scope="mainProducts">
      <a-tag v-for='(product, index) in mainProducts' color='blue' :key='index'>{{product}}</a-tag>
    </span>

    <span slot="drRequirement" slot-scope="text, record">
      <a-descriptions :column=1>
        <a-descriptions-item label="早期不良率（150天内）">{{record.dr_thr_150d | percent}}</a-descriptions-item>
        <a-descriptions-item label="1年内不良率">{{record.dr_thr_1y | percent}}</a-descriptions-item>
        <a-descriptions-item label="2年内不良率">{{record.dr_thr_2y | percent}}</a-descriptions-item>
        <a-descriptions-item label="3年内不良率">{{record.dr_thr_3y | percent}}</a-descriptions-item>
      </a-descriptions>
    </span>

    <span slot="companyInfoZh" slot-scope="text, record">
      <a-descriptions :column=1>
        <a-descriptions-item label="公司名">{{record.fullname_zh}}</a-descriptions-item>
        <a-descriptions-item label="公司地址">{{record.address_zh}}</a-descriptions-item>
      </a-descriptions>
    </span>

    <span slot="companyInfoEn" slot-scope="text, record">
      <a-descriptions :column=1>
        <a-descriptions-item label="公司名">{{record.fullname_en}}</a-descriptions-item>
        <a-descriptions-item label="公司地址">{{record.address_en}}</a-descriptions-item>
      </a-descriptions>
    </span>

    <span slot="action" slot-scope="record">
      <a-icon class="task-action" type="form" @click='openEditModal("edit", record)'/>
      <a-divider type="vertical" />
      <a-popconfirm title="确认删除认证类型？" ok-text="确认" cancel-text="取消" @confirm="doDelete(record)">
        <a-icon class="task-action task-action-delete" type="delete"/>
      </a-popconfirm>
    </span>
  </a-table>

</div>
</template>

<script>
import SubTabListPage from '@/components/SubTabPage/SubTabListPage'
import { uploadSuppliers, getAllSuppliers } from '@/api/supplier'

export default {
  name: 'SupplierList',
  data() {
    const columns = [
      {
        title: '简称',
        dataIndex: 'abbr',
        key: 'abbr',
        width: 100,
        align: 'center',
        fixed: 'left',
      },
      {
        title: '主供产品',
        dataIndex: 'main_products',
        key: 'mainProducts',
        scopedSlots: { customRender: 'mainProducts' },
        width: 100,
        align: 'center',
      },
      {
        title: '良率要求',
        dataIndex: 'drRequirement',
        key: 'drRequirement',
        scopedSlots: { customRender: 'drRequirement' },
        width: 250,
        align: 'left',
      },
      {
        title: '统一信用代码',
        dataIndex: 'company_id',
        key: 'companyId',
        width: 200,
        align: 'center',
      },
      {
        title: '中文全称及地址',
        dataIndex: 'companyInfoZh',
        key: 'companyInfoZh',
        scopedSlots: { customRender: 'companyInfoZh' },
        width: 300,
        align: 'center',
      },
      {
        title: '英文全称及地址',
        dataIndex: 'companyInfoEn',
        key: 'companyInfoEn',
        scopedSlots: { customRender: 'companyInfoEn' },
        width: 300,
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
    return {
      uploadModalInfo: {
        title: '上传供应商清单',
        tipOfAdd: '已选择增量上传，仅增加供应商简称和全称都不同的行。',
        uploading: false
      },
      columns,
      listLoading: false,
      suppliers: [],
      tableHeight: document.documentElement.clientHeight - 300 + 'px',
      actionButtonSize: 'small',
    }
  },
  mounted() {
    this.reloadSuppliers();
    window.onresize = function () {
      this.tableHeight = document.documentElement.clientHeight - 300 + 'px'
    }
  },
  methods: {
    reloadSuppliers() {
      this.listLoading = true;
      getAllSuppliers().then(res => {
        this.suppliers = res.data;
        this.listLoading = false;
        console.log(res)
      }).catch(err => {
        this.tasks=[];
        this.$notification['error']({
          message: '获取供应商清单失败:',
          description: err
        })
        this.listLoading = false;
      });
    },
    openEditModal(mode, supplier) {
      if(mode === 'new') {
        alert('新建供应商')
      } else {
        alert('编辑供应商：' + supplier.abbr)
      }
    },
    doUpload(mode, fileList) {
      this.uploadModalInfo.uploading = true;
      let data = new FormData();
      data.append('file', fileList[0]);
      let fileName = fileList[0].name;
      uploadSuppliers(mode, data).then(res => {
        if (res.result === 'SUCCESS') {
          this.$notification['success']({
            message: `${fileName}：供应商清单${mode === 'replace' ? '替换' : '更新'}成功！`,
            description: `${mode === 'replace' ? '上传了' : '新增了'} ${res.data.length} 条数据！`
          })
          this.tasks = (mode === 'replace' || this.tasks === undefined) ? res.data : this.tasks.concat(res.data);
        } else {
          this.$notification['error']({
            message: `${fileName}：供应商清单${mode === 'replace' ? '替换' : '更新'}失败！`
          })
        }
        this.uploadModalVisible = false;
        this.uploadModalInfo.uploading = false;
        this.reloadCategories();
      }).catch(err => {
        this.$notification['error']({
          message: fileName + "文件上传失败！",
          description: err.message
        });
        this.uploadModalInfo.uploading = false;
      });
    }
  },
  components: {
    SubTabListPage
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
</style>