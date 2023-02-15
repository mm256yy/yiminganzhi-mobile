/**
 * 附属物相关的 查功能
 */

import { AppendantTableName, AppendantDDLType } from '@/database'
import { Common } from './common'
import { AppendantType } from '@/types/common'

class Appendant extends Common {
  constructor() {
    super()
  }
  getList() {
    return new Promise(async (resolve, reject) => {
      try {
        const array: AppendantType[] = []
        const sql = `select * from ${AppendantTableName}`
        const list: AppendantDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Appendant-get-list-error')
        reject([])
      }
    })
  }
}

export const AppendantController = new Appendant()
