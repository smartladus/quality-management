<template>
<div>
  <a-select
    ref='regionSelector'
    v-model="curRegion"
    placeholder="选择区域"
    @change="onRegionChange"
    class='selector'
  >
    <div
      slot="dropdownRender"
      slot-scope="menu"
    >
      <v-nodes :vnodes="menu" />
      <a-divider style='margin: 0'/>
      <div
        style='background: #d6d6d6'
        @mousedown='e => e.preventDefault()'
      >
        <a-button
          type='link'
          icon='plus'
          @click='addItem'
          block
          v-if='!adding'
        >添加区域</a-button>
        <template v-else>
          <a-input
            placeholder='2~3位英文字母'
            @mousedown='e => e.preventDefault()'
            @click="e=>e.target.focus()"
          />
        </template>
      </div>
    </div>
    <a-select-option v-for="region in regions" :value="region.abbr" key="region.abbr">
      {{ region.region_chs }}
    </a-select-option>
  </a-select>
</div>
</template>

<script>
import { getRegionList } from '@/api/cert'

export default {
  name: 'RegionSelector',
  data() {
    return {
      adding: false,
      newRegion: {
        abbr: undefined,
        region_chs: undefined
      },
      curRegion: this.region,
      regions:[],
    }
  },
  props: ['region'],
  model: {
    prop: 'region',
    event: 'change'
  },
  methods: {
    onRegionChange(val) {
      this.$emit('change', val);
    },
    addItem() {
      // console.log('addItem', this.regions);
      // this.regions.push(`New item`);
      this.adding = true;
    },
    print(str) {
      console.log(str)
    },
    focus() {
      this.$refs.regionSelector.focus()
    },
    drop(open) {
      console.log(`dropdown visible: ${open}`)
      if(this.adding && !open) {
        this.$refs.regionSelector.focus()
      }
    }
  },
  watch: {
    region(val) {
      this.curRegion = val;
    }
  },
  mounted() {
    getRegionList().then(res => {
      this.regions = res;
    }).catch(err => {
      this.$notification['error']({
        message: '获取认证区域列表失败:',
        description: err
      })
    })
  },
  components: {
    VNodes: {
      functional: true,
      render: (h, ctx) => ctx.props.vnodes,
    },
  },
}
</script>

<style scoped>
.selector{
  min-width: 150px;
}
</style>