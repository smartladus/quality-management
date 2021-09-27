<template>
<a-card title='产品不良趋势_RMN49-G321'>
  <div :id='id' style="height:400px;"></div>
</a-card>
</template>

<script>
import md5 from 'md5'
import moment from 'moment'
import { getProductDefectTrend } from '@/api/dashboard'
import { DualAxes } from '@antv/g2plot'

export default {
  name: 'ProductDefectTrend',
  data() {
    return {
      dualAxes: undefined,
      id: `chart_${md5(moment() * Math.random())}`,
    }
  },
  mounted() {
    this.initCharts()
  },
  methods: {
    initCharts() {
      getProductDefectTrend().then(res => {
        let data = res.data;
        this.dualAxes = new DualAxes(this.id, {
          data: [data, data],
          xField: 'date',
          yField: ['shipment', 'defectRate'],
          meta: {
            defectRate: {
              formatter(value, key) {
                return `${(value * 100).toFixed(2)}%`;
              }
            }
          },
          geometryOptions: [
            {
              geometry: 'column',
            },
            {
              geometry: 'line',
            },
          ]
        })
        this.dualAxes.render();
      })
    }
  }
}
</script>

<style scoped>

</style>