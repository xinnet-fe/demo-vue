<template>
  <div class="">
    <Search @changeTab="changeTab" />
    <div>
      列表
    </div>
  </div>
</template>

<script>
import Search from '@/components/operation-system/search.vue'

export default {
  components: {
    Search
  },
  methods: {
    changeTab(payload) {
      console.log('changeTab->payload:', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
