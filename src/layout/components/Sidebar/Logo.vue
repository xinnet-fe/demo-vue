<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link center" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1> -->

        <!-- <i class="el-icon-menu sidebar-logo" /> -->
        <svg-icon icon-class="logo" />
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link center" to="/">
        <!-- <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1> -->

        <!-- <i class="el-icon-menu sidebar-logo" /> -->
        <svg-icon icon-class="logo" />
        <h1 class="sidebar-title">{{ title }} </h1>

      </router-link>
    </transition>
  </div>
</template>

<script>
import { title } from '@/settings'
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: title,
      logo: 'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;
  font-size: 22px;
  color: #fff;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    .svg-icon{
      width: 26px !important;
      height: 26px !important;
      margin: 12px 7px 0px 12px !important;
    }
    & .sidebar-logo {
      // width: 32px;
      // height: 32px;
      vertical-align: middle;
      // margin-right: 12px;
      margin-left: 16px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 15px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: top;
    }
  }

  &.collapse {
    .svg-icon{
      margin: 0px!important;
    }
    .sidebar-logo {
      margin-right: 0px;
      margin-left: 0px;
    }
  }
}
</style>
