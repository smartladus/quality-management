<template>
<div>
  <defect-age/>
  <a-divider/>
  <cumulative-defect-rate/>
  <a-divider/>
  <cumulative-defect-trend/>
  <a-divider/>
  <product-defect-trend/>
</div>
</template>

<script>
import Demo from '@/views/test/echarts/CumulativeDefectRate'
import DefectAge from '@/views/test/echarts/DefectAge'
import CumulativeDefectRate from '@/views/test/echarts/CumulativeDefectRate'
import CumulativeDefectTrend from '@/views/test/echarts/CumulativeDefectTrend'
import ProductDefectTrend from '@/views/test/echarts/ProductDefectTrend'

export default {
  name: 'Test',
  data () {
    return {
      region: undefined,
    }
  },
  methods: {

  },
  components: {
    Demo,
    DefectAge,
    CumulativeDefectRate,
    CumulativeDefectTrend,
    ProductDefectTrend
  }
}
</script>

<style lang='less' scoped>

</style>