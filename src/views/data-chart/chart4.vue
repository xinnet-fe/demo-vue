<template>
  <div class="chart-container">
    <custom-chart-head
      :title="title"
      :options="options"
      :chart="chart"
      :check-list="checkList"
    >
      <div slot="content">
        <p>
          按所选时间粒度、时间范围，统计所有注册渠道的新用户数的总和、按照账户数去重。
        </p>
        <p>
          环比=（所选时间范围的注册用户数-所选时间范围紧挨的之前时间范围周期的注册用户数）
        </p>
      </div>
    </custom-chart-head>
    <el-button v-if="step !== 1" class="fixed-button" size="mini" @click="backView">返 回</el-button>
    <div ref="data-chart" class="data-chart" />
  </div>
</template>

<script>

import map from 'lodash/map'
import forEach from 'lodash/forEach'
import mixin from './mixins'
import formatTime from '@/utils/formatTime'
import resize from '@/components/ResizeChart'

export default {
  name: 'Chart4',
  mixins: [mixin, resize],
  data() {
    return {
      title: 'GMV趋势分布'
    }
  },
  methods: {
    initChart(childData) {
      this.checkList = []
      const xAxisData = []
      const riseData = []
      const declineData = []
      const averageData = []
      const warningData = []
      const legendData = []
      // 图例初始值
      const selected = {}
      // 阈值初始值
      const dataLen = this.chartData.length
      const start = dataLen > 7 ? (100 - 7 / dataLen * 100) : 0
      const end = 100
      const data = childData ? this.chartData.slice(0, 2) : this.chartData
      forEach(data, (o, k) => {
        if (k === 0) {
          legendData.push(
            o.rise.name,
            o.decline.name,
            o.average.name,
            o.warning.name
          )

          forEach(o, item => {
            if (item.selected) {
              selected[item.name] = true
              this.checkList.push(item.value)
            } else {
              selected[item.name] = false
            }
          })
        }
        xAxisData.push(formatTime(o.date, 'YYYY-MM-DD'))
        riseData.push(o.rise.data)
        declineData.push(o.decline.data)
        averageData.push(o.average.data)
        warningData.push(o.warning.data)
      })

      this.options = map(legendData, (label, value) => ({ label, value }))
      const option = {
        color: this.echartsColorList,
        legend: {
          data: legendData,
          icon: 'rect',
          top: 20,
          left: 20,
          selected
        },
        tooltip: {
          trigger: 'axis'
        },
        dataZoom: [
          {
            show: true,
            realtime: true,
            start,
            end
          },
          {
            type: 'inside',
            realtime: true,
            start,
            end
          }
        ],
        xAxis: {
          data: xAxisData,
          boundaryGap: false
        },
        yAxis: {},
        grid: {
          left: 20,
          bottom: 50,
          containLabel: true
        },
        series: [
          {
            name: legendData[0],
            type: 'line',
            areaStyle: {},
            data: riseData
          },
          {
            name: legendData[1],
            type: 'line',
            areaStyle: {},
            data: declineData
          },
          {
            name: legendData[2],
            type: 'line',
            areaStyle: {},
            data: averageData
          },
          {
            name: legendData[3],
            type: 'line',
            data: warningData,
            areaStyle: {}
          }
        ]
      }
      this.option = option
      this.chart.setOption(option)
    }
  }
}
</script>

