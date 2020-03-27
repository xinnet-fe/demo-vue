<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <el-submenu ref="subMenu" index="demos" popper-append-to-body>
          <template slot="title">
            <item icon="list" title="Demos" />
          </template>
          <sidebar-item v-for="route in demo_permission_routes" :key="route.path" :item="route" :base-path="route.path" />
        </el-submenu>
        <sidebar-item v-for="route in main_permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import Item from './Item'

export default {
  components: { SidebarItem, Logo, Item },
  computed: {
    ...mapGetters([
      'demo_permission_routes',
      'main_permission_routes',
      'sidebar'
    ]),
    activeMenuNull() {
      return 'demos'
    },
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
