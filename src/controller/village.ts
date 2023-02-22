/**
 * 安置意愿 相关的增删改查功能
 */

import { VillageTableName, VillageDDLType } from '@/database'
import { Common } from './common'
import { VillageType } from '@/types/common'
import { getCurrentTimeStamp, guid } from '@/utils'

class Village extends Common {
  constructor() {
    super()
  }

  // 获取全部列表
  getList(): Promise<VillageType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: VillageType[] = []
        const sql = `select * from ${VillageTableName}`
        const list: VillageDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Village-get-list-error')
        reject([])
      }
    })
  }

  // 分页查询
  getListWithPage(page = 1, pageSize = 20): Promise<VillageType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: VillageType[] = []
        const sql = `select * from ${VillageTableName} order by 'id' asc limit ${pageSize} offset ${page}`
        const list: VillageDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Village-get-list-error')
        reject([])
      }
    })
  }

  // 自然村立标 新增
  add(data: VillageType): Promise<boolean> {
    // uid: string
    // content: string
    // updatedDate: string
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const uid = guid()
        data.uid = uid
        const fields = `'uid','status','content','updateDate'`
        const values = `'${uid}','modify','${JSON.stringify(data)}','${getCurrentTimeStamp()}'`
        const res = await this.db.insertTableData(VillageTableName, values, fields)
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'addVillage-error')
        reject(false)
      }
    })
  }

  // 自然村列表修改
  update(data: VillageType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const values = `status = 'modify',content = '${JSON.stringify(
          data
        )}',updateDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${VillageTableName} set ${values} where uid = '${data.uid}'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateVillage-error')
        reject(false)
      }
    })
  }

  // 自然村列表-uid查询单个数据
  getVillageByUid(uid: string): Promise<VillageType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
        }
        const res: VillageType = await this.db.selectTableData(VillageTableName, 'uid', uid)
        if (res && res.uid) {
          resolve(res)
        }
        reject(null)
      } catch (error) {
        console.log(error, 'getVillageByUid-error')
        reject(null)
      }
    })
  }
}

export const VillageController = new Village()
