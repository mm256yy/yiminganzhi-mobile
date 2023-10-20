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

- HBuilderX 3.7.3
- uniapp 编译器 3.7.3

这两个版本号必须一致，否则打包出来的 APP 会有问题

不定时升级版本，升级之后需要通知其他开发去更新依赖和下载新版的 HBuilderX

#### 编译器版本升级

- 升级到最新版本 npx @dcloudio/uvm@latest

- 升级到指定版本 npx @dcloudio/uvm@latest 3.2.0

### 原生插件

打印插件：收费 0 元 线上用 YanYu-PrintPDF: https://ext.dcloud.net.cn/plugin?id=1633

<!-- 收费 10 元 供测试用 da-printpdf: https://ext.dcloud.net.cn/plugin?id=7780 -->

说明：如果免费插件不可用，可购买收费插件，功能相同

### 打 APK 包

- 打开 HBuilderX 确保版本和编译器版本一致 项目目前使用的是 3.7.3 (会不定期更新版本)
- 打开项目 migrate-mobile
- 顶部工具栏-发行 选择：原生 APP-云打包
  > 由于使用了打印原生插件，需使用云打包
- 弹窗中输入内容

  - 选择安卓包
  - 包名：io.dcloud.migrate
  - 证书：使用自有证书
  - 证书别名：migrate
  - 证书密码：migrate@zdwp2023
  - 证书文件：选择项目根目录下的 migrate.keystore
  - 渠道包：不选择
  - 正式/调试包：根据需要选择
  - 广告：一个不选
  - 打包方式：传统打包和快速安全打包都可以选，推荐 快速安全打包
  - 弹窗点击确认 即可进入排队

- 等待打包完成 打包完成后自动保存到项目的"unpackage/release/apk/"目录

如下所示： ![image](https://oss.zdwp.tech/migrate/files/image/9f719efe-730c-40ec-8d77-c3c98fe55220.png)

### 目前证书相关信息

- 别名：`migrate`

- Enter keystore password: //输入证书文件密码，输入完成回车

`migrate@zdwp2023`

- Re-enter new password: //再次输入证书文件密码，输入完成回车

`migrate@zdwp2023`

- What is your first and last name?  
  // 输入名字和姓氏，输入完成回车

`移民调查`

- What is the name of your organizational unit? //输入组织单位名称，输入完成回车

`浙江省水利水电勘测设计院`

- What is the name of your organization?  
  //输入组织名称，输入完成回车

`浙江省水利水电勘测设计院`

- What is the name of your City or Locality?  
  //输入城市或区域名称，输入完成回车

`杭州市`

- What is the name of your State or Province?  
  //输入省/市/自治区名称，输入完成回车

`浙江省杭州市上城区`

- What is the two-letter country code for this unit?  
  //输入国家/地区代号（两个字母），中国为 CN，输入完成回车

`CN/HZ`

- Is CN=XX, OU=XX, O=XX, L=XX, ST=XX, C=XX correct?  
  // 确认上面输入的内容是否正确，输入 y，回车

### SHA1 码生成

在项目根目录下运行

```
keytool -v -list -keystore ./migrate.keystore
```

输入口令：

```
migrate@zdwp2023
```

### 包相关信息

- 包名: `io.dcloud.migrate`

### 问题记录

- 由于使用了 vue3，uniapp 渲染模式，渲染端 webview 最低兼容 64.0.3282.116，有部分 pad 是很老的设备，webview 版本为 43.x ，为了兼容这部分 pad，增加了腾讯 x5 webview 模块，安装 APK 时会自动弹出下载，有一定的失败率。

> 为什么不使用原生渲染？

原生开发 css 有诸多限制，不利于快速开发，为了解决 x5 下载失败的问题，尝试过全部改成.nvue 的原生渲染模式，但是 uniapp 规定必须要有一个.vue 的页面，也就是说跳不过 webview 的圈，也避免不了要增加 x5 模块的问题

- 除去房屋图片外的图片下载，暂时没有下载到本地数据库，房屋图片涉及打印，必须下载，其他图片如果下载问题点有

  - 同步时-同步处理下载 时间长
  - 同步时-异步处理下载 会卡页面，跳转不流畅

> 算一个居民户有 10M 的图，1000 个用户有接近 10G，所以不论是第一次同步时还是放本地存储都不合理

- 打包只能采用云打包，使用了安卓原生的打印插件，只能云打包
