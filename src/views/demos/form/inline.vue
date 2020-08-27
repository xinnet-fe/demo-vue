<template>
  <div class="demo-container">
    <h3>行内表单</h3>
    <el-form :inline="true" :model="formInline">
      <el-form-item label="文本框">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="下拉选择">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="下拉多选">
        <el-select v-model="form.value" multiple collapse-tags placeholder="请选择">
          <el-option
            v-for="item in form.options2"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="级联">
        <el-cascader
          v-model="form.value"
          :options="form.options"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="计数器">
        <el-input-number v-model="form.num" :min="1" :max="10" label="描述文字" @change="handleChange" />
      </el-form-item>
      <el-form-item label="时间">
        <el-time-select
          v-model="form.time"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
          placeholder="选择时间"
        />
      </el-form-item>
      <el-form-item label="任意时间">
        <el-time-picker
          v-model="form.value2"
          is-range
          arrow-control
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        />
      </el-form-item>
      <el-form-item label="日期">
        <el-date-picker
          v-model="form.value3"
          type="date"
          placeholder="选择日期"
        />
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="form.value3"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="即时配送">
        <el-switch v-model="form.delivery" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="medium" @click="onSubmit">查询</el-button>
        <el-button size="medium" @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        value: [],
        value1: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value2: [new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)],
        value3: '',
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        num: 1,
        time: '',
        startTime: '',
        endTime: '',
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }],
        options2: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    },
    onReset() {
      console.log('reset!')
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>
<style scoped>
</style>
