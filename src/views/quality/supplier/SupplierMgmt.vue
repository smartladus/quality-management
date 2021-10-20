<template>
  <page-header-wrapper
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
  >
    <template slot='title'><span/></template>
    <supplier-list v-if='tabActiveKey==="1"'>
    </supplier-list>
  </page-header-wrapper>
</template>

<script>
import SupplierList from '@/views/quality/supplier/SupplierList'

export default {
  name: 'SupplierMgmt',
  data () {
    const tabList = [
      { key: '1', tab: '供应商清单' },
    ]
    return {
      tabList,
      tabActiveKey: '1',
    }
  },
  components: {
    SupplierList
  }
}
</script>

<style scoped>

</style>