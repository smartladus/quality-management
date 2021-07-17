<template>
<page-header-wrapper
  :tab-list="tabList"
  :tab-active-key="tabActiveKey"
  :tab-change="handleTabChange"
>
  <router-view />
</page-header-wrapper>
</template>

<script>
const getActiveKey = (path) => {
  switch (path) {
    case '/quality/issue/list':
      return '1'
    case '/quality/issue/edit':
      return '2'
    default:
      return '1'
  }
}
export default {
  name: 'IssueLayout',
  data () {
    return {
      tabList: [
        { key: '1', tab: '台账' },
        { key: '2', tab: '编辑' },
      ],
      tabActiveKey: '1',
    }
  },
  created () {
    this.tabActiveKey = getActiveKey(this.$route.path)
    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.$router.push('/quality/issue/list')
          break
        case '2':
          this.$router.push('/quality/issue/edit')
          break
        default:
          this.$router.push('/workplace')
      }
    }
  }
}
</script>

<style scoped>

</style>