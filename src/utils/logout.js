import { hasDevelopment, logoutApi } from '@/settings'

export async function logout(self) {
  if (hasDevelopment) {
    await self.$store.dispatch('user/logout')
    self.$router.push(`/login?redirect=${this.$route.fullPath}`)
  } else {
    global.location = logoutApi
  }
}
