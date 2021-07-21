<template>
<div>
  <region-selector v-model='region'/>
  <region-select v-model='region'/>
  <a-input v-model='region'/>
</div>
</template>

<script>
import RegionSelector from '@/views/cert/category/RegionSelector'
import RegionSelect from '@/views/cert/category/RegionSelect'
export default {
  name: 'Test',
  data () {
    return {
      region: undefined,
    }
  },
  methods: {
    onClick() {
      console.log('div mousedown')
    }
  },
  components: {
    RegionSelector,
    RegionSelect
  }
}
</script>

<style lang='less' scoped>

</style>