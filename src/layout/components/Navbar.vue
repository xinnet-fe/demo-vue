<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />

    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <!-- <search id="header-search" class="right-menu-item" /> -->

        <!-- <error-log class="errLog-container right-menu-item hover-effect" /> -->

        <!-- <screenfull id="screenfull" class="right-menu-item hover-effect" /> -->

        <!-- <el-tooltip content="Global Size" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip> -->

        <!-- <div class="right-menu-item hover-effect">
          <el-badge is-dot class="badge-item">
            <router-link to="/">
              <svg-icon icon-class="naoling" />
            </router-link>
          </el-badge>
        </div> -->
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="touxiang" class="user-avatar" />
          <span class="username">{{ user.name }}</span>
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown">
          <!-- <router-link to="/reset-pwd/index">
            <el-dropdown-item>修改密码</el-dropdown-item>
          </router-link> -->
          <el-dropdown-item @click.native="resetPwdFormVisible = true">
            修改密码
          </el-dropdown-item>
          <el-dropdown-item @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <reset-pwd :visible.sync="resetPwdFormVisible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { hasDevelopment, logoutApi } from '@/settings'
import ResetPwd from '@/views/resetPwd/index'

export default {
  components: {
    Breadcrumb,
    Hamburger,
    ResetPwd
  },
  data() {
    return {
      username: '管理员',
      resetPwdFormVisible: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'user'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      console.log('env：' + process.env.NODE_ENV)
      console.log('logoutApi：' + logoutApi)
      if (hasDevelopment) {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      } else {
        global.location = logoutApi
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 15px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }

      .badge-item {
        height: 22px;
        line-height: 25px;
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          vertical-align: top;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .username {
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          height: 40px;
          line-height: 46px;
          color: $contentText;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -18px;
          top: 18px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
