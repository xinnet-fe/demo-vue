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
  name: 'Chart3',
  mixins: [mixin, resize],
  data() {
    return {
      title: '注册用户数分布'
    }
  },
  methods: {
    drawChildChart() {},
    initChart(chartData) {
      const xAxisData = []
      // GMV
      const mainData = []
      // 均值
      const averageValueData = []
      // 上涨值
      const risingValueData = []
      // 下降值
      const fallingValueData = []
      // 警告值
      const warningValueData = []

      // 图例data
      const legendData = ['注册用户数', '上涨值', '均值', '下降值', '警告值']
      // 图例初始选中状态
      const selected = {
        '上涨值': false,
        '均值': true,
        '下降值': false,
        '警告值': false
      }
      // const dataLen = chartData.length
      // const start = dataLen > 7 ? (100 - 7 / dataLen * 100) : 0
      const start = 0
      const end = 100

      forEach(chartData, (o, k) => {
        xAxisData.push(formatTime(new Date(o.occurDate).getTime(), 'YYYY-MM-DD'))
        mainData.push(o.registerNumber)
        averageValueData.push(o.regAverageValue)
        risingValueData.push(o.regRisingValue)
        fallingValueData.push(o.regFallingValue)
        warningValueData.push(o.regWarningValue)
      })

      // 下拉框数据
      const selectData = ['上涨值', '均值', '下降值', '警告值']
      // 下拉框初始选中状态取下标
      this.checkList = [1]
      this.options = map(selectData, (label, value) => ({ label, value }))
      const option = {
        color: this.echartsColorList,
        title: {
          subtext: '用户数（人）',
          subtextStyle: {
            color: '#606266'
          }
        },
        legend: {
          data: legendData,
          icon: 'roundRect',
          top: 20,
          left: 100,
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
          data: xAxisData
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
            type: 'bar',
            data: mainData
          },
          {
            name: legendData[1],
            type: 'line',
            data: averageValueData
          },
          {
            name: legendData[2],
            type: 'line',
            data: risingValueData
          },
          {
            name: legendData[3],
            type: 'line',
            data: fallingValueData
          },
          {
            name: legendData[4],
            type: 'line',
            data: warningValueData
          }
        ]
      }
      this.option = option
      this.chart.setOption(option)
    }
  }
}
</script>

