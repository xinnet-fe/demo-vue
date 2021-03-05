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

      <!-- <el-dropdown class="right-menu-item hover-effect" trigger="click" @visible-change="visibleChange"> -->
      <div class="right-menu-msg hover-effect">
        <div class="msg-item" @click="handleShowMsgPop">
          <el-badge :value="unreadMsgCount" class="badge-item">
            <svg-icon icon-class="naoling" />
          </el-badge>
        </div>
        <ul v-show="msgshow" class="el-dropdown-menu el-popper dropdown-msg" style="width: 350px; padding: 20px; z-index: 10;">
          <b class="title">消息通知</b>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="全部" name="first">
              <table v-if="msgList.length">
                <tr v-for="(item, idx) in msgList" :key="idx" @click="updateStatusForItem(item.id)">
                  <td class="col1">
                    <img src="static/img/xls.png" alt="">
                  </td>
                  <td class="col2">
                    <p class="title">{{ item.name }}</p>
                    <p class="time">{{ item.createTime }}</p>
                  </td>
                  <td class="col3">
                    <el-link v-if="(item.status!=='03' && item.downloadUrl && item.downloadUrl.length)" type="primary" :href="item.downloadUrl" target="_blank" @click.stop="updateStatusForItem(item.id)">点击下载</el-link>
                    <span v-if="item.status==='03'" class="invalid">已失效</span>
                  </td>
                </tr>
              </table>
              <div v-if="msgList.length" class="tool">
                <el-link type="primary" href="javascript:;" class="clear" @click.native="updateStatus">清空</el-link>
                <el-link type="primary" href="#/boss-nav-messagemanage/index" class="more" @click.native="msgshow=false">查看更多</el-link>
              </div>
              <div v-if="!msgList.length" class="null">
                <img src="static/img/null.png" alt="">
              </div>
            </el-tab-pane>
            <!-- <el-tab-pane label="导出" name="second">
                <div class="null">
                  <img src="static/img/null.png" alt="">
                </div>
              </el-tab-pane> -->
          </el-tabs>
          <div x-arrow="" class="popper__arrow" style="left: 50%;margin-left: 15px;top: -6px;left: 50%;margin-right: 3px;border-top-width: 0;border-bottom-color: #e6ebf5;" />
        </ul>
      </div>

      <!-- </el-dropdown> -->
      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon icon-class="touxiang" class="user-avatar" />
          <span class="username">{{ user.name }}</span>
          <!-- <span class="username">陈建</span> -->
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
      resetPwdFormVisible: false,
      activeName: 'first',
      listMsg: [],
      msgshow: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'device',
      'user',
      'unreadMsgCount',
      'msgList'
    ])
  },
  mounted() {
    this.getUnreadMsgCount()
    setInterval(() => {
      this.getUnreadMsgCount()
    }, 60000)
    // this.getList()
  },
  methods: {
    handleClick() {

    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    getUnreadMsgCount() {
      this.$store.dispatch('msg/unreadMsgCount').then((res) => {
        console.log(res)
        // this.countMsg = res.count
      }).catch((error) => {
        console.log(error)
      })
    },
    // getList() {
    //   const query = {
    //     msgType: '',
    //     isShow: '01',
    //     pageNum: 1,
    //     pageSize: 6
    //   }
    //   this.$store.dispatch('msg/list', query).then((res) => {
    //     // this.listMsg = res.list
    //   }).catch((error) => {
    //     // this.$message.error('加载失败，请稍后再试或减少查询数据量')
    //     console.log(error)
    //   })
    // },

    updateStatus() {
      // alert(1)
      const query = {
        ids: this.msgList.map((v) => {
          return v.id
        }).join(','),
        updateType: '3'
      }
      this.$store.dispatch('msg/updateStatus', query).then((res) => {
        if (res.isSuccess === 1) {
          this.listMsg = []
        } else {
          this.$message.error(res.msg)
        }
      }).catch((error) => {
        // this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    updateStatusForItem(ids) {
      const query = {
        ids: ids,
        updateType: 1
      }
      this.$store.dispatch('msg/updateStatus', query).then((res) => {

      }).catch((error) => {
        // this.$message.error('加载失败，请稍后再试或减少查询数据量')
        console.log(error)
      })
    },
    handleShowMsgPop() {
      this.msgshow = !this.msgshow
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

<style lang="scss">
@import '@/styles/variables.scss';

.navbar {
  height: 50px;
  // overflow: hidden;
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
    padding-right: 20px;
    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      // padding: 0 30px 0 15px;
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
    .right-menu-msg{
      position: relative;
      display: inline-block!important;
      float: none;
      vertical-align: text-bottom;
      .badge-item{
        line-height: 20px;
      }
      .msg-item{
        padding: 0 15px;
      }
      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
      .popper__arrow::after{
        top: 1px;
        margin-left: -6px;
        border-top-width: 0;
        border-bottom-color: #FFFFFF;
      }
    }
    .avatar-wrapper {
      padding: 0 30px 0 15px;
      position: relative;
      .user-avatar {
        cursor: pointer;
        vertical-align: middle;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .username {
        display: inline-block;
        vertical-align: middle;
        font-size: 12px;
        height: 40px;
        line-height: 46px;
        color: $contentTextColor;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 22px;
        font-size: 12px;
      }
    }
  }
}
.dropdown-msg{
  // display: block!important;
  left: auto;
  right: -131px;
  top: 100%;
  transform-origin: center top;
  cursor: default;
  margin-top: 12px;
}
.dropdown-msg .el-tabs__active-bar{
  width: 24px!important;
}
.dropdown-msg .el-tabs__content{
  padding: 0px;
}
.dropdown-msg b{
  font-weight: normal;
}
.dropdown-msg .title{
  display: block;
  margin-bottom: 10px;
  line-height: 16px;
}
.dropdown-msg .el-tabs__item{
  height: 36px;
  line-height: 36px;
  font-size: 12px;
}
.dropdown-msg table{
  width: 100%;
  font-size: 12px;
  border-collapse: collapse;
}
.dropdown-msg table tr:hover td{
  background: #f5f7fa;
}
.dropdown-msg table td{
  color: #333;
  padding: 10px 0;
  line-height: 12px;
  border-bottom: 1px solid #ededed;
}
.dropdown-msg table td a{
  font-size: 12px;
  display: inline-block;
}
.dropdown-msg table .col1{
  width: 38px;
  text-align: center;
}
.dropdown-msg table .col3{
  width: 60px;
  padding-right: 10px;
  text-align: right;
}
.dropdown-msg table td p{
  margin: 0px;
  width: 200px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  line-height: 16px;
}
.dropdown-msg table td .time,
.dropdown-msg table .col3 .invalid{
  color: #999999;
}
.dropdown-msg table td .title{
  margin-bottom: 3px!important;
}
.dropdown-msg .tool{
  overflow: hidden;
  padding: 10px;
}
.dropdown-msg .tool .clear{
  float: left;
  font-size: 12px;
}
.dropdown-msg .tool .more{
  float: right;
  font-size: 12px;
}
.dropdown-msg .tool a{
  line-height: 14px;
}
.dropdown-msg .null{
  text-align: center;
  padding: 35px 0;
}
</style>
