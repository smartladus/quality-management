<template>
<page-header-wrapper
  :tab-list="tabList"
  :tab-active-key="tabActiveKey"
  :tab-change="handleTabChange"
>
  <template slot='title'>
    xxxxx
  </template>
  <component v-bind:is="content"></component>

</page-header-wrapper>
</template>

<script>

export default {
  name: 'Test',
  data () {
    return {
      tabList: [
        { key: '1', tab: '台账' },
        { key: '2', tab: '编辑' },
      ],
      tabActiveKey: '1',
      content: undefined,
    }
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.content = () => import('@/views/quality/issue/IssueEdit')
          break
        case '2':
          this.content = () => import('@/views/quality/issue/IssueList')
          break
        default:
          this.content = () => import('@/views/quality/issue/IssueEdit')
      }
    }
  },
}
</script>

<style lang='less' scoped>

</style>