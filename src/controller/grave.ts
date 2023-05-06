/**
 * 区划 相关的增删改查功能
 */

import { GraveTableName, GraveDDLType } from '@/database'
import { Common } from './common'
import { GraveType } from '@/types/datafill'
import { guid, getCurrentTimeStamp } from '@/utils'
import { MainType } from '@/types/common'

class Grave extends Common {
  constructor() {
    super()
  }
  getList(): Promise<GraveType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: GraveType[] = []
        const sql = `select * from ${GraveTableName}`
        const list: GraveDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'Grave-get-list-error')
        reject([])
      }
    })
  }

  getListWithLandlord(type: MainType, doorNo: string): Promise<GraveType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: GraveType[] = []
        let sql = `select * from ${GraveTableName} where isDelete = '0'`
        if (type === MainType.PeasantHousehold) {
          sql += ` and registrantDoorNo = '${doorNo}' order by updatedDate desc`
        } else if (type === MainType.Village) {
          sql += ` and doorNo = '${doorNo}' order by updatedDate desc`
        }

        const list: GraveDDLType[] = await this.db.selectSql(sql)
        if (this.isArrayAndNotNull(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'grave-get-list-error')
        reject([])
      }
    })
  }

  addGrave(item: GraveType): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!item.doorNo && !item.registrantDoorNo) {
          console.log('doorNo或者registrantDoorNo缺失')
          reject('')
          return
        }
        const uid = guid()
        item.uid = uid
        const fields =
          "'uid','registrantId','registrantDoorNo','householdId','doorNo','content','updatedDate','isDelete','status'"
        const values = `'${uid}','${item.registrantId}','${item.registrantDoorNo}','${
          item.householdId
        }','${item.doorNo}','${JSON.stringify(item)}','${getCurrentTimeStamp()}','0','modify'`

        const res = await this.db.insertTableData(GraveTableName, values, fields)

        if (res && res.code) {
          reject('')
          return
        }
        resolve(uid)
      } catch (error) {
        console.log(error, 'addGrave-error')
        reject('')
      }
    })
  }

  updateGrave(item: GraveType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!item || !item.uid) {
          reject(false)
          console.log('核心字段缺失')
          return
        }

        const values = `status = 'modify',doorNo = '${item.doorNo}',householdId = '${
          item.householdId
        }',registrantId = '${item.registrantId}',registrantDoorNo = '${
          item.registrantDoorNo
        }',content = '${JSON.stringify(item)}',updatedDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${GraveTableName} set ${values} where uid = '${item.uid}' and isDelete = '0'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject(false)
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateGrave-error')
        reject(false)
      }
    })
  }

  // 业主列表删除
  deleteGrave(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          return
        }
        const values = `status = 'modify',isDelete = '1',updatedDate = '${getCurrentTimeStamp()}'`
        const res = await this.db.updateTableData(GraveTableName, values, 'uid', uid)
        if (res && res.code) {
          reject(false)
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'deleteGrave-error')
        reject(false)
      }
    })
  }
}

export const GraveController = new Grave()
