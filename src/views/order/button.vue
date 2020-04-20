<template>
  <div class="el-button2">
    <el-button type="default">default</el-button>
    <el-button type="primary">primary</el-button>
    <el-button type="success">success</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="danger">danger</el-button>
    <el-button type="info">info</el-button>
    <!-- <p class="p1">111111111</p> -->
  </div>
</template>

<script>
// import request from '@/utils/request'

export default {
  name: 'ElButton2',
  props: {},
  data() {
    return {
      radio: 3,
      val: ''
    }
  },
  computed: {
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.el-button2 {
  margin: 20px;
  overflow: hidden;
}
.p1 {
  color: $yellow;
}
</style>
