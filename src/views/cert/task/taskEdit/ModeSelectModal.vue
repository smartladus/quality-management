<template>
<a-modal :visible='visible' title='请选择要编辑的任务' @cancel='closeModal'>

  <a-form-model
    ref='editModeForm'
    :model='form'
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
  >
    <a-form-model-item label='选择方式' prop='mode'>
      <a-radio-group v-model="form.mode">
        <a-radio-button value="new">
          新建任务
        </a-radio-button>
        <a-radio-button value="edit">
          编辑任务
        </a-radio-button>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item
      v-if='form.mode !== "new"'
      label='任务编号'
      prop='taskNo'
      :required='form.mode !== "new"'

      has-feedback
    >
      <a-auto-complete
        v-model="form.taskNo"
        :data-source="dataSource"
        placeholder="输入任务编号"
        @select="onSelect"
        @search="onSearch"
        @change="onChange"
      />
    </a-form-model-item>
  </a-form-model>

  <template slot="footer">
    <a-button key="cancel" @click="handleCancel">
      取消
    </a-button>
    <a-button key="submit" type="primary" @click="handleOk">
      确认
    </a-button>
  </template>
</a-modal>
</template>

<script>
import {getAllTasks} from '@/api/cert'

export default {
  name: 'ModeSelectModal',
  data() {
    // 自定义任务编号合法性规则
    let validateTaskNo = (rule, value, callback) => {
      let res = false;
      // 如果模糊查找有结果，而且当前输入值在清单中能够找到，则合法，否则返回非法提示
      if (this.dataSource.length > 0) {
        for (let taskNo of this.dataSource) {
          if (taskNo === value) {
            res = true;
            break;
          }
        }
      }
      if (res) {
        callback()
      } else {
        callback(new Error('未找到匹配的任务编号'));
      }
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 16 },
      taskNoList:[],
      dataSource: [],
      form: {
        mode: 'new',
        taskNo: undefined
      },
      rules: {
        taskNo: [
          {
            validator: validateTaskNo,
            trigger: 'change'
          },
        ],
      }
    }
  },
  mounted() {
    getAllTasks().then(res => {
      this.taskNoList = res.data.map(task => task.task_no);
    })
  },
  props: ['visible'],
  methods: {
    onSearch(searchText) {
      // 动态获取模糊查询结果，不区分大小写
      this.dataSource = this.taskNoList.filter(taskNo => taskNo.toLowerCase().includes(searchText.toLowerCase()));
    },
    onSelect(value) {
      console.log('onSelect', value);
    },
    onChange(value) {
      console.log('onChange', value);
    },
    handleCancel() {
      this.closeModal();
    },
    handleOk() {
      this.$refs.editModeForm.validate(valid => {
        if (valid) {
          this.$emit('editModeSelected', this.form);
          this.closeModal();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    closeModal() {
      this.$emit('close');
      this.form.mode = 'new';
      this.form.taskNo = undefined;
    },
  }
}
</script>

<style scoped>

</style>