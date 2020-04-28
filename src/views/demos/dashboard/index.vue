<template>
  <div class="dashboard-container">
    <div class="home">
      <h1>WELCOME</h1>
      <h3>欢迎进入牧野管理平台</h3>
      <div class="home-pic">
        <img
          :src="welcome"
          width="100%"
          height="260px"
          alt=""
        >
      </div>
    </div>
    <!-- <component :is="currentRole" /> -->
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

// import adminDashboard from "./admin";
// import editorDashboard from "./editor";

export default {
  name: 'Dashboard',
  // components: { adminDashboard, editorDashboard },
  data() {
    return {
      welcome: require('@/assets/welcome/welcome.jpg')
      // currentRole: 'adminDashboard'
    }
  },
  computed: {
    // ...mapGetters(["roles"])
  },
  created() {
    // if (!this.roles.includes("admin")) {
    // this.currentRole = 'editorDashboard'
    // }
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
     h3{
      font-size: 14px;
    }
    .home-pic{
      width: 400px;
      height: 260px;
      margin: 90px auto;
      img{
        width: 100%;
        height:auto;
      }
    }
  }
}
</style>
