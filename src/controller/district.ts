/**
 * 区划 相关的增删改查功能
 */

import { DistrictTableName, DistrictDDLType } from '@/database'
import { Common } from './common'
import { DistrictType } from '@/types/common'

class District extends Common {
  constructor() {
    super()
  }
  getList(): Promise<DistrictType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: DistrictType[] = []
        const sql = `select * from ${DistrictTableName}`
        const list: DistrictDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'District-get-list-error')
        reject([])
      }
    })
  }
}

export const DistrictController = new District()
