<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar v-if="showLayout" class="sidebar-container" />
    <div :class="{hasTagsView:needTagsView, hideLayout:!showLayout}" class="main-container" :style="[!showLayout ? leftSidebar : '']">
      <div :class="{'fixed-header':fixedHeader}" class="main-breadcrumb">
        <navbar v-if="showLayout" />
        <tags-view v-if="showLayout && needTagsView" />
      </div>

      <app-main v-show="!$route.meta.url" />
      <static-page
        v-for="item in iframeRoutes"
        v-show="showIframe(item)"
        :key="item.name"
        :url="item.meta.url"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { AppMain, Navbar, Sidebar, TagsView } from './components'
import StaticPage from '@/views/staticPage'
import ResizeMixin from './mixin/ResizeHandler'
import ShowLayoutMixin from './mixin/ShowLayout'
import { filterIframeRoutes } from '@/store/modules/permission'
import { showLayout } from '@/settings'

export default {
  name: 'Layout',
  components: {
    StaticPage,
    AppMain,
    Navbar,
    Sidebar,
    TagsView
  },
  mixins: [ResizeMixin, ShowLayoutMixin],
  data() {
    return {
      showLayout,
      leftSidebar: { marginLeft: 0 }
    }
  },
  computed: {
    ...mapGetters([
      'main_permission_routes'
    ]),
    ...mapState({
      sidebar: state => state.app.sidebar,
      device: state => state.app.device,
      showSettings: state => state.settings.showSettings,
      needTagsView: state => state.settings.tagsView,
      fixedHeader: state => state.settings.fixedHeader
    }),
    classObj() {
      return {
        // hideSidebar: !this.sidebar.opened,
        // openSidebar: this.sidebar.opened,
        hideSidebar: false,
        openSidebar: true,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    },
    iframeRoutes() {
      return filterIframeRoutes(this.main_permission_routes)
    }
  },
  methods: {
    showIframe(route) {
      return this.$route.meta && route.meta && this.$route.meta.url === route.meta.url
    },
    handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";
  @import "~@/styles/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
</style>
