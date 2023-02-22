/**
 * 提供业主相关的增删改查功能
 */

import { LandlordTableName, LandlordDDLType } from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/sync'
import { guid, getCurrentTimeStamp } from '@/utils'
import { LandlordQuery, MainType } from '@/types/common'

export class Landlord extends Common {
  constructor() {
    super()
  }

  // 获取业主列表
  getList(type: MainType): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: LandlordType[] = []
        const sql = `select * from ${LandlordTableName} where isDelete = '0' and type = '${type}'`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'landlord-get-list-error')
        reject([])
      }
    })
  }

  // 获取业主列表
  getListWithPage(type: MainType, page: number, pageSize = 20): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: LandlordType[] = []
        const sql = `select * from ${LandlordTableName} where isDelete = '0' and type = '${type}' order by 'id' asc limit ${pageSize} offset ${page}`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'getLandlordListWithPage-error')
        reject([])
      }
    })
  }

  // 根据上报时间/上报人/名称搜索
  getSubmitList(data: LandlordQuery): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject([])
        }
        const { name, timeArray, userId } = data
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordTableName} where isDelete = '0'`
        if (name) {
          sql += ` and name = '${name}'`
        }
        if (timeArray && timeArray.length) {
          if (timeArray.length === 1) {
            sql += ` and reportDate = '${timeArray[0]}'`
          } else if (timeArray.length === 2) {
            sql += ` and reportDate Between '${timeArray[0]}' and '${timeArray[1]}'`
          }
        }
        if (userId) {
          sql += ` and reportUser = '${userId}'`
        }
        console.log(sql, 'sql 语句')
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'getSubmitList-error')
        reject([])
      }
    })
  }

  // 业主立标 新增
  addLandlord(landlord: Omit<LandlordType, 'id' | 'uid'>): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const data: any = landlord
        if (!data || data.uid) {
          console.log('数据为空或者uid已经存在')
          reject('')
        }
        const uid = guid()
        data.uid = uid
        data.demographicList = data.demographicList || []
        data.immigrantAppendantList = data.immigrantAppendantList || []
        data.immigrantGraveList = data.immigrantGraveList || []
        data.immigrantHouseList = data.immigrantHouseList || []
        data.immigrantIncomeList = data.immigrantIncomeList || []
        data.immigrantTreeList = data.immigrantTreeList || []
        data.immigrantWillList = data.immigrantWillList || []
        data.immigrantFile = data.immigrantFile || []
        data.immigrantManagementList = data.immigrantManagementList || []
        data.immigrantEquipmentList = data.immigrantEquipmentList || []
        data.immigrantFacilitiesList = data.immigrantFacilitiesList || []

        const fields = `'uid','status','content','updateDate'`
        const values = `'${uid}','modify','${JSON.stringify(data)}','${getCurrentTimeStamp()}'`
        const res = await this.db.insertTableData(LandlordTableName, values, fields)
        console.log('插入结果', res)
        if (res && res.code) {
          reject('')
        }
        resolve(uid)
      } catch (error) {
        console.log(error, 'addLandlord-error')
        reject('')
      }
    })
  }

  // 业主列表修改
  updateLandlord(data: LandlordType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const values = `status = 'modify',content = '${JSON.stringify(
          data
        )}',updateDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}' and isDelete = '0'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateLandlord-error')
        reject(false)
      }
    })
  }

  // 业主列表删除
  deleteLandlord(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
        }
        const values = `status = 'modify',isDelete = '1',updateDate = '${getCurrentTimeStamp()}'`
        const res = await this.db.updateTableData(LandlordTableName, values, 'uid', uid)
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'deleteLandlord-error')
        reject(false)
      }
    })
  }

  // 业主列表-uid查询单个数据
  getLandlordByUid(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
        }
        const res: LandlordType = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid,
          'isDelete',
          '0'
        )
        if (res && res.uid) {
          if (res.demographicList && res.demographicList.length) {
            res.demographicList = res.demographicList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }
          if (res.immigrantAppendantList && res.immigrantAppendantList.length) {
            res.immigrantAppendantList = res.immigrantAppendantList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }
          if (res.immigrantGraveList && res.immigrantGraveList.length) {
            res.immigrantGraveList = res.immigrantGraveList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }
          if (res.immigrantHouseList && res.immigrantHouseList.length) {
            res.immigrantHouseList = res.immigrantHouseList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }
          if (res.immigrantIncomeList && res.immigrantIncomeList.length) {
            res.immigrantIncomeList = res.immigrantIncomeList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }
          if (res.immigrantTreeList && res.immigrantTreeList.length) {
            res.immigrantTreeList = res.immigrantTreeList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }

          if (res.immigrantWillList && res.immigrantWillList.length) {
            res.immigrantWillList = res.immigrantWillList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }
          if (res.immigrantFile && res.immigrantFile.length) {
            res.immigrantFile = res.immigrantFile.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }

          resolve(res)
        }
        reject(null)
      } catch (error) {
        console.log(error, 'getLandlordByUid-error')
        reject(null)
      }
    })
  }
}

export const LandlordController = new Landlord()
