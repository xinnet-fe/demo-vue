import echarts from 'echarts'
import reduce from 'lodash/reduce'
import forEach from 'lodash/forEach'
import CustomChartHead from '@/components/CustomChartHead'

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
    this.chart.on('click', this.getChart.bind(self))

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
    }
  }
}
