<template>
<page-header-wrapper
  :tab-list="tabList"
  :tab-active-key="tabActiveKey"
  :tab-change="handleTabChange"
>
  <template slot='title'><span/></template>
  <issue-list
    v-if='tabActiveKey === "1"'
  />
  <issue-edit
    v-if='tabActiveKey === "2"'
  />
</page-header-wrapper>
</template>

<script>
import IssueList from '@/views/quality/issue/IssueList'
import IssueEdit from '@/views/quality/issue/IssueEdit'

export default {
  name: 'IssueKanban',
  data () {
    return {
      tabList: [
        { key: '1', tab: '台账' },
        { key: '2', tab: '编辑' },
      ],
      tabActiveKey: '1',
    }
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key
    }
  },
  components: {
    IssueList,
    IssueEdit
  }
}
</script>

<style scoped>

</style>