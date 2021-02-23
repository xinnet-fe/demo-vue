const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.userinfo.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.userinfo.user.roles,
  permissions: state => state.userinfo.user.permissions,
  user: state => state.userinfo.user,
  menus: state => state.userinfo.menus,
  permission_routes: state => state.permission.routes,
  demo_permission_routes: state => state.permission.demoRoutes,
  main_permission_routes: state => state.permission.mainRoutes,
  main_sidebar: state => state.permission.sidebar,
  errorLogs: state => state.errorLog.logs,
  loading: state => state.loading
}
export default getters
