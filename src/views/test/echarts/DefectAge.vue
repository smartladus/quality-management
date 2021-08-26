<template>
<a-card title='故障期'>
  <template v-slot:extra>
    <a-switch
      checked-children="百分比"
      un-checked-children="报修数"
      default-checked
      @change="onChange"
    />
  </template>
  <div :id='id' style="height:400px"></div>
</a-card>
</template>

<script>
import { Bar, G2 } from '@antv/g2plot';
import { getDefectAge } from '@/api/dashboard'
import moment from 'moment'
import md5 from 'md5'

G2.registerInteraction('element-link', {
  start: [{ trigger: 'interval:mouseenter', action: 'element-link-by-color:link' }],
  end: [{ trigger: 'interval:mouseleave', action: 'element-link-by-color:unlink' }],
});

const commonOption = {
  xField: 'value',
  yField: 'type',
  seriesField: 'period',
  isStack: true,
  theme: {
    colors10: ['#ED6567','#FF8F82','#FFC757','#009AD8','#45BC7D']
  },
  animation: {},
  tooltip: true,
  legend: {
    layout: 'horizontal',
    position: 'bottom'
  },
  interactions: [{ type: 'element-highlight-by-color' }, { type: 'element-link' }],
}
const valueOption = {
  isPercent: false,
  meta:{},
  label: {
    position: 'middle',
    style: {
      fill: '#fff',
    },
  },
}
const percentOption = {
  isPercent: true,
  meta: {
    value: {
      min: 0,
      max: 1,
      formatter(value, key) {
        return `${(value * 100).toFixed(0)}%`;
      }
    },
  },
  label: {
    position: 'middle',
    content: (item) => {
      return `${(item.value * 100).toFixed(2)}%`;
    },
    style: {
      fill: '#fff',
    },
  },
}
export default {
  name: 'DefectAge',
  data(){
    return {
      columnPlot: undefined,
      id: `chart_${md5(moment() * Math.random())}`,
    }
  },
  mounted() {
    this.columnPlot = new Bar(this.id, {
      ...commonOption, ...percentOption
    })
    getDefectAge().then(res => {
      this.columnPlot.options.data = res.data;
      this.columnPlot.render();
    })
  },
  methods: {
    onChange(checked) {
      if (checked) {
        Object.assign(this.columnPlot.options, percentOption)
      } else {
        Object.assign(this.columnPlot.options, valueOption)
      }
      this.columnPlot.update()
    },
  }
}
</script>

<style scoped>

</style>