<template>
  <div class="detail-container">
    <h3 class="detail-tit clearfix">
      <el-row>
        <el-col v-if="showLeft" :span="4"><div class="grid-content detail-tit-left"><a href="javascript:;" @click="handleToBack">&lt;	返回</a></div></el-col>
        <el-col :span="num"><div class="grid-content detail-tit-center"><slot name="tit-center" /></div></el-col>
        <el-col v-if="showRight" :span="4"><div class="grid-content detail-tit-right"><slot name="tit-right" /></div></el-col>
      </el-row>
    </h3>
    <div class="detail-cont">
      <slot name="cont" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    handleToBack: {
      type: Function,
      default: () => {}
    },
    showLeft: {
      type: Boolean,
      default: true
    },
    showRight: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    num: function() {
      return this.showLeft && this.showRight ? 16 : (this.showLeft || this.showRight ? 20 : 24)
    }
  },
  methods: {

  }
}
</script>

<style scoped>
.detail-container{
  background: #fff;
}
.detail-container .detail-tit{
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #ededed;
  padding: 0;
  padding: 0 20px;
  margin: 0px;
  font-weight: normal;
  position: relative;
}
.detail-container .detail-tit-left a{
  font-size: 14px;
  color: #333;
  text-decoration: none;
}
.detail-container .detail-tit-center{
  text-align: center;
  font-size: 18px;
}
.detail-container .detail-cont{
  padding: 30px 20px;
  font-size: 12px;
  line-height: 16px;
}

</style>
