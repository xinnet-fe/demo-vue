<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import router from '@/router'
import { mapState } from 'vuex'

export default {
  name: 'App',
  created() {
    const { dispatch } = this.$store
    dispatch('userinfo/getUser').then(() => {
      // console.log('userinfo_user=', this.userinfo_user)
      // console.log('router', this.$route)
      // 如果当前用户没有权限退费，则提示
      const { permissions } = this.userinfo_user
      const { name } = this.$route
      if (name === 'Refund') {
        permissions.some(item => {
          // const arr = item.split(':')
          // console.log('item=', arr)
        })
      }
    })
    dispatch('userinfo/getSidebarMenus').then(menus => {
      dispatch('permission/generateMainRoutes', menus).then(routes => {
        router.addRoutes(routes)
      })
    })
  },
  computed: {
    ...mapState({
      userinfo_user: state => state.userinfo.user
    })
  }
}
</script>
