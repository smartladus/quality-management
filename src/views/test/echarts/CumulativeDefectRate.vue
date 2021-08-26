<template>
<a-card title='累计不良率'>
  <div :id='id' style="height:400px;"></div>
</a-card>
</template>

<script>
import { Column } from '@antv/g2plot';
import { getCumulativeDefectRate } from '@/api/dashboard'
import md5 from 'md5'
import moment from 'moment'
import DataSet from '@antv/data-set'

export default {
  name: 'CumulativeDefectRate',
  data() {
    return {
      columnPlot: undefined,
      id: `chart_${md5(moment() * Math.random())}`,
    }
  },
  mounted() {
    this.initChart();
  },
  methods: {
    unfoldData(data) {
      let dv = new DataSet().createView().source(data);
      dv.transform({
        type: 'rename',
        map: {
          device: '整机',
          accessory: '配件',
        },
      }).transform({
        type: 'fold',
        fields: ['整机', '配件'],
        key: 'scope',
        value: 'defectRate',
        retains: ['type']
      })
      return dv.rows;
    },
    initChart() {
      getCumulativeDefectRate().then(res => {
        let data = this.unfoldData(res.data);
        this.columnPlot = new Column(this.id, {
          data,
          isGroup: true,
          xField: 'type',
          yField: 'defectRate',
          seriesField: 'scope',
          /** 设置颜色 */
          theme: {
            colors10: ['#54585A', '#DBDCDD'],
          },
          /** 设置间距 */
          // marginRatio: 0.1,
          legend: {
            layout: 'horizontal',
            position: 'bottom',
          },
          yAxis: {
            tickInterval: 0.02,
            label: {
              formatter(value, key) {
                return `${(value * 100).toFixed(0)}%`;
              }
            },
          },
          label: {
            // 可手动配置 label 数据标签位置
            position: 'middle', // 'top', 'middle', 'bottom'
            // 可配置附加的布局方法
            layout: [
              // 柱形图数据标签位置自动调整
              { type: 'interval-adjust-position' },
              // 数据标签防遮挡
              { type: 'interval-hide-overlap' },
              // 数据标签文颜色自动调整
              { type: 'adjust-color' },
            ],
            content: (item) => {
              return `${(item.defectRate * 100).toFixed(2)}%`;
            },
          },
        });
        this.columnPlot.render();
      })
    }
  }
}
</script>

<style scoped>

</style>