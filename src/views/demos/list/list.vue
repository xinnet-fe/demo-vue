<template>
  <div class="demo-container">
    <h3>样式1</h3>
    <ul class="el-list">
      <li v-for="(item, i) in tableData" :key="i" class="el-list-item">
        <strong class="tit"><a href="">{{ item.address }}</a></strong>
        <p class="desc">{{ item.date }}</p>
      </li>
    </ul>
    <h3>样式2</h3>
    <ul class="el-list el-list-style2">
      <li v-for="(item, i) in tableData" :key="i" class="el-list-item clearfix">
        <strong class="tit"><a href="">{{ item.address }}<br>{{ item.address }}</a></strong>
        <p class="desc">{{ item.date }}</p>
      </li>
    </ul>
    <h3>样式3</h3>
    <ul class="el-list el-list-style3 clearfix">
      <li v-for="(item, i) in tableData" :key="i" class="el-list-item clearfix">
        <strong class="tit"><a href="">{{ item.address }}</a></strong>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-02',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-04',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-01',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-08',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }, {
        date: '2016-05-06',
        name: '王小虎',
        province: '上海',
        city: '普陀区',
        address: '上海市普陀区金沙江路 1518 弄',
        zip: 200333
      }]
    }
  },
  methods: {

  }
}
</script>
<style scoped>

</style>
