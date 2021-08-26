<template>
<a-card title='累计不良趋势'>
  <a-card size='small' title='按报修时间'>
    <div :id='idByRepairment' style="height:400px;"></div>
  </a-card>
  <a-divider/>
  <a-card size='small' title='按发货时间'>
    <div :id='idByDelivery' style="height:400px;"></div>
  </a-card>
</a-card>
</template>

<script>
import { getCumulativeDefectTrend } from '@/api/dashboard'
import md5 from 'md5'
import moment from 'moment'
import { Area, DualAxes } from '@antv/g2plot';
import DataSet from '@antv/data-set'

export default {
  name: 'CumulativeDefectTrend',
  data() {
    return {
      idByRepairment: `chart_${md5(moment() * Math.random())}`,
      idByDelivery: `chart_${md5(moment() * Math.random())}`,
      area: undefined,
      dualAxes: undefined,
    }
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    initChartByRepairment(oriData) {
      let data = new DataSet()
        .createView()
        .source(oriData)
        .transform({
          type: 'fold',
          fields: Object.keys(oriData[0]).filter(item => item !== 'supplier'),
          key: 'date',
          value: 'defectRate',
          retains: ['supplier']
        }).rows;

      this.area = new Area(this.idByRepairment, {
        data,
        xField: 'date',
        yField: 'defectRate',
        seriesField: 'supplier',
        slider: {},
        legend: { position: 'bottom'},
        tooltip: {
          formatter(item) {
            return {
              name: item.supplier,
              value: `${(item.defectRate * 100).toFixed(2)}%`
            };
          }
        },
        yAxis: {
          label: {
            formatter(value, key) {
              return `${(value * 100).toFixed(0)}%`;
            }
          },
        },
      })
      this.area.render();
    },
    initChartByDelivery(data) {
      this.dualAxes = new DualAxes(this.idByDelivery, {
        data: [data, data],
        xField: 'date',
        yField: ['defectRate', 'shipment'],
        legend: {
          position: 'bottom',
          itemName: {
            formatter(value) {
              switch (value) {
                case 'defectRate':
                  return '不良率'
                case 'shipment':
                  return '出货量'
                default:
                  return '未定义'
              }
            }
          }
        },
        yAxis: {
          defectRate: {
            min: 0,
            max: 0.04,
            label: {
              formatter(value) {
                return `${(value * 100).toFixed()}%`;
              }
            },
            tickInterval: 0.01
          },
          shipment: {
            min: 0,
            max: 1000,
          }
        },
        geometryOptions: [
          {
            geometry: 'line',
            smooth: false,
            color: '#54585A',
            lineStyle: { lineWidth: 3, },
          },
          { geometry: 'line', color: '#DBDCDD' }
        ]
      })
      this.dualAxes.render();
    },
    initCharts() {
      getCumulativeDefectTrend().then(res => {
        this.initChartByRepairment(res.data.byRepairment);
        this.initChartByDelivery(res.data.byDelivery);
      })
    }
  }
}
</script>

<style scoped>

</style>