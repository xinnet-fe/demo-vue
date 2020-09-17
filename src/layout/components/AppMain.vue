<template>
  <section class="app-main">
    <section class="app-content">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <router-view :key="key" />
        </keep-alive>
      </transition>
    </section>
  </section>
</template>

<script>
import { showLayout } from '@/settings'
import ShowLayoutMixin from '../mixin/ShowLayout'

export default {
  name: 'AppMain',
  mixins: [ShowLayoutMixin],
  data() {
    return {
      showLayout,
      appMainMargin: { margin: '20px 20px 0' }
    }
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    },
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/variables.scss';

.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: $appMainBg;
}
.app-content {
  // min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  padding: 20px;
  background-color: #ffffff;
}

.fixed-header+.app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 50 + 34 */
    height: calc(100vh - 91px);
    min-height: calc(100vh - 91px);
    overflow: auto;
  }

  .fixed-header+.app-main {
    padding-top: 91px;
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
