/**
 * 统计数据 相关的查功能
 */

import { CollectTableName, CollectDDLType } from '@/database'
import { Common } from './common'
import { CollectType } from '@/types/common'

class Collect extends Common {
  constructor() {
    super()
  }
  getList() {
    return new Promise(async (resolve, reject) => {
      try {
        const array: CollectType[] = []
        const sql = `select * from ${CollectTableName}`
        const list: CollectDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Collect-get-list-error')
        reject([])
      }
    })
  }
}

export const CollectController = new Collect()
