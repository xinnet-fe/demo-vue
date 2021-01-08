<template>
  <div class="dashboard-container">
    <div class="home">
      <h1>WELCOME</h1>
      <h3>欢迎进入{{ title }}</h3>
      <div class="home-pic">
        <img
          :src="welcome"
          alt=""
        >
      </div>
    </div>
  </div>
</template>

<script>
import { title } from '@/settings'
export default {
  name: 'Dashboard',
  data() {
    return {
      title: title,
      welcome: require('@/assets/welcome/welcome.jpg')
    }
  }
}
</script>
<style lang="scss" scoped>
.dashboard-container {
  margin: 150px auto;
  text-align: center;
  color: #868686;
  height: 500px;
  .home {
    width: 500px;
    margin: 50px auto;
    h1 {
      font-size: 3rem;
      margin-bottom: 0;
      color: #7c9bc0;
    }
    h3 {
      font-size: 1rem;
      margin-top: 6px;
      color: #5b697c;
    }
    .home-pic {
      width: 400px;
      height: 260px;
      margin: 40px auto;
      img {
        width: 436px;
        height: 328px;
      }
    }
  }
}
</style>

