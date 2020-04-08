## 功能

```
- 登录 / 注销

- 权限验证
  - 页面权限
  - 指令权限
  - 权限配置
  - 二步登录

- 多环境发布
  - dev sit stage prod

- 全局功能
  - 国际化多语言
  - 多种动态换肤
  - 动态侧边栏（支持多级路由嵌套）
  - 动态面包屑
  - 快捷导航(标签页)
  - Svg Sprite 图标
  - 本地/后端 mock 数据
  - Screenfull全屏
  - 自适应收缩侧边栏

- 编辑器
  - 富文本
  - Markdown
  - JSON 等多格式

- Excel
  - 导出excel
  - 导入excel
  - 前端可视化excel
  - 导出zip

- 表格
  - 动态表格
  - 拖拽表格
  - 内联编辑

- 错误页面
  - 401
  - 404

- 組件
  - 头像上传
  - 返回顶部
  - 拖拽Dialog
  - 拖拽Select
  - 拖拽看板
  - 列表拖拽
  - SplitPane
  - Dropzone
  - Sticky
  - CountTo

- 综合实例
- 错误日志
- Dashboard
- 引导页
- ECharts 图表
- Clipboard(剪贴复制)
- Markdown2html

- el
  - 订单管理
  - table
```

## 开发

```bash
# 克隆项目
git clone https://github.com/xinnet-fe/demo-vue.git

# nodejs版本
建议使用v10.17.0

# 进入项目目录
cd demo-vue

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:9527

## 目录结构
```
- mock 模拟数据
  - mockjs 参考：http://mockjs.com/
- src 开发目录
  - api action
  - assets 资源
  - components 组件
  - directive 指令
  - filters 过滤器
  - icons element-icons
  - layout 头、边栏公用部分
  - router 路由
  - store 全局数据
    - 全局loading 参考：https://www.ahwgs.cn/vuex-loading-plugin.html
  - styles 全局样式
  - utils 工具类
    - request.js ajax请求
      - 基于axios 参考：https://github.com/axios/axios
  - views 视图
  - main.js 入口文件
  - permission.js 权限文件
  - settings.js 配置文件
- tests 测试目录
- vue.config.js 环境配置文件
  - vue-cli-service 参考：https://cli.vuejs.org/zh/guide/cli-service.html
- element-ui 参考：https://element.eleme.cn/#/zh-CN
```

## demo
```
- 可参考订单查询
- 1.添加router -> modules -> order.js，并在index中引入
- 2.添加views -> el -> index.vue
- 3.添加api -> order.js
- 4.添加store -> modules -> order.js
```

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## Browsers support

Modern browsers and Internet Explorer 10+.

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](https://godban.github.io/browsers-support-badges/)</br>Safari |
| --------- | --------- | --------- | --------- |
| IE10, IE11, Edge| last 2 versions| last 2 versions| last 2 versions
