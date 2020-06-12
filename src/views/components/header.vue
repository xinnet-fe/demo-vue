<!--
 * @Author: your name
 * @Date: 2020-06-02 16:33:12
 * @LastEditTime: 2020-06-12 11:45:33
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \202003-xinnet-webd:\works\demo-vue\src\views\components\header.vue
--> 
<template>
  <div class="agent-header">
    <el-row class="row-cont">
      <el-col :span="12">
        <a href="http://www.xinnet.com" target="_blank" rel="noopener noreferrer">
          <img src="static/img/logo.png" alt="">
        </a>
      </el-col>
      <el-col :span="12"></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
    name: 'agent-footer',
  data() {
    return {
    }
  },
  computed: {
  },
  watch: {
  }
}
</script>
<style scoped>
  .agent-header{
    height: 58px;
    line-height: 58px;
    background: #000;
  }
  .agent-header .row-cont{
    max-width: 1200px;
    margin: 0 auto;
  }
</style>
