## 说明

- 本文档便于新人接手项目，能快速理解项目构造

- git 地址

https://zdwp.coding.net/p/migrate/d/migrate-mobile/git

- 本项目为安卓端离线 APP 应用，不上架到任何平台，采用的是应用内更新的机制

## 友情提示

接手 pad 项目，需认真阅读 uni-app 官方文档，一个细节都不要放过，重点关注以下问题：

- 整个项目文件和 把项目下 src 文件 拖入 HBuildX，运行和云发布有什么区别？
- HBuildX 的版本 和 编译器版本 为何要保持版本一致
- 云打包流程

## 分支说明

- master 即为线上分支，有相关权限管理

> app 项目没有测试环境一说，任何功能的测试都是功能分支打上测试包 或者 开发包更新后，给测试人员测好

- 任何 功能开发/bug 修复 都是在`master`新切一个分支进行
- 特别说明：`feature/implement`分支为 ==移民实施功能==的分支，暂时未上线，后期测试好后，需要合并到 master 发布

## 项目发布

发布步骤：

- 经过测试后的功能分支 feature/xxx 合并到 master
- 切换到 master 分支
- 确认 `src/config/env` 下的接口环境 为 ==`prod`==
- 修改 `manifest.json` 中的版本号，比线上版本号 ==+1==
- 打开 `HBuildX` 开始云打包

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

- 等待打包完成 打包完成后自动保存到项目的"unpackage/release/apk/"目录，注意是 src 打包和 整个项目目录 打包的产出不同。
- 使用 mg-admin 登陆线上后台管理系统 https://ym.zhym.net.cn/admin.html#/System/AppVersion/Index
- 发布新版
- 必要信息填写
  - 标题：写上名称
  - 更新日志： 参考已发布的版本填写，用 shift+enter 分行
  - apk：==上传打包后的.apk 文件==，注意不要选错
  - 版本号：==manifest.json 中的版本号==
  - 平台：安卓
  - 上线发行：控制是否真正将新版本推送给用户，勾选后，为==立即发布==
  - 备注：给发布者自己看的，可以填写一些备忘信息
- 点击确认后 即可发布
- master 分支代码打上 tag，方便线上出现问题能及时回退到上一版本，每一次发布都需要打 tag，可在 代码仓库/版本中创建一个版本。

==开发之前== 需要先云打包一个调试包，方便开发时真机调试

## 同步逻辑

> 本段主要针对同步逻辑作出说明，方便接手

- `src/sync`: 同步逻辑文件

  - `src/sync/index`: 导出口/入口
  - `src/sync/pull`: 从后端数据库拉取数据的相关处理类
  - `src/sync/push`: 向后端数据库推送数据的相关处理类
  - `src/sync/api`: pad 端同步过程中与后端交互的接口存放

- `src/component/Sync/Index`: 同步逻辑挂载组件

  > 项目切换页面和数据同步页面复用此逻辑

- 同步涉及相关`java`接口

  ```
  https://r7r-ai.zdwp.net/swagger-ui/index.html#/pad 接口
  ```

- 推送注意事项

  实物调查阶段：数据是真删除 pad 数据使用字段 isPadDelete 标记，推送时方便统计需要删除的数据，并告知 Java 端真删除移民实施阶段：数据是假删除 pad 端和 java 端 使用字段 isDelete 标记

- 同步原则

先推再拉，遇到两个人修改一个用户的数据的情况 是 后推的覆盖先推的

同步为本系统最复杂的功能，每次都要充分测试，改动代码需要整个流程都熟悉后，建议熟读代码逻辑，注意代码执行流程，谨慎修改

## pad 端后端代码文件说明

- `src/database`: 数据库核心文件夹

  - `src/database/tables`: 存放所有的表，建表语句以及表字段
  - `src/database/dbCore`: 操作 sqlite 方法集
  - `src/database/index`: 导出口/入口

- `src/controller`: 接口处理函数集合

  - `src/controller/index`: 导出口/入口
  - `src/controller/landlord`: 实物调查阶段-调查对象处理函数
  - `src/controller/landlordDataFill`: 实物调查阶段-调查对象填报处理函数
  - `src/controller/impLandlord`: 移民实施阶段-调查对象处理函数
  - `src/controller/impLandlordDataFill`: 移民实施阶段-调查对象填报处理函数
  - `src/controller/print`: 打印 pdf 相关处理函数
  - `src/controller/common`: 公共继承体处理函数
  - 其他文件：为各个模块的处理函数

- `src/service`: 对外提供接口的方法集

  - `src/service/index`: 导出口/入口
  - `src/service/landlord`: 实物调查阶段-调查对象相关接口
  - `src/service/datafill`: 实物调查阶段-调查对象填报相关接口
  - `src/service/implandlord`: 移民实施阶段-调查对象相关接口
  - `src/service/impdatafill`: 移民实施阶段-调查对象填报相关接口
  - 其他文件：为单个功能模块的接口

- image 表特别说明

由于用户上传的图片需要在 pad 本地文件存储，便于离线情况进行查看，所以退出登录时没有对 image 表做清理，后期拓展表字段，需考虑老版本无新扩展字段会报错的情况

- 其他说明：开发者需要对 SQLite 有一定的熟悉

- ==文件名中带有 `eva` 的为资产评估相关模块==
- ==文件名中带有 `imp` 的为移民实施相关模块==

## 退出登录

pad 端每次拉取的数据为单个项目的所有数据，在退出登录后需要对数据做清理工作，主要清理内容：

- 数据库除去 image 表的所有表
- storage 里的所有数据

## 打印模块

> `src/print` 文件夹内即为所有关于生成 pdf 的逻辑处理

pad 端和 pc 端的 pdf 生成技术方案为 `pdfmake`,

- 文档地址：https://pdfmake.github.io/docs/0.3/

- 预览链接：http://pdfmake.org/playground.html

项目文件说明：

- `src/print/index`: 导出口/入口
- `src/print/template`: 所有生成 pdfmake 相关配置文件的模块
- `src/print/common`: 存放公共内容
- `src/print/core`: 核心处理类
- `src/print/config`: 配置文件

生成 pdf 的业务组件为 `src/components/Header/Index`，uniapp 不支持操作 dom，所以 pdf 生成逻辑需放在 `renderjs` 中，具体看 uniapp 关于 renderjs 的文档

调用打印服务的为第三方原生安卓插件，负责调用起系统的打印机

## 离线技术方案

#### uni-app 存储

- uni-app 的存储方案比 5+app 要少，因为 cookie、localstorage、sessionstorage、websql、indexedDB 只有 h5 端支持，其他端都不支持。
  - uni.storage 的键值对存储，这个是全端支持的。 uni-app 的 Storage 在不同端的实现不同，uni.storage 在 app 侧，映射为 plus.storage；h5 侧映射为 localstorage；各个小程序平台映射为其自带的 storage 键值对存储：
  - H5 端为 localStorage，浏览器限制 5M 大小，是缓存概念，可能会被清理
  - App 端为原生的 plus.storage，无大小限制，不是缓存，持久化各个小程序端为其自带的 storage api，数据存储生命周期跟小程序本身一致，即除用户主动删除或超过一定时间被自动清理，否则数据都一直可用。
  - 微信小程序单个 key 允许存储的最大数据长度为 1MB，所有数据存储上限为 10MB。支付宝小程序单条数据转换成字符串后，字符串长度最大 200\*1024。同一个支付宝用户，同一个小程序缓存总上限为 10MB。百度、头条小程序文档未说明大小限制

app 端还支持 2 种方案 使用 plus.io 访问文件系统 使用 plus.sqlite 访问数据库

#### 为什么要用 SQLite

- 不需要一个单独的服务器进程或操作的系统（无服务器的）。
- SQLite 不需要配置，这意味着不需要安装或管理。
- 一个完整的 SQLite 数据库是存储在一个单一的跨平台的磁盘文件。
- SQLite 是非常小的，是轻量级的，完全配置时小于 400KiB，省略可选功能配置时小于 250KiB。
- SQLite 是自给自足的，这意味着不需要任何外部的依赖。
- SQLite 事务是完全兼容 ACID 的，允许从多个进程或线程安全访问。
- SQLite 支持 SQL92（SQL2）标准的大多数查询语言的功能。
- SQLite 使用 ANSI-C 编写的，并提供了简单和易于使用的 API。
- SQLite 可在 UNIX（Linux, Mac OS-X, Android, iOS）和 Windows（Win32, WinCE, WinRT）中运行。

- SQLite 缺点前端需要会一些简单的数据库增删改查，当然也可以求助后端同学
