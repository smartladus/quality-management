<template>
<page-header-wrapper
  :tab-list="tabList"
  :tab-active-key="tabActiveKey"
  :tab-change="handleTabChange"
>
  <template slot='title'><span/></template>
  <region-list
    v-if='tabActiveKey === "1"'
  />
  <category-list
    v-if='tabActiveKey === "2"'
  />
</page-header-wrapper>
</template>

<script>
import CategoryList from '@/views/cert/category/categoryList/CategoryList'
import RegionList from '@/views/cert/category/regionList/RegionList'

export default {
  name: 'CategoryLayout',
  data() {
    const tabList = [
      { key: '1', tab: '认证区域管理' },
      { key: '2', tab: '认证类型管理' },
    ]
    return {
      tabList,
      tabActiveKey: '1',
    }
  },
  methods: {
    handleTabChange(key) {
      this.tabActiveKey = key
    },
  },
  components: {
    RegionList,
    CategoryList
  }
}
</script>

<style scoped>

</style>