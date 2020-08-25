<template>
  <div :class="'box-container type' + type">
    <h3 class="box-tit clearfix">
      <div class="box-tit-left"><slot name="tit-left" /></div>
      <div class="box-tit-right"><slot name="tit-right" /></div>
    </h3>
    <div class="box-cont">
      <slot name="cont" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Box',
  props: {
    type: {
      type: String,
      default: '1'
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<style scoped>
.box-container{
  background: #fff;
}
.box-container .box-tit-left{
  float: left;
}
.box-container .box-tit-right{
  float: right;
}
.box-container .box-tit{
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  border-bottom: 1px solid #ededed;
  padding: 0;
  margin: 0 20px;
  font-weight: normal;
  position: relative;
}
.box-container .box-cont{
  padding: 30px 20px;
  font-size: 12px;
  line-height: 16px;
}
.box-container.type1 .box-tit,
.box-container.type3 .box-tit{
  padding: 0 20px;
  margin: 0px;
}
.box-container.type1 .box-tit-left::after{
  content: "";
  width: 2px;
  height: 20px;
  background: #0180cd;
  position: absolute;
  left: 0px;
  top: 50%;
  margin-top: -10px;
}
.box-container.type2 .box-tit-left{
  position: relative;
}
.box-container.type2 .box-tit-left::after{
  content: "";
  width: 100%;
  height: 2px;
  background: #0180cd;
  position: absolute;
  left: 0px;
  bottom: 0;
}
</style>
