/**
 * 提供项目相关的增删改查功能
 */

import { OtherTableName, OtherDDLType, OtherDataType } from '@/database'
import { Common } from './common'
import { OtherType } from '@/types/common'

class Other extends Common {
  constructor() {
    super()
  }
  getOtherWithType(type: OtherDataType) {
    return new Promise(async (resolve, reject) => {
      try {
        const array: OtherType[] = []
        const sql = `select * from ${OtherTableName} where type = '${type}'`
        const list: OtherDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Other-get-list-error')
        reject([])
      }
    })
  }
}

export const OtherController = new Other()
