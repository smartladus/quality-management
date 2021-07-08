<template>
<a-modal :visible='visible' title='请选择要编辑的任务' @cancel='closeModal'>

  <a-form-model
    ref='editModeForm'
    :model='form'
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
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
    >
      <a-input v-model='form.taskNo'></a-input>
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

export default {
  name: 'ModeSelectModal',
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        mode: 'new',
        taskNo: undefined
      },
      rules: {
        taskNo: [
          {
            required: true,
            message: '请输入正确的任务编号',
            trigger: 'change'
          },
        ],
      }
    }
  },
  props: ['visible'],
  methods: {
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
    }
  }
}
</script>

<style scoped>
a-modal{
  width: 200px;
}
</style>