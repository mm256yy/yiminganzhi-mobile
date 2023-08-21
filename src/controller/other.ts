/**
 * 提供项目相关的增删改查功能
 */

import { OtherTableName, OtherDDLType, OtherDataType } from '@/database'
import { Common } from './common'

class Other extends Common {
  constructor() {
    super()
  }
  getOtherWithType(type: OtherDataType): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select * from ${OtherTableName} where type = '${type}'`
        const result: OtherDDLType[] = await this.db.selectSql(sql)
        console.log('result:', result)
        if (result && result[0]) {
          resolve(
            type === OtherDataType.PullTime ? result[0].content : JSON.parse(result[0].content)
          )
          return
        }
        reject(null)
      } catch (error) {
        console.log(error, 'Other-get-list-error')
        reject(null)
      }
    })
  }
}

export const OtherController = new Other()
