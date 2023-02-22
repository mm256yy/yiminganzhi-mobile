/**
 * 提供项目相关的增删改查功能
 */

import { FamilyIncomeTableName, FamilyIncomeDDLType } from '@/database'
import { Common } from './common'
import { FamilyIncomeConfigType } from '@/types/common'

class FamilyIncome extends Common {
  constructor() {
    super()
  }
  getList(): Promise<FamilyIncomeConfigType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: FamilyIncomeConfigType[] = []
        const sql = `select * from ${FamilyIncomeTableName}`
        const list: FamilyIncomeDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'FamilyIncome-get-list-error')
        reject([])
      }
    })
  }
}

export const FamilyIncomeController = new FamilyIncome()
