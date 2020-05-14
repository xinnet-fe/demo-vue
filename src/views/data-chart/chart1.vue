<template>
  <div id="data-chart" :style="{ height:'450px',width:'100%' }" />
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'DataChart',
  data() {
    return {
      chart: null,
      option: {}
    }
  },
  mounted() {
    this.initChart()
    this.chart.on('click', this.renderData)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    this.chart.off('click', this.renderData)
    this.option = {}
  },
  methods: {
    renderData(param) {
      if (param.componentType === 'series') {
        var brushed = []
        var brushComponent = param.batch[0]
        for (var sIdx = 0; sIdx < brushComponent.selected.length; sIdx++) {
          var rawIndices = brushComponent.selected[sIdx].dataIndex
          brushed.push('[Series ' + sIdx + '] ' + rawIndices.join(', '))
        }

        this.chart.setOption({
          title: {
            backgroundColor: '#333',
            text: 'SELECTED DATA INDICES: \n' + brushed.join('\n'),
            bottom: 0,
            right: 0,
            width: 100,
            textStyle: {
              fontSize: 12,
              color: '#fff'
            }
          }
        })
      }
    },
    initChart() {
      this.chart = echarts.init(document.getElementById('data-chart'))

      const xAxisData = []
      const data1 = []
      const data2 = []
      const data3 = []
      const data4 = []
      const data5 = []
      const data6 = []
      const data7 = []

      for (let i = 0; i < 10; i++) {
        xAxisData.push('Class' + i)
        data1.push((Math.random() * 2).toFixed(2))
        data2.push(Math.random().toFixed(2))
        data3.push((Math.random() * 5).toFixed(2))
        data4.push((Math.random() + 0.3).toFixed(2))
        data5.push((Math.random() + 0.1).toFixed(2))
        data6.push((Math.random() + 0.7).toFixed(2))
        data7.push((Math.random() + 0.9).toFixed(2))
      }

      const emphasisStyle = {
        itemStyle: {
          barBorderWidth: 1,
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowOffsetY: 0,
          shadowColor: 'rgba(0,0,0,0.5)'
        }
      }

      const option = {
        title: {
          top: 10,
          textStyle: {
            fontSize: 16,
            fontWeight: 'normal',
          },
          text: '注册转化率趋势分布'
        },
        color: this.echartsColorList,
        legend: {
          data: ['转化率', '均值'],
          left: 200
        },
        tooltip: {},
        xAxis: {
          data: xAxisData,
          name: 'X Axis',
          axisLine: { onZero: true },
          splitLine: { show: false },
          splitArea: { show: false }
        },
        yAxis: {
          inverse: true,
          splitArea: { show: false }
        },
        grid: {
          left: 30
        },
        series: [
          {
            name: '转化率',
            type: 'line',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data1
          },
          {
            name: '均值',
            type: 'line',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data2
          }
        ]
      }
      this.option = option
      this.chart.setOption(option)
    }
  }
}
</script>

