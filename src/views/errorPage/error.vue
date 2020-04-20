<template>
  <div class="error-container">
    <img :src="imgUrl" alt="">
    <p>{{ text }}</p>
    <el-button class="btn" @click="back">
      返回首页
    </el-button>
  </div>
</template>
<script>
export default {
  name: 'Error',
  props: {
    text: {
      type: String,
      required: true
    },
    imgUrl: {
      type: String,
      required: true
    }
  },
  methods: {
    back() {
      if (this.$route.query.noGoBack) {
        this.$router.push({ path: '/dashboard' })
      } else {
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss">
.error-container {
  width: 300px;
  margin: 150px auto;
  text-align: center;
  img {
    width: 204px;
    height: 188px;
  }
  p {
    margin: 50px 0;
  }
  .btn {
    background: #0180cd;
    color: #fff;
    text-align: center;
    width: 205px;
    border-radius: 0;
  }
}
</style>
