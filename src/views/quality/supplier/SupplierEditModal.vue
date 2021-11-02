<template>
<a-modal
  :visible='visible'
  okText='保存'
  @ok='doSave'
  @cancel='onCancel'
  :title='title'
  :width='800'
  :destroy-on-close='false'
>
  <a-form-model
    ref='supplierInfo'
    :model='form'
    :rules='rules'
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    class='modal-body'
  >
    <a-form-model-item label="供应商简称" required has-feedback prop='abbr'>
      <a-input v-model="form.abbr" placeholder="请输入供应商简称，不超过10个字符，不可重复" />
    </a-form-model-item>
    <a-form-model-item label="供应商中文全称" required prop='fullname_zh'>
      <a-input v-model="form.fullname_zh" placeholder="请输入供应商中文全称，不可重复" />
    </a-form-model-item>
    <a-form-model-item label="供应商中文地址" required prop='address_zh'>
      <a-textarea v-model="form.address_zh" auto-size placeholder="请输入供应商中文地址" />
    </a-form-model-item>
    <a-form-model-item label="供应商英文全称" prop='fullname_en'>
      <a-input v-model="form.fullname_en" placeholder="请输入供应商英文全称，不可重复" />
    </a-form-model-item>
    <a-form-model-item label="供应商英文地址" prop='address_en'>
      <a-textarea v-model="form.address_en" auto-size placeholder="请输入供应商英文地址" />
    </a-form-model-item>
    <a-form-model-item required label="统一信用编码">
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
    <a-form-model-item required label="150天内良率要求">
      <a-input-number
        :default-value="0"
        :min="0"
        :max="1"
        :step="0.0001"
        :formatter="value => `${Math.round(value*10000)/100}%`"
        :parser="value => Math.round(value.replace('%', ''))/100"
        v-model="form.dr_thr_150d"
      />
    </a-form-model-item>
    <a-form-model-item required label="1年内良率要求">
      <a-input-number
        :default-value="0"
        :min="0"
        :max="1"
        :step="0.0001"
        :formatter="value => `${Math.round(value*10000)/100}%`"
        :parser="value => Math.round(value.replace('%', ''))/100"
        v-model="form.dr_thr_1y"
      />
    </a-form-model-item>
    <a-form-model-item label="2年内良率要求">
      <a-input-number
        :default-value="0"
        :min="0"
        :max="1"
        :step="0.0001"
        :formatter="value => `${Math.round(value*10000)/100}%`"
        :parser="value => Math.round(value.replace('%', ''))/100"
        v-model="form.dr_thr_2y"
      />
    </a-form-model-item>
    <a-form-model-item label="3年内良率要求">
      <a-input-number
        :default-value="0"
        :min="0"
        :max="1"
        :step="0.0001"
        :formatter="value => `${Math.round(value*10000)/100}%`"
        :parser="value => Math.round(value.replace('%', ''))/100"
        v-model="form.dr_thr_3y"
      />
    </a-form-model-item>
  </a-form-model>
</a-modal>
</template>

<script>
import lodash from 'lodash'

const newSupplier = {
  abbr: undefined,
  fullname_zh: undefined,
  address_zh: undefined,
  fullname_en: undefined,
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
    const validateField = (fieldKey, message) => {
      return (rule, value, callback) => {
        let oriVal = this.mode === 'edit' ? this.oriForm[fieldKey] : undefined;
        let values = this.suppliers.map(supplier => supplier[fieldKey]);
        for (let val of values) {
          if (value === val && val !== oriVal) {
            callback(new Error(message));
            return;
          }
        }
        callback();
      }
    }

    return {
      modalVisible: this.visible,
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      form: lodash.cloneDeep(newSupplier),
      rules:{
        abbr: [
          {trigger: ['change', 'blur'], required: true, message: '内容不能为空'},
          {trigger: ['change', 'blur'], max: 10, message: '内容不能超过10个字符'},
          {trigger: ['change', 'blur'], validator: validateField('abbr', '该供应商简称已存在')},
        ],
        fullname_zh: [
          {trigger: ['change', 'blur'], required: true, message: '内容不能为空'},
          {trigger: ['change', 'blur'], validator: validateField('fullname_zh', '该供应商中文全称已存在')}
        ],
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
    },
    suppliers: {
      type: Array,
      default() {
        return [];
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
    oriForm() {
      this.reloadSupplierInfo();
    },
  },
  mounted() {
    this.reloadSupplierInfo();
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
      console.log(this.form)
    },

  },
}
</script>

<style scoped>
.modal-body {
  height: 500px;
  overflow-y: auto;
  margin: -24px;
  padding-top: 18px;
}
</style>