<template>
<page-header-wrapper
  :title='$route.params.taskNo === undefined ? "选择编辑方式" : taskNo'
>
  <template
    v-slot:extra
    v-if='$route.params.taskNo !== undefined'
  >
    <a-button>取消</a-button>
    <a-button type="primary" >保存</a-button>
  </template>

  <edit-mode-modal></edit-mode-modal>

  <a-card
    :bordered="false"
    v-if='$route.params.taskNo === undefined'
  >

  </a-card>

</page-header-wrapper>
</template>

<script>
import EditModeModal from '@/views/cert/taskEdit/EditModeModal'

export default {
  name: 'CertTaskEdit',
  data() {
    return {
      taskNo: '新建任务'
    }
  },
  mounted() {
    this.taskNo = this.$route.params.taskNo;
  },
  components: {
    EditModeModal
  }
}
</script>

<style scoped>

</style>