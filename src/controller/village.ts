/**
 * 安置意愿 相关的增删改查功能
 */

import { VillageTableName, VillageDDLType } from '@/database'
import { Common } from './common'
import { VillageType, PageQueryType } from '@/types/common'
import { getCurrentTimeStamp, guid, getStorage, StorageKey } from '@/utils'

class Village extends Common {
  constructor() {
    super()
  }

  // 获取全部列表
  getList(): Promise<VillageType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: VillageType[] = []
        const sql = `select * from ${VillageTableName} where isPadDelete = '0' order by updatedDate desc`
        const res1: VillageDDLType[] = await this.db.selectSql(sql)
        const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
        if (this.isArrayAndNotNull(res1)) {
          res1.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
          // 拿到上级行政区划
          array.forEach((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
            item.villageCode = item.parentCode
            item.townCode = item.parentCode.slice(0, 9)
            item.areaCode = item.parentCode.slice(0, 6)

            item.villageCodeText = districtMap[item.parentCode]
            item.townCodeText = districtMap[item.parentCode.slice(0, 9)]
            item.areaCodeText = districtMap[item.parentCode.slice(0, 6)]
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
  getListWithPage(data: PageQueryType & { name: string }): Promise<VillageType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { page = 1, pageSize = 10, name } = data
        const array: VillageType[] = []
        let sql = `select * from ${VillageTableName} where isPadDelete = '0'`
        if (name) {
          sql += ` and name like '%${name}%'`
        }
        if (page && pageSize) {
          sql += ` order by updatedDate desc limit ${pageSize} offset ${(page - 1) * pageSize}`
        }
        // console.log(sql, 'sql')
        const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
        const list: VillageDDLType[] = await this.db.selectSql(sql)
        if (this.isArrayAndNotNull(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
        }
        // 拿到上级行政区划
        array.forEach((item) => {
          // townCode: string
          // villageCode: string
          // virutalVillageCode: string
          // areaCode: string
          // 331102001201 行政村
          item.villageCode = item.parentCode
          item.townCode = item.parentCode.slice(0, 9)
          item.areaCode = item.parentCode.slice(0, 6)

          item.villageCodeText = districtMap[item.parentCode]
          item.townCodeText = districtMap[item.parentCode.slice(0, 9)]
          item.areaCodeText = districtMap[item.parentCode.slice(0, 6)]
        })
        resolve(array)
      } catch (error) {
        console.log(error, 'Village-get-list-error')
        reject([])
      }
    })
  }

  // 自然村立标 新增
  add(data: Partial<VillageType>): Promise<boolean> {
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
        const fields = `'uid','isPadDelete','padStatus','name','parentCode','content','updatedDate'`
        const values = `'${uid}','0','modify','${data.name}','${data.parentCode}','${JSON.stringify(
          data
        )}','${getCurrentTimeStamp()}'`
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
  update(data: Partial<VillageType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data) {
          reject(false)
        }
        const values = `padStatus = 'modify',name = '${data.name}',parentCode = '${
          data.parentCode
        }',content = '${JSON.stringify(data)}',updatedDate = '${getCurrentTimeStamp()}'`
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

  // 自然村列表删除
  deleteVillage(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
        }
        const values = `padStatus = 'modify',isPadDelete = '1',updatedDate = '${getCurrentTimeStamp()}'`
        const res = await this.db.updateTableData(VillageTableName, values, 'uid', uid)
        if (res && res.code) {
          reject(false)
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'deleteVillage-error')
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
        const res: VillageType = await this.db.selectTableData(
          VillageTableName,
          'uid',
          uid,
          'isPadDelete',
          '0'
        )
        if (res && res[0]) {
          const item = JSON.parse(res[0].content)
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          item.villageCode = item.parentCode
          item.townCode = item.parentCode.slice(0, 9)
          item.areaCode = item.parentCode.slice(0, 6)

          item.villageCodeText = districtMap[item.parentCode]
          item.townCodeText = districtMap[item.parentCode.slice(0, 9)]
          item.areaCodeText = districtMap[item.parentCode.slice(0, 6)]
          resolve(item)
          return
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
