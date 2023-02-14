import { sqliteOptions } from '@/config'

export class DB {
  constructor() {
    this.init()
  }

  init(): any {
    if (this.isOpen()) {
      return
    }
    this.openDB()
  }

  /**
   * 打开数据库没有会创建一个
   */
  openDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      plus.sqlite.openDatabase({
        ...sqliteOptions,
        success: function (e) {
          console.log('openDatabase success!', e)
          resolve(e)
        },
        fail: function (e) {
          console.log('openDatabase failed: ' + JSON.stringify(e))
          reject(e)
        }
      })
    })
  }

  /**
   * 数据库是否打开
   */

  isOpen(): Boolean {
    return plus.sqlite.isOpenDatabase(sqliteOptions)
  }

  /**
   * 关闭数据库
   * 操作结束后需要调用，避免浪费资源
   */
  closeDB(): Promise<any> {
    return new Promise((resolve, reject) => {
      plus.sqlite.closeDatabase({
        name: sqliteOptions.name,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  /**
   * 数据库建表 sql:'CREATE TABLE IF NOT EXISTS tableName("id" varchar(50),"name" TEXT)
   *  创建 CREATE TABLE IF NOT EXISTS 、 tableName 是表名，不能用数字开头、括号里是表格的表头
   */
  createTable(tableName: string, fields: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // executeSql: 执行增删改等操作的SQL语句
      plus.sqlite.executeSql({
        name: sqliteOptions.name,
        sql: [`CREATE TABLE IF NOT EXISTS ${tableName}(${fields})`],
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  createTableWithDDL(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      // executeSql: 执行增删改等操作的SQL语句
      plus.sqlite.executeSql({
        name: sqliteOptions.name,
        sql: [sql],
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  /**
   * 数据库删表 sql:'DROP TABLE tableName'
   */
  dropTable(tableName: string): Promise<any> {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: sqliteOptions.name,
        sql: [`DROP TABLE ${tableName}`],
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  /**
   * 向表格里添加数据
   * @param tableName
   * @param data
   * @param condition
   * sql:'INSERT INTO tableName VALUES('x','x','x')'   对应新增
   * 或者 sql:'INSERT INTO tableName ('x','x','x') VALUES('x','x','x')'   具体新增
   * 插入 INSERT INTO  、 tableName 是表名、根据表头列名插入列值
   */

  insertTableData(tableName: string, data: string, condition: string): Promise<any> {
    // 判断有没有传参
    if (tableName !== undefined && data !== undefined) {
      // 判断传的参是否有值
      const bol = JSON.stringify(data) === '{}'
      let sql = ''
      if (!bol) {
        if (condition == undefined) {
          sql = `INSERT INTO ${tableName} VALUES('${data}')`
        } else {
          sql = `INSERT INTO ${tableName} (${condition}) VALUES(${data})`
        }
        // console.log(sql);
        return new Promise((resolve, reject) => {
          // 表格添加数据
          plus.sqlite.executeSql({
            name: sqliteOptions.name,
            sql: [sql],
            success(e) {
              resolve(e)
            },
            fail(e) {
              reject(e)
            }
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          reject('错误添加')
        })
      }
    } else {
      return new Promise((resolve, reject) => {
        reject('错误添加')
      })
    }
  }

  /**
   * 根据条件向表格里添加数据  有数据更新、无数据插入
   * @param tableName
   * @param data
   * @param condition
   *  (建表时需要设置主键) 例如 --- "roomid" varchar(50) PRIMARY KEY
   */
  insertOrReplaceData(tableName: string, data: string, condition: string): Promise<any> {
    // 判断有没有传参
    if (tableName !== undefined && data !== undefined) {
      let sql = ''
      if (condition == undefined) {
        sql = `INSERT OR REPLACE INTO ${tableName} VALUES('${data}')`
      } else {
        sql = `INSERT OR REPLACE INTO ${tableName} (${condition}) VALUES(${data})`
      }
      // console.log(sql);
      return new Promise((resolve, reject) => {
        // 表格添加数据
        plus.sqlite.executeSql({
          name: sqliteOptions.name,
          sql: [sql],
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误添加')
      })
    }
  }

  /**
   * 查询获取数据库里的数据
   * @param tableName
   * @param lname
   * @param lvalue
   * @param cc
   * @param dd
   * sql:'SELECT * FROM tableName WHERE lname = 'lvalue''
   * 查询 SELECT * FROM 、 tableName 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
   */

  selectTableData(
    tableName: string,
    lname?: string,
    lvalue?: any,
    cc?: string,
    dd?: any
  ): Promise<any> {
    if (tableName !== undefined) {
      // 第一个是表单名称，后两个参数是列表名，用来检索
      let sql = ''
      if (lname !== undefined && cc !== undefined) {
        // 两个检索条件
        sql = `SELECT * FROM ${tableName} WHERE ${lname} = '${lvalue}' AND ${cc} = '${dd}'`
      }
      if (lname !== undefined && cc == undefined) {
        // 一个检索条件
        sql = `SELECT * FROM ${tableName} WHERE ${lname} = '${lvalue}'`
        // console.log(sql);
      }
      if (lname == undefined) {
        sql = `SELECT * FROM ${tableName}`
      }
      return new Promise((resolve, reject) => {
        // 表格查询数据  执行查询的SQL语句
        plus.sqlite.selectSql({
          name: sqliteOptions.name,
          sql: sql,
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误查询')
      })
    }
  }

  /**
   * 删除表里的数据
   * @param tableName 、
   * @param lname
   * @param lvalue
   * @param ww
   * @param ee
   * sql:'DELETE FROM tableName WHERE lname = 'lvalue''
   * 删除 DELETE FROM 、 tableName 是表名、 WHERE 查找条件 lname,lvalue 是查询条件的列名和列值
   */
  deleteTableData(
    tableName: string,
    lname?: string,
    lvalue?: any,
    ww?: string,
    ee?: any
  ): Promise<any> {
    if (tableName !== undefined) {
      let sql = ''
      if (lname == undefined) {
        sql = `DELETE FROM ${tableName}`
      } else {
        if (ww !== undefined) {
          // 两个检索条件
          sql = `DELETE FROM ${tableName} WHERE ${lname} = '${lvalue}' AND ${ww} = '${ee}'`
        } else {
          // 一个检索条件
          sql = `DELETE FROM ${tableName} WHERE ${lname} = '${lvalue}'`
        }
      }
      return new Promise((resolve, reject) => {
        // 删除表数据
        plus.sqlite.executeSql({
          name: sqliteOptions.name,
          sql: [sql],
          success(e) {
            resolve(e)
          },
          fail(e) {
            reject(e)
          }
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        reject('错误删除')
      })
    }
  }

  /**
   * 修改数据表里的数据
   * @param tableName
   * @param data
   * @param lname
   * @param lvalue
   * sql:"UPDATE tableName SET 列名 = '列值',列名 = '列值' WHERE lname = 'lvalue'"
   * 修改 UPDATE 、 tableName 是表名, data: 要修改的列名=修改后列值, lname,lvalue 是查询条件的列名和列值
   */
  updateTableData(tableName: string, data: any, lname?: string, lvalue?: any): Promise<any> {
    let sql = ''
    if (lname == undefined) {
      sql = `UPDATE ${tableName} SET ${data}`
    } else {
      sql = `UPDATE ${tableName} SET ${data} WHERE ${lname} = '${lvalue}'`
    }
    // WHERE 前面是要修改的列名、列值，后面是条件的列名、列值
    return new Promise((resolve, reject) => {
      // 修改表数据
      plus.sqlite.executeSql({
        name: sqliteOptions.name,
        sql: [sql],
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  /**
   * 获取指定数据条数
   * @param tableName
   * @param id
   * @param num
   * sql:"SELECT * FROM tableName ORDER BY 'id' DESC LIMIT 15 OFFSET 'num'"
   * tableName 表名, ORDER BY 代表排序默认正序, id 是排序的条件 DESC 代表倒序，从最后一条数据开始拿
   * LIMIT 15 OFFSET '${num}',这句的意思是跳过 num 条拿 15 条数据, num 为跳过多少条数据是动态值
   * 例 初始num设为0，就从最后的数据开始拿15条，下次不拿刚获取的数据，所以可以让num为15，这样就能一步一步的拿完所有的数据
   */

  pullSQL(tableName: string, id: string | number, num: number, count = 20): Promise<any> {
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: sqliteOptions.name,
        sql: `SELECT * FROM ${tableName} ORDER BY '${id}' ASC LIMIT ${count} OFFSET ${num}`,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  execteSql(sql: string[]): Promise<any> {
    return new Promise((resolve, reject) => {
      plus.sqlite.executeSql({
        name: sqliteOptions.name,
        sql: sql,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }

  selectSql(sql: string): Promise<any> {
    return new Promise((resolve, reject) => {
      plus.sqlite.selectSql({
        name: sqliteOptions.name,
        sql,
        success(e) {
          resolve(e)
        },
        fail(e) {
          reject(e)
        }
      })
    })
  }
}

export const db = new DB()
