import echarts from 'echarts'
import find from 'lodash/find'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import CustomChartHead from '@/components/CustomChartHead'
import app from '@/main'

export default {
  components: {
    CustomChartHead
  },
  props: {
    chartData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      step: 1,
      chart: null,
      option: {},
      options: [],
      checkList: [],
      products: {
        1: '域名',
        2: '云计算',
        3: '云计算(老)',
        4: '建站',
        5: '邮局',
        6: '虚机',
        7: '轻应用服务器',
        8: '租用托管',
        9: '服务市场',
        10: '其他',
        11: '小计'
      }
    }
  },
  mounted() {
    const self = this
    this.chart = echarts.init(this.$refs['data-chart'])

    this.$watch('chartData', (newVal) => {
      if (newVal.length) {
        this.initChart(newVal)
        this.chart.off('legendselectchanged', this.legendSelectChanged.bind(self))
        this.chart.on('legendselectchanged', this.legendSelectChanged.bind(self))
      }
    })

    // 点击图事件
    this.chart.on('click', this.getChart.bind(self))

    // 选择阈值重绘
    app.$on('reloadChart', this.reloadChart.bind(self))

    if (this.chartData.length) {
      this.initChart(this.chartData)
      this.chart.off('legendselectchanged', this.legendSelectChanged.bind(self))
      this.chart.on('legendselectchanged', this.legendSelectChanged.bind(self))
    }
  },
  beforeDestroy() {
    const self = this
    if (!this.chart) {
      return
    }
    this.chart.off('legendselectchanged', this.legendSelectChanged.bind(self))
    this.chart.off('click', this.getChart.bind(self))
    app.$off('reloadChart', this.reloadChart.bind(self))
    this.chart.dispose()
    this.chart = null
    this.option = {}
  },
  methods: {
    // 点击图例联动阈值下拉列表
    legendSelectChanged(legends) {
      const newLegends = reduce(legends.selected, (res, value, key) => {
        if (value) {
          res[key] = value
        }
        return res
      }, {})
      this.checkList = reduce(this.options, (res, o) => {
        forEach(newLegends, (v, legendLabel) => {
          if (legendLabel === o.label) {
            res.push(o.value)
          }
        })
        return res
      }, [])
    },
    getChart(param) {
      if (param.componentType === 'series') {
        this.drawChildChart(param.name).then(() => {
          this.step = 2
        })
      }
    },
    reloadChart(labelName, currentComp) {
      const { initChart: chart, $options } = currentComp
      if (this.$options.name === $options.name) {
        chart(this.chartData, labelName)
      }
    },
    addSeriesData(legendData, checkList, series, data, restData = {}) {
      const { risingValueData, averageValueData, fallingValueData, warningValueData } = data
      const lineStyle = {
        width: 1
      }
      const rising = find(legendData, o => o.name === '上涨')
      const average = find(legendData, o => o.name === '均值')
      const falling = find(legendData, o => o.name === '下降')
      const warning = find(legendData, o => o.name === '警告')
      if (rising) {
        checkList.push(0)
        series.push({
          name: '上涨',
          type: 'line',
          symbol: 'circle',
          lineStyle,
          itemStyle: {
            color: '#ec7387'
          },
          data: risingValueData,
          ...restData
        })
      }
      if (average) {
        checkList.push(1)
        series.push({
          name: '均值',
          type: 'line',
          symbol: 'circle',
          lineStyle,
          itemStyle: {
            color: '#d2b5f1'
          },
          data: averageValueData,
          ...restData
        })
      }
      if (falling) {
        checkList.push(2)
        series.push({
          name: '下降',
          type: 'line',
          symbol: 'circle',
          lineStyle,
          itemStyle: {
            color: '#65b95f'
          },
          data: fallingValueData,
          ...restData
        })
      }
      if (warning) {
        checkList.push(3)
        series.push({
          name: '警告',
          type: 'line',
          symbol: 'circle',
          lineStyle,
          data: warningValueData,
          itemStyle: {
            color: '#ff9e40'
          },
          ...restData
        })
      }
    }
  }
}
