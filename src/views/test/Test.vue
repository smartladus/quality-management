<template>
<div>
  <defect-age/>
  <a-divider/>
  <cumulative-defect-rate/>
  <a-divider/>
  <cumulative-defect-trend/>
  <a-divider/>
</div>
</template>

<script>
import Demo from '@/views/test/echarts/CumulativeDefectRate'
import DefectAge from '@/views/test/echarts/DefectAge'
import CumulativeDefectRate from '@/views/test/echarts/CumulativeDefectRate'
import CumulativeDefectTrend from '@/views/test/echarts/CumulativeDefectTrend'

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
  }
}
</script>

<style lang='less' scoped>

</style>