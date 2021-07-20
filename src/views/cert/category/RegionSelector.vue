<template>
<div>
  <a-select v-model="curRegion" placeholder="选择区域" @change="onRegionChange" class='selector'>
    <div
      slot="dropdownRender"
      slot-scope="menu"
    >
      <v-nodes :vnodes="menu" />
      <a-divider style='margin: 4px 0'/>
      <a-button
        type='link'
        icon='plus'
        @click='addItem'
        block
        @mousedown='e => e.preventDefault()'
      >添加区域</a-button>
    </div>
    <a-select-option v-for="region in regions" :value="region.abbr" key="region.abbr">
      {{ region.region_chs }}
    </a-select-option>
  </a-select>
  <a-modal title='新建区域' v-model='editVisible'>
    <a-form-model
      ref='regionForm'
      layout='vertical'
      :model='newRegion'
    >
      <a-form-model-item
        label='区域简称'
        prop='abbr'
        required
        has-feedback
      >
        <a-input v-model="newRegion.abbr" placeholder='2位英文字母'/>
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</div>
</template>

<script>
import { getRegionList } from '@/api/cert'

export default {
  name: 'RegionSelector',
  data() {
    return {
      editVisible: false,
      newRegion: {
        abbr: undefined,
        region_chs: undefined
      },
      curRegion: this.region,
      regions:[],
      adding: false,
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
      this.editVisible = true;
    },
    down(e, str) {
      console.log(str)
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