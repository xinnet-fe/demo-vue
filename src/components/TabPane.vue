<template>
  <div
    v-if="(!lazy || loaded) || active"
    v-show="active"
    :id="`pane-${paneName}`"
    :aria-labelledby="`tab-${paneName}`"
    role="tabpanel"
    :aria-hidden="!active"
    class="el-tab-pane"
  >
    <slot name="content" />
  </div>
</template>

<script>
export default {
  name: 'ElTabPane',
  componentName: 'ElTabPane',
  props: {
    /* eslint-disable */
    label: String,
    labelContent: Function,
    name: String,
    closable: Boolean,
    disabled: Boolean,
    lazy: Boolean
  },
  data() {
    return {
      index: null,
      loaded: false
    }
  },
  computed: {
    isClosable() {
      return this.closable || this.$parent.closable
    },
    active() {
      const active = this.$parent.currentName === (this.name || this.index)
      if (active) {
        /* eslint-disable */
        this.loaded = true
      }
      return active
    },
    paneName() {
      return this.name || this.index
    }
  },
  updated() {
    this.$parent.$emit('tab-nav-update')
  }
}
</script>
