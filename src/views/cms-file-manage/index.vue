<template>
  <iframe frameborder="0" class="elfinder" :src="`${path}elfinder.html`" />
</template>

<script>
// import { hasDevelopment } from '@/settings'

export default {
  name: 'CmsFileManage',
  cname: '文件资源管理器',
  data() {
    return {
      // path: hasDevelopment ? '/' : '/xcms/admin/'
      path: '/'
    }
  }
}
</script>

<style scoped lang="scss">
.elfinder {
  width: calc(100vw - 250px);
  height: calc(100vh - 130px);
  min-height: calc(100vh - 130px);
}
</style>
