<template>
  <a-dropdown
    class='select'
    v-model='visible'
    :trigger='["click"]'
    @visibleChange='visibleChange'
  >
    <a-menu slot="overlay" @click="handleMenuClick">
      <a-menu-item
        v-for='region in regions'
        :key='region.abbr'
      >{{region.region_chs}}</a-menu-item>
      <a-menu-divider />
      <a-menu-item key='action'>
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
              ref='x'
              placeholder='2~3位英文字母'
              @click="e=>e.target.focus()"
            />
          </template>
        </div>
      </a-menu-item>
    </a-menu>
    <a-button class='btn'>
      {{text}}
      <a-icon type="down"/>
    </a-button>
  </a-dropdown>
</template>

<script>
import { getRegionList } from '@/api/cert'

export default {
  name: 'RegionSelect',
  data() {
    return {
      regions: [],
      curVal: undefined,
      adding: false,
      visible: false,
    }
  },
  computed: {
    text() {
      if (this.curVal === undefined) {
        return this.placeholder
      } else {
        let region = this.regions.find(item => item.abbr === this.curVal);
        return region === undefined ? this.curVal : region.region_chs
      }
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: String,
    placeholder: {
      type: String,
      default() {
        return '请选择'
      }
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
    this.curVal = this.value;
  },
  watch: {
    value(val) {
      this.curVal = val;
    }
  },
  methods: {
    handleMenuClick(e) {
      if (e.key === 'action') {
        // console.log(`editting`)
      } else {
        // console.log(`value changed to ${e.key}`)
        this.$emit('change', e.key);
        this.curVal = e.key;
        this.visible = false;
      }
    },
    addItem() {
      this.adding = true;
    },
    visibleChange(visible) {
      this.adding = false;
    }
  }
}
</script>

<style scoped>
.btn{
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
  padding: 11px;
}
.select{
  min-width: 150px;
}
.menu{
  height: 50px;
  background: #00A0E9;
}
</style>