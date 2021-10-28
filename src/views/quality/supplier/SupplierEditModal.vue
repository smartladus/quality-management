<template>
<a-modal
  :visible='visible'
  okText='保存'
  @ok='doSave'
  @cancel='onCancel'
  :title='title'
  :width='800'
>
  <a-form-model
    ref='supplierInfo'
    :model='form'
    :rules='rules'
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-divider>基础信息</a-divider>
    <a-form-model-item label="供应商简称" required prop='abbr'>
      <a-input v-model="form.abbr" placeholder="请输入供应商简称，不超过10个字符，不可重复" />
    </a-form-model-item>
    <a-form-model-item label="统一信用编码">
      <a-input v-model="form.company_id" placeholder="请输入供应商统一信用编码，一般在营业执照上可以找到" />
    </a-form-model-item>
    <a-form-model-item label="主供产品" required>
      <a-select
        mode='multiple'
        v-model="form.main_products"
        placeholder="请选择该供应商主要供应产品"
      >
        
      </a-select>
    </a-form-model-item>
  </a-form-model>
</a-modal>
</template>

<script>
import lodash from 'lodash'

const newSupplier = {
  abbr: undefined,
  fullName_zh: undefined,
  address_zh: undefined,
  fullName_en: undefined,
  address_en: undefined,
  company_id: undefined,
  dr_thr_150d: undefined,
  dr_thr_1y: undefined,
  dr_thr_2y: undefined,
  dr_thr_3y: undefined,
  main_products: []
};
export default {
  name: 'SupplierEditModal',
  data() {
    return {
      modalVisible: this.visible,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form:undefined,
      rules:{

      },
    }
  },
  props: {
    title: String,
    oriForm: Object,
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    mode: {
      type: String,
      default() {
        return 'new';
      }
    }
  },
  model: {
    prop: 'visible',
    event: 'visibleChange'
  },
  watch: {
    visible(val) {
      this.modalVisible = val;
      if(val) {
        this.reloadSupplierInfo();
      }
    },
    oriForm(val) {
      this.reloadSupplierInfo();
    },
  },
  mounted() {

  },
  methods: {
    reloadSupplierInfo() {
      if(this.mode === 'edit') {
        this.form = lodash.cloneDeep(this.oriForm);
      } else {
        this.form = lodash.cloneDeep(newSupplier);
      }
    },
    onCancel() {
      this.$emit('cancel');
      this.$emit('visibleChange', false);
    },
    doSave() {
      this.form.address_en='haahahhahahha'
      console.log(this.form, this.oriForm)
    }
  },
}
</script>

<style scoped>

</style>