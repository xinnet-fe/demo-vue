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
          按所选时间粒度、时间范围，统计所有注册渠道的注册用户数，并根据时间粒度展示注册用户数分布。
        </p>
        <p>
          均值= 从2019年1月1日至前天的所有注册用户数/从2019年1月1日至前天的天数，保留两位小数。
        </p>
        <p>
          上涨值= 大于均值的天数的注册用户数/大于均值的天数，保留两位小数，四舍五入。
        </p>
        <p>
          下降值=小于均值的天数的注册用户数/小于均值的天数，保留两位小数，四舍五入。
        </p>
        <p>
          警告值=小于下降值的天数的注册用户数/小于下降值的天数，保留两位小数，四舍五入。
        </p>
      </div>
    </custom-chart-head>
    <div ref="data-chart" class="data-chart" />
  </div>
</template>

<script>

import map from 'lodash/map'
import find from 'lodash/find'
import remove from 'lodash/remove'
import forEach from 'lodash/forEach'
import mixin from './mixins'
import formatTime from '@/utils/formatTime'
import resize from '@/components/ResizeChart'
import { convertSeparator } from '@/filters'

export default {
  name: 'RegisterUser',
  mixins: [mixin, resize],
  data() {
    return {
      title: '注册用户数分布',
      selected: [
        {
          name: '注册用户数',
          icon: 'roundRect'
        }
      ]
    }
  },
  methods: {
    drawChildChart() {},
    formatter(params) {
      let res = params[0].axisValue + '<br>'
      forEach(params, (o, i) => {
        const { seriesName, value, marker } = o
        res += `${marker}${seriesName}(人)：${convertSeparator(value)}`
        if (i + 1 !== params.length) {
          res += '<br>'
        }
      })
      return res
    },
    /**
     * chartData绘图数据
     * labelName修改阈值重绘（可选）
     */
    initChart(chartData, labelName) {
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

      // 图例数据
      const defaultLegendData = this.selected
      let legendData = defaultLegendData
      if (labelName) {
        const exists = find(legendData, o => o.name === labelName)
        if (exists) {
          remove(legendData, o => o.name === labelName)
        } else {
          legendData = [...defaultLegendData, { name: labelName }]
        }
      } else {
        legendData = [
          {
            name: '注册用户数',
            icon: 'roundRect'
          },
          {
            name: '均值'
          }
        ]
      }
      // 下拉列表控制图例是否显示
      this.selected = legendData
      const start = 0
      const end = 100

      // 保存数据
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
      // 上涨,均值,下降,警告
      this.checkList = labelName ? [] : [1]
      const lineStyle = {
        width: 1
      }
      // 默认数据注册用户数
      const series = [
        {
          name: '注册用户数',
          type: 'bar',
          lineStyle,
          data: mainData
        }
      ]
      // 根据切换下拉框数据判断数据
      if (labelName) {
        const data = { risingValueData, averageValueData, fallingValueData, warningValueData }
        this.addSeriesData(legendData, this.checkList, series, data)
      // 首次进入数据均值
      } else {
        series.push({
          name: '均值',
          type: 'line',
          symbol: 'circle',
          lineStyle,
          itemStyle: {
            color: '#d2b5f1'
          },
          data: averageValueData
        })
      }

      this.options = map(selectData, (label, value) => ({ label, value }))
      const { formatter } = this
      const option = {
        color: this.echartsColorList,
        title: {
          subtext: '用户数（人）',
          left: 15,
          subtextStyle: {
            color: '#606266'
          }
        },
        legend: {
          selectedMode: false,
          top: 10,
          left: 'center',
          itemWidth: 20,
          itemHeight: 8,
          data: legendData
        },
        tooltip: {
          trigger: 'axis',
          formatter
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
        series
      }
      this.option = option
      this.chart.setOption(option, true)
    }
  }
}
</script>
