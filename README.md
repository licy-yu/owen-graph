# Owen Graph

Owen Graph 是一个基于 mxGraph 的图形编辑器项目。

## 项目结构

- **public/**: 包含静态资源，例如 `index.html`。
- **src/**: 包含项目的主要源代码。
  - **App.vue**: 主应用组件。
  - **main.js**: 项目入口文件。
  - **style.css**: 全局样式文件。
  - **components/**: 包含 Vue 组件，例如 `GraphEditor.vue`。
  - **utils/**: 包含工具函数，例如 `mxFactory.js`。
- **stencils/**: 包含图形模板，例如 `electrical.xml`。

## 安装与运行

1. 安装依赖：

   ```bash
   npm install
   ```

2. 启动开发服务器：

   ```bash
   npm run serve
   ```

3. 构建生产版本：

   ```bash
   npm run build
   ```

## 依赖

- [mxGraph](https://jgraph.github.io/mxgraph/): 图形编辑器核心库。
- [Vue.js](https://vuejs.org/): 前端框架。

## 贡献

欢迎提交 issue 和 pull request 来改进此项目！

## 许可证

此项目基于 MIT 许可证开源。