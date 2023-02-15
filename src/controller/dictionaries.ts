/**
 * 提供项目相关的增删改查功能
 */

import { DictionariesTableName, DictionariesDDLType } from '@/database'
import { Common } from './common'
import { DictConfigType } from '@/types/common'

class Dictionaries extends Common {
  constructor() {
    super()
  }
  getDictObj() {
    return new Promise(async (resolve, reject) => {
      try {
        const array: any[] = []
        const sql = `select * from ${DictionariesTableName}`
        const list: DictionariesDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }

        const dictObj: any = {}
        array.forEach((item) => {
          // 使用Id作为key 保证唯一 避免name作为key改动时影响页面
          dictObj[item.id as number] = (item.dictValList || []).map((dictItem: any) => {
            return {
              label: dictItem.label,
              value: dictItem.value
            }
          })
        })
        resolve(dictObj)
      } catch (error) {
        console.log(error, 'Dictionaries-get-Object-error')
        reject({})
      }
    })
  }
}

export const DictionariesController = new Dictionaries()
