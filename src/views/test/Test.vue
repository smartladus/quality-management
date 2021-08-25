<template>
<div>
  <defect-age/>
</div>
</template>

<script>
import Demo from '@/views/test/echarts/Demo'
import DefectAge from '@/views/test/echarts/DefectAge'

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
    DefectAge
  }
}
</script>

<style lang='less' scoped>

</style>