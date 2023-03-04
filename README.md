### 准备开发环境

- vscode
- node 16.x
- yarn
- HBuilderX [下载](https://hx.dcloud.net.cn/README)
- APP 模拟器 [模拟器安装说明](https://uniapp.dcloud.net.cn/tutorial/run/installSimulator.html) ==必看== ✅
- vue-cli 全局安装
  - `npm install -g @vue/cli@4`

### 开发前阅读

本项目是通过 vue-cli 命令行安装，不同于使用 HBuilderX 下载的模版，具体可以参考官方文档

[不同安装方式的区别](https://uniapp.dcloud.net.cn/quickstart-cli.html) ==必看== ✅

说明：

- 大部分前端开发基本都使用的是 vscode，相关配置插件 都已经下载好了，也比较习惯，没必要为了项目强行使用 `HBuilderX` 开发，但是本项目是 APP 项目，在运行调试和发布上也需要依赖 `HBuilderX` ，所以推荐使用 vscode 作为开发工具，HBuilderX 作为调试和发版工具。
- 大家 vscode 上已经安装的插件利于代码规范，而 HBuilderX 需要重新下载安装

如需使用 `HBuilderX` 作为开发工具，需安装插件

- eslint-js
- eslint-vue
- prettier
- scss/sass
- stylelint

[具体安装参考](https://hx.dcloud.net.cn/Tutorial/extension/validate-stylelint)

### 进入开发

- 初始化：`yarn`
- 运行到平台：`yarn dev:xxx`
- 构建：`yarn build:xxx`

说明：

- 熟悉 APP 与 H5 平台差异后，快速开发页面建议使用 `dev:h5` 作为预览平台，但是完成后也需要在 APP 平台运行看看，避免兼容问题
- 使用 vscode 开发，HbuilderX 调试时，vscode 不需要运行命令，任何文件改动都会自动构建并在模拟器上重启 APP

### 开发调试

- 模拟器调试
  - 使用 HBuilderX 打开项目`src`目录 或 项目根目录（编译配置的差异）
  - 点击运行按钮，运行到对应平台的模拟器
  - 选择模拟器，正常会打开模拟器界面
  - 使用 vscode 改变代码文件保存，模拟器会自动重新运行

[![Wechat-IMG788.jpg](https://i.postimg.cc/cHXWYHQh/Wechat-IMG788.jpg)](https://postimg.cc/JDDSCRYH)

- [真机调试](https://uniapp.dcloud.net.cn/tutorial/run/run-app.html)

> 自 2022 年 9 月 14 日起 iOS 真机设备不再支持使用标准真机运行基座，详情见论坛公告：https://ask.dcloud.net.cn/article/40041

- [debug](https://uniapp.dcloud.net.cn/tutorial/debug/debug-app.html)

### 代码约束

- pages 文件夹统一小写：文件路基就是路由，路由大写不太友好
- components 公共组件统一大写
- 支持在文件夹内使用 index.ts 导出本文件夹内其他模块导出的所有变量方法
- 一个页面为一个模块 对应一个
  - 类型文件
  - 接口文件
  - 组件入口文件
  - 组件文件夹
  - 配置文件
- src 目录下的文件夹都为公共内容

### GitCommit

- `feat` 新功能
- `fix` 修补 bug
- `docs` 文档
- `style` 格式、样式(不影响代码运行的变动)
- `refactor` 重构(即不是新增功能，也不是修改 BUG 的代码)
- `perf` 优化相关，比如提升性能、体验
- `test` 添加测试
- `build` 编译相关的修改，对项目构建或者依赖的改动
- `ci` 持续集成修改
- `chore` 构建过程或辅助工具的变动
- `revert` 回滚到上一个版本
- `workflow` 工作流改进
- `mod` 不确定分类的修改
- `wip` 开发中
- `types` 类型

### 版本问题

- HBuilderX 3.6.18
- uniapp 编译器 3.6.18

这两个版本号必须一致，否则打包出来的 APP 会有问题
