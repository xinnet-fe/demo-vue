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
    // dispatch('userinfo/getUser')
    dispatch('userinfo/getSidebarMenus').then(menus => {
      dispatch('permission/generateMainRoutes', menus).then(routes => {
        router.addRoutes(routes)
      })
    })
  }
}
</script>
