## 同步说明

> 本文主要针对同步逻辑作出说明，方便接手

## pad 端后端代码文件说明

- `src/database`: 数据库核心文件夹

  - `src/database/tables`: 存放所有的表，建表语句以及表字段
  - `src/database/dbCore`: 操作 sqlite 方法集
  - `src/database/index`: 入口文件

- `src/controller`: 接口处理函数集合
