/**
 * 提供居民户相关的增删改查功能
 */

import { LandlordTableName, LandlordDDLType } from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/sync'
import { guid, getCurrentTimeStamp } from '@/utils'

export class Landlord extends Common {
  constructor() {
    super()
  }

  // 获取居民户列表
  getList(): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: LandlordType[] = []
        const sql = `select * from ${LandlordTableName} where isDelete = '0'`
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

  // 获取居民户列表
  getLandlordListWithPage(page: number, pageSize = 20): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: LandlordType[] = []
        const sql = `select * from ${LandlordTableName} where isDelete = '0' order by 'id' asc limit ${pageSize} offset ${page}`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            if (landlord) {
              // 去掉多余字段
              const {
                demographicList,
                immigrantAppendantList,
                immigrantTreeList,
                immigrantGraveList,
                immigrantHouseList,
                immigrantWillList,
                immigrantIncomeList,
                ...ret
              } = landlord
              array.push(ret)
            }
          })
        }
        return array
      } catch (error) {
        console.log(error, 'getLandlordListWithPage-error')
      }
    })
  }

  // 居民户立标 新增
  addLandlord(data: LandlordType): Promise<boolean> {
    // uid: string
    // content: string
    // updatedDate: string
    return new Promise(async (resolve, reject) => {
      try {
        const uid = guid()
        data.uid = uid
        data.demographicList = data.demographicList || []
        data.immigrantAppendantList = data.immigrantAppendantList || []
        data.immigrantGraveList = data.immigrantGraveList || []
        data.immigrantHouseList = data.immigrantHouseList || []
        data.immigrantIncomeList = data.immigrantIncomeList || []
        data.immigrantTreeList = data.immigrantTreeList || []
        data.immigrantWillList = data.immigrantWillList || []

        const fields = `'uid','status','content','updateDate'`
        const values = `'${uid}','modify','${JSON.stringify(data)}','${getCurrentTimeStamp()}'`
        const res = await this.db.insertTableData(LandlordTableName, values, fields)
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'addLandlord-error')
        reject(false)
      }
    })
  }

  // 居民户列表修改
  updateLandlord(data: LandlordType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
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

  // 居民户列表删除
  deleteLandlord(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
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

  // 居民户列表-uid查询单个数据
  getLandlordByUid(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
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
