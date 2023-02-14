/**
 * 提供居民户相关的增删改查功能
 */

import { LandlordTableName, LandlordDDLType } from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/pull'
import { guid, getCurrentTimeStamp } from '@/utils'

export class Landlord extends Common {
  constructor() {
    super()
  }

  // 获取居民户列表
  async getList() {
    try {
      const array: LandlordType[] = []
      const sql = `select * from ${LandlordTableName} where isDelete = '0'`
      const list: LandlordDDLType[] = await this.db.selectSql(sql)
      if (list && Array.isArray(list)) {
        list.forEach((item) => {
          array.push(JSON.parse(item.content))
        })
      }
      return array
    } catch (error) {
      console.log(error, 'landlord-get-list-error')
    }
  }

  // 获取居民户列表
  async getLandlordListWithPage(page: number, pageSize = 20) {
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
  }

  // 居民户立标 新增
  async addLandlord(data: LandlordType) {
    // uid: string
    // content: string
    // updatedDate: string
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
        return false
      }
      return true
    } catch (error) {
      console.log(error, 'addLandlord-error')
    }
  }

  // 居民户列表修改
  async updateLandlord(data: LandlordType) {
    try {
      const values = `status = 'modify',content = '${JSON.stringify(
        data
      )}',updateDate = '${getCurrentTimeStamp()}'`
      const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}' and isDelete = '0'`
      const res = await this.db.execteSql([sql])
      if (res && res.code) {
        return false
      }
      return true
    } catch (error) {
      console.log(error, 'updateLandlord-error')
    }
  }

  // 居民户列表删除
  async deleteLandlord(uid: string) {
    try {
      const values = `status = 'modify',isDelete = '1',updateDate = '${getCurrentTimeStamp()}'`
      const res = await this.db.updateTableData(LandlordTableName, values, 'uid', uid)
      if (res && res.code) {
        return false
      }
      return true
    } catch (error) {
      console.log(error, 'deleteLandlord-error')
    }
  }

  // 居民户列表-uid查询单个数据
  async getLandlordByUid(uid: string) {
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
        return res
      }
      return null
    } catch (error) {
      console.log(error, 'getLandlordByUid-error')
    }
  }
}

export const LandlordController = new Landlord()
