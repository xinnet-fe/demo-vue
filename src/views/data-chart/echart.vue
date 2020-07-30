<template>
  <div class="chart-container">
    <div id="data-chart" :style="{ height:height,width:width }" />
  </div>
</template>

<script>
import echarts from 'echarts'

export default {
  name: 'DataChartDemo',
  data() {
    return {
      chart: null,
      option: {},
      width: '100%',
      height: '100%'
    }
  },
  mounted() {
    this.initChart()
    this.chart.on('brushSelected', this.renderBrushed)
    this.chart.on('click', this.renderData)
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
    this.chart.off('brushSelected', this.renderBrushed)
    this.chart.off('click', this.renderData)
    this.option = {}
  },
  methods: {
    renderData(param) {
      if (param.componentType === 'series') {
        console.log(this.option)
        console.log(param)
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
    renderBrushed(params) {
      console.log(params)
      var brushed = []
      var brushComponent = params.batch[0]
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
          text: '柱状图动画延迟'
        },
        backgroundColor: '#eee',
        legend: {
          data: ['首页', '域名', '邮局', '虚拟主机', '云服务', '企业建站', '运营活动'],
          left: 200
        },
        brush: {
          toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],
          xAxisIndex: 0
        },
        toolbox: {
          feature: {
            magicType: {
              type: ['stack', 'tiled']
            },
            dataView: {
              optionToContent: function(opt) {
                const axisData = opt.xAxis[0].data
                const series = opt.series
                let tdHeads = '<td  style="padding: 0 10px">时间</td>'
                let tdBodys = ''
                series.forEach(function(item) {
                  tdHeads += `<td style="padding: 0 10px">${item.name}</td>`
                })
                let table = `<table border="1" style="margin-left:20px;border-collapse:collapse;font-size:14px;text-align:center"><tbody><tr>${tdHeads} </tr>`
                for (let i = 0, l = axisData.length; i < l; i++) {
                  for (let j = 0; j < series.length; j++) {
                    tdBodys += `<td>${series[j].data[i]}</td>`
                  }
                  table += `<tr><td style="padding: 0 10px">${axisData[i]}</td>${tdBodys}</tr>`
                  tdBodys = ''
                }
                table += '</tbody></table>'
                return table
              }
            }
          }
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
          left: 100
        },
        visualMap: {
          type: 'continuous',
          dimension: 1,
          text: ['High', 'Low'],
          inverse: true,
          itemHeight: 200,
          calculable: true,
          min: -2,
          max: 6,
          top: 60,
          left: 10,
          inRange: {
            colorLightness: [0.4, 0.8]
          },
          outOfRange: {
            color: '#bbb'
          },
          controller: {
            inRange: {
              color: '#2f4554'
            }
          }
        },
        series: [
          {
            name: '首页',
            type: 'line',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data1
          },
          {
            name: '域名',
            type: 'line',
            stack: 'one',
            emphasis: emphasisStyle,
            data: data2
          },
          {
            name: '邮局',
            type: 'line',
            stack: 'two',
            emphasis: emphasisStyle,
            data: data3
          },
          {
            name: '虚拟主机',
            type: 'line',
            stack: 'two',
            emphasis: emphasisStyle,
            data: data4
          },
          {
            name: '云服务',
            type: 'line',
            stack: 'two',
            emphasis: emphasisStyle,
            data: data5
          },
          {
            name: '企业建站',
            type: 'line',
            stack: 'two',
            emphasis: emphasisStyle,
            data: data6
          },
          {
            name: '运营活动',
            type: 'line',
            stack: 'two',
            emphasis: emphasisStyle,
            data: data7
          }
        ]
      }
      this.option = option
      this.chart.setOption(option)
    }
  }
}
</script>

<style scoped>
.chart-container{
  position: relative;
  width: 100%;
  height: calc(100vh - 84px);
}
</style>
