<template>
<page-header-wrapper :title='taskNo'>
  <a-card :bordered="false">
    哈哈哈
  </a-card>
</page-header-wrapper>
</template>

<script>
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

  }
}
</script>

<style scoped>

</style>