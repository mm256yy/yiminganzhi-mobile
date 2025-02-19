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
  getDictObj(): Promise<{ [key: number]: any[] }> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: DictConfigType[] = []
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
              text: dictItem.label,
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
  getDictObjs(data: any): Promise<{ [key: number]: any[] }> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: DictConfigType[] = []
        const sql = `select * from ${DictionariesTableName}`
        const list: DictionariesDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }

        let dictObj: any = []
        dictObj = array.reduce((pre: any, cur: any) => {
          if (data.includes(cur.id)) {
            pre.push({
              text: cur.name, value: cur.id, children: cur.dictValList.map((dictItem: any) => {
                return {
                  text: dictItem.label,
                  value: dictItem.value
                }
              })
            })
          }
          return pre
        }, [])
        resolve(dictObj)
      } catch (error) {
        console.log(error, 'Dictionaries-get-Object-error')
        reject({})
      }
    })
  }
}

export const DictionariesController = new Dictionaries()
