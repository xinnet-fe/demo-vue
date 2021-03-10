<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import router from '@/router'

export default {
  name: 'App',
  created() {
    const { dispatch } = this.$store

    // this.when(
    //   dispatch('userinfo/getUser'),
    //   dispatch('userinfo/getSidebarMenus')
    // ).then(res => {
    //   console.log(res)
    //   const { user, menus } = res
    //   dispatch('permission/generateMainRoutes', menus, user).then(routes => {
    //     router.addRoutes(routes)
    //   })
    // })

    dispatch('userinfo/getUser')
    dispatch('userinfo/getSidebarMenus').then(menus => {
      dispatch('permission/generateMainRoutes', menus).then(routes => {
        router.addRoutes(routes)
      })
    })
  }
}
</script>
