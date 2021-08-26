<template>
<a-modal
  :title='title'
  :visible='visible'
  okText='保存'
  @cancel='onCancel'
>
  <a-form-model
    ref='categoryForm'
    :model='form'
    :labelCol="{span: 8}"
    :wrapperCol="{span: 6}"
  >
    <a-form-model-item label="认证区域" prop="region" required>
      <a-select v-model="form.region" placeholder="选择区域" @change="onRegionChange">
        <a-select-option v-for="region in regions" :value="region.abbr" key="region.abbr">
          {{ region.region_chs }}
        </a-select-option>
      </a-select>
    </a-form-model-item>


  </a-form-model>
</a-modal>
</template>

<script>
import { getAllRegions } from '@/api/cert'

export default {
  name: 'CategoryEditModal',
  data() {
    return {
      modalVisible: this.visible,
      form: this.category,
      regions:[],
    }
  },
  props: {
    title: String,
    visible: {
      type: Boolean,
      default() {
        return false;
      }
    },
    category: Object,
  },
  model: {
    prop: 'visible',
    event: 'visibleChange'
  },
  watch: {
    category(val) {
      this.form = val;
    },
    visible(val) {
      this.modalVisible = val;
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
      this.$emit('visibleChange', false);
    },
  },
  mounted() {
    getAllRegions().then(res => {
      this.regions = res;
      // console.log('认证区域列表已获取：', res)
    }).catch(err => {
      this.$notification['error']({
        message: '获取认证区域列表失败:',
        description: err
      })
    })
  }
}
</script>

<style scoped>

</style>