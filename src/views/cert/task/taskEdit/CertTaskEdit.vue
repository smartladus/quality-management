<template>
<page-header-wrapper
  :title='title'
>
  <a-card v-if='taskNo === undefined' :bordered="false">
    <a-empty>
      <span slot="description">未选择编辑内容</span>
      <a-button type="primary" @click='setModeSelectModal(true)'>
        点击选择
      </a-button>
      <mode-select-modal
        :visible='modeSelectModalVisible'
        @close='setModeSelectModal(false)'
        @editModeSelected='initEdit'
      />
    </a-empty>
  </a-card>
  <template v-else>
    <a-form-model
      :model='form'
      :labelCol="{span: 8}"
      :wrapperCol="{span: 6}"
    >
      <a-card class='card' :bordered="false" title="进度及待办">
        <task-steps />
        <a-divider></a-divider>
        <mark-down-editor
          title='待办事项'
          mode='preview'
          v-model='form.todo'
        />
        <a-divider></a-divider>
        <mark-down-editor
          title='备注'
          mode='preview'
          v-model='form.comments'
        />
        <template v-slot:extra>
          <task-stat-selector
            v-model='form.task_stat'
          />
        </template>
      </a-card>

      <a-card class='card' title='基本信息' :bordered="false">
        <a-form-model-item label="外部认证申请单号" prop="oa_no">
          <a-input v-model="form.oa_no"/>
        </a-form-model-item>
        <a-form-model-item label="认证费用" prop="cost" required>
          <a-input-number
            v-model="form.cost"
            :precision="2"
            :formatter="value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
            :parser="value => value.replace(/￥\s?|(,*)/g, '')"
            style="width: 100%"
            @focus="e => e.currentTarget.select()"
          />
        </a-form-model-item>
        <a-form-model-item label="费用承担方" prop="cost_bearer"  :required='form.cost > 0'>
          <a-input v-model="form.cost_bearer"/>
        </a-form-model-item>
      </a-card>
      <a-card class='card' title='认证详情'>
        <a-form-model-item label="认证区域" prop="region" required>
          <a-select v-model="form.region" placeholder="选择区域" @change="onRegionChange">
            <a-select-option v-for="region in regions" :value="region.abbr" key="region.abbr">
              {{ region.region_chs }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="认证名称" prop="cert_name" required>
          <a-select v-model="form.cert_name" placeholder="选择认证">
            <a-select-option v-for="category in certCategories" :value="category.cert_name" key="category.cert_name">
              {{ category.cert_name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="获证方式" prop="cert_method" required>
          <a-input v-model="form.cert_method"/>
        </a-form-model-item>
        <a-form-model-item label="持证方" prop="cert_owner" required>
          <a-input v-model="form.cert_owner"/>
        </a-form-model-item>
        <a-form-model-item label="供应商" prop="sup_name" required>
          <a-input v-model="form.sup_name"/>
        </a-form-model-item>
        <a-form-model-item label="供应商型号范围" prop="sup_model" required :autosize='true' :wrapper-col='{span:12}'>
          <a-input v-model="form.sup_model" type="textarea" />
        </a-form-model-item>
        <a-form-model-item label="数字科技型号范围" prop="jv_model" required :autosize='true' :wrapper-col='{span:12}'>
          <a-input v-model="form.jv_model" type="textarea" />
        </a-form-model-item>
      </a-card>
    </a-form-model>

    <a-card v-if='taskNo !== undefined && taskNo !== "new"' class='card' title='历史记录' :bordered="false">
      <task-record-time-line :task-no='taskNo'/>
    </a-card>
  </template>
  <footer-tool-bar v-if='taskNo !== undefined' :collapsed="sideCollapsed">
    <a-space>
      <a-button @click='printForm'>打印</a-button>
      <a-button>取消</a-button>
      <a-button type="primary" @click='saveTask'>保存</a-button>
    </a-space>
  </footer-tool-bar>
</page-header-wrapper>
</template>

<script>
import ModeSelectModal from '@/views/cert/task/taskEdit/ModeSelectModal'
import TaskRecordTimeLine from '@/views/cert/task/taskEdit/TaskRecordTimeLine'
import TaskSteps from '@/views/cert/task/taskEdit/TaskSteps'
import MarkDownEditor from '@/components/Editor/MarkDownEditor'
import {getRegionList, getCertTask, getCategoriesByRegion} from '@/api/cert'
import { baseMixin } from '@/store/app-mixin'
import FooterToolBar from '@/components/FooterToolbar'
import TaskStatSelector from '@/views/cert/task/TaskStatSelector'

export default {
  name: 'CertTaskEdit',
  mixins: [baseMixin],
  data() {
    return {
      taskNo: undefined,
      modeSelectModalVisible: false,
      regions:[],
      certCategories: [],
      curRegion: undefined,
      form: {
        oa_no: '',
        cost: 0,
        cost_bearer: '',
        region: undefined,
        cert_name: undefined,
        cert_method: undefined,
        cert_owner: undefined,
        sup_name: undefined,
        sup_model: undefined,
        jv_model: undefined,
        todo: undefined,
        comments: undefined
      }
    }
  },
  computed: {
    title() {
      switch (this.taskNo) {
        case 'new':
          return '新建任务'
        case undefined :
          return '请选择编辑内容'
        default:
          return this.taskNo
      }
    }
  },
  mounted() {
    this.taskNo = this.$route.params.taskNo;
    getRegionList().then(res => {
      this.regions = res;
      // console.log('认证区域列表已获取：', res)
    }).catch(err => {
      this.$notification['error']({
        message: '获取认证区域列表失败:',
        description: err
      })
    })
  },
  watch: {
    taskNo(val, oldVal) {
      console.log(`taskNo changed from ${oldVal} to ${val}`);
      if (val !== 'new' && val !== undefined) {
        getCertTask(val).then(res => {
          // 如果返回的任务信息中存在null，则设置为空字符串
          for (let key in res) {
            Object.getOwnPropertyNames(res).forEach(function(key){
              if (res[key] === null) {
                res[key] = '';
              }
            });
          }
          this.form = res;
          this.curRegion = this.form.region;
        }).catch(err => {
          this.$notification['error']({
            message: `获取任务 ${val} 信息失败:`,
            description: err
          })
        })
      }
    },
    curRegion(val, oldVal) {
      console.log(`curRegion changed from ${oldVal} to ${val}`);
      getCategoriesByRegion(val).then(categories => {
        this.certCategories = categories;
      })
    }
  },
  methods: {
    setModeSelectModal(visible) {
      this.modeSelectModalVisible = visible;
    },
    initEdit(form) {
      // console.log(form);
      if (form.mode === 'new') {
        this.taskNo = 'new';
        this.$router.push('/cert/task/edit/new');
      } else {
        this.taskNo = form.taskNo;
        this.$router.push('/cert/task/edit/' + form.taskNo);
      }
    },
    onRegionChange(val) {
      console.log(`region changed to ${val}`)
      if (this.curRegion === undefined) {
        this.curRegion = val;
        return;
      }
      let self = this;
      this.$confirm({
        title: '修改认证区域将导致 认证名称、获证方式、持证方 被清空！',
        content: '是否确认修改？',
        icon: 'warning',
        onOk() {
          self.curRegion = val;
          self.form.cert_name = undefined;
          self.form.cert_method = undefined;
        },
        onCancel() {
          self.form.region = self.curRegion;
        },
      });
    },
    saveTask() {
      console.log('saving task ============================================')
    },
    printForm() {
      console.log(this.form);
    }
  },
  components: {
    ModeSelectModal,
    TaskRecordTimeLine,
    TaskSteps,
    MarkDownEditor,
    FooterToolBar,
    TaskStatSelector,
  }
}
</script>

<style scoped>
.card{
  margin-bottom: 24px;
}
</style>