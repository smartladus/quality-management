<template>
<div>
  <a-card v-if='form.task_no === undefined' :bordered="false">
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
      ref='taskForm'
      :model='form'
      :labelCol="{span: 8}"
      :wrapperCol="{span: 6}"
      :rules="rules"
    >
      <a-card class='card' :bordered="false" :title="title">
<!--        <task-steps :stat='form.task_stat' />-->
<!--        <a-divider></a-divider>-->
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
          <a-form-model-item label="任务状态" prop="task_stat" required style='margin: 0'>
            <task-stat-selector
              v-model='form.task_stat'
              :disabled='form.task_no === "new"'
            />
          </a-form-model-item>
        </template>
      </a-card>

      <a-card class='card' title='基本信息' :bordered="false">
        <a-form-model-item label="外部认证申请单号" prop="oa_no">
          <a-input v-model="form.oa_no"/>
        </a-form-model-item>
        <a-form-model-item label="认证费用" prop="cost" required>
          <a-input-number
            v-model="form.cost"
            :min="0"
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

    <a-card v-if='form.task_no !== undefined && form.task_no !== "new"' class='card' title='历史记录' :bordered="false">
      <task-record-time-line :task-no='form.task_no' :cur-stat='form.task_stat'/>
    </a-card>
  </template>
  <footer-tool-bar v-if='form.task_no !== undefined' :collapsed="sideCollapsed">
    <a-popover v-model="errListVisible" title="表单校验信息" trigger="click">
      <template slot="content">
        <ul class='errList'>
          <li v-for='item in errors' class='errListItem' @click='scrollTo(item.key)'>
            <a-icon type="close-circle" class='errIcon'/>{{item.message}}
          </li>
        </ul>
      </template>
      <span v-if='errors.length > 0' class='errIndicator'>
        <a-icon type="exclamation-circle" class='errIcon'/>{{errors.length}}
      </span>
    </a-popover>
    <a-button @click='printForm' class='action'>打印</a-button>
    <a-button class='action'>取消</a-button>
    <a-button type="primary" @click='saveTask' class='action'>保存</a-button>
  </footer-tool-bar>
</div>
</template>

<script>
import ModeSelectModal from '@/views/cert/task/taskEdit/ModeSelectModal'
import TaskRecordTimeLine from '@/views/cert/task/taskEdit/TaskRecordTimeLine'
import TaskSteps from '@/views/cert/task/taskEdit/TaskSteps'
import MarkDownEditor from '@/components/Editor/MarkDownEditor'
import {getRegionList, getCertTask, getCategoriesByRegion, updateTask, insertTask} from '@/api/cert'
import { baseMixin } from '@/store/app-mixin'
import FooterToolBar from '@/components/FooterToolbar'
import TaskStatSelector from '@/views/cert/task/TaskStatSelector'

export default {
  name: 'CertTaskEdit',
  mixins: [baseMixin],
  data() {
    let validateCostBearer = (rule, value, callback) => {
      let res = true;
      let bearer = value.trim();
      console.log(`validateCostBearer: ${this.form.cost}, cost: ${this.form.cost}`)
      if (this.form.cost > 0 && bearer === '') {
        res = false;
      }
      if (res) {
        callback()
      } else {
        callback(new Error('请填写费用承担方'));
      }
    }
    return {
      modeSelectModalVisible: false,
      errListVisible: false,
      regions:[],
      certCategories: [],
      curRegion: undefined,
      form: {
        task_no: undefined,
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
        todo: '',
        comments: ''
      },
      rules:{
        cost: [{ required: true, trigger: ['change', 'blur'], message: '认证费用不能为空' }],
        cost_bearer: [{ trigger: ['change', 'blur'], validator: validateCostBearer }],
        region: [{ required: true, message: '请选择认证区域' }],
        cert_name: [{ required: true, message: '请选择认证名称' }],
        cert_method: [{ required: true, message: '请选择获证方式' }],
        cert_owner: [{ required: true, message: '请填写持证方' }],
        sup_name: [{ required: true, message: '请选择供应商' }],
        sup_model: [{ required: true, message: '请填写供应商型号范围' }],
        jv_model: [{ required: true, message: '请填写数字科技型号范围' }]
      },
      errors: []
    }
  },
  computed: {
    title() {
      switch (this.form.task_no) {
        case 'new':
          return '新建任务'
        case undefined :
          return '请选择编辑内容'
        default:
          return this.form.task_no
      }
    }
  },
  mounted() {
    getRegionList().then(res => {
      this.regions = res;
      // console.log('认证区域列表已获取：', res)
    }).catch(err => {
      this.$notification['error']({
        message: '获取认证区域列表失败:',
        description: err
      })
    })
    this.loadTaskInfo(this.taskNo);
  },
  props: ['taskNo'],
  watch: {
    curRegion(val, oldVal) {
      console.log(`curRegion changed from ${oldVal} to ${val}`);
      getCategoriesByRegion(val).then(categories => {
        this.certCategories = categories;
      })
    },
  },
  methods: {
    setModeSelectModal(visible) {
      this.modeSelectModalVisible = visible;
    },
    initEdit(form) {
      this.form.task_no = form.mode === 'new' ? 'new' : form.taskNo;
      this.loadTaskInfo(this.form.task_no);
    },
    loadTaskInfo(taskNo) {
      console.log(`taskNo changed to ${taskNo}`);
      if (taskNo === undefined) {
        return;
      }
      if (taskNo === 'new') {
        this.form.task_no = 'new';
        this.form.task_stat = 'NEW';
        return;
      }
      getCertTask(taskNo).then(res => {
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
          message: `获取任务 ${taskNo} 信息失败:`,
          description: err
        })
      })
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
      console.log('saving task ============================================\n', this.form)
      this.errors = [];
      this.$refs.taskForm.validate((valid, fieldErrs) => {
        if (valid) {
          console.log('success submit!!');
          if (this.form.task_no === 'new') {
            insertTask(this.form).then(res => {
              if (res.task_no) {
                this.$router.push("/cert/task/edit/" + res.task_no);
                this.$notification['success']({
                  message: '任务添加成功',
                })
              }

            })
          } else {
            updateTask(this.form).then(res => {
              if (res === 'SUCCESS') {
                this.$notification['success']({
                  message: '任务信息已更新',
                })
              }
            })
          }
        } else {
          console.log('error submit!!', fieldErrs);
          this.errors = Object.keys(fieldErrs)
            .filter(key => fieldErrs[key])
            .map(key => ({
              key: key,
              message: fieldErrs[key][0].message
            }))
          return false;
        }
      });
    },
    scrollTo(itemKey) {
      // todo 滚动到错误的地方
      const labelNode = document.querySelector(`label[title="供应商型号范围"]`)
      console.log(itemKey + 'clicked', labelNode);
      if (labelNode) {
        labelNode.scrollIntoView(true)
      }
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
.action{
  margin-left: 8px;
}
.errIndicator{
  color: red;
}
.errIcon{
  color: red;
  margin-right: 4px;
}
.errList{
  list-style: none;
  margin: -12px -16px -12px;
  padding: 0;
}
.errListItem{
  cursor: pointer;
  padding: 8px;
  border-bottom: #d6d6d6 1px solid;
}
.errListItem:hover{
  background: #e6f7ff;
}
</style>