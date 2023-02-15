/**
 * 安置意愿 相关的增删改查功能
 */

import { ResettlementTableName, ResettlementDDLType } from '@/database'
import { Common } from './common'
import { WillConfigType } from '@/types/common'

class Resettlement extends Common {
  constructor() {
    super()
  }
  getList() {
    return new Promise(async (resolve, reject) => {
      try {
        const array: WillConfigType[] = []
        const sql = `select * from ${ResettlementTableName}`
        const list: ResettlementDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Resettlement-get-list-error')
        reject([])
      }
    })
  }
}

export const ResettlementController = new Resettlement()
