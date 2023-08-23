/**
 * 提供业主相关的增删改查功能
 */

import { LandlordTableName, LandlordDDLType, getLandlordSqlValues } from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/sync'
import { getStorage, StorageKey } from '@/utils'
import { LandlordSearchType } from '@/types/common'
import { GraveController } from './grave'

export class ImpLandlord extends Common {
  public format: string
  constructor() {
    super()
    this.format = 'YYYY-MM-DD HH:mm:ss'
  }

  // 调查对象-uid查询单个数据-页面使用(除去资产评估的其他实施阶段使用)
  getImpLandlordByUid(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}

        // 获取坟墓信息
        const graveList = await GraveController.getImpListWithLandlord(res.type, res.doorNo)
        if (res && res.uid) {
          // 赋值坟墓信息
          res.immigrantGraveList = graveList || []
          if (this.isArrayAndNotNull(res.demographicList)) {
            res.demographicList = res.demographicList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantHouseList)) {
            res.immigrantHouseList = res.immigrantHouseList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantTreeList)) {
            res.immigrantTreeList = res.immigrantTreeList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantEquipmentList)) {
            res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantFacilitiesList)) {
            res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetHouseFitUpList)) {
            res.assetHouseFitUpList = res.assetHouseFitUpList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetLandList)) {
            res.assetLandList = res.assetLandList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.assetAppendantList)) {
            res.assetAppendantList = res.assetAppendantList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantChooseHouseList)) {
            res.immigrantChooseHouseList = res.immigrantChooseHouseList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantCompensationCardList)) {
            res.immigrantCompensationCardList = res.immigrantCompensationCardList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantBuildOneselfList)) {
            res.immigrantBuildOneselfList = res.immigrantBuildOneselfList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantProceduresList)) {
            res.immigrantProceduresList = res.immigrantProceduresList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]

          // 选择户型类型
          res.houseAreaType = res.immigrantSettle ? res.immigrantSettle.houseAreaType : null
          // 户主的 settingWay
          res.settingWay =
            (res.demographicList || []).find((demographic) => demographic.relation === '1')
              ?.settingWay || ''
          // console.log(res, '业主详情')
          resolve(res)
          return
        }

        reject(null)
      } catch (error) {
        console.log(error, 'getImpLandlordByUid-error')
        reject(null)
      }
    })
  }

  // 调查对象-uid查询单个数据-页面使用(资产评估专用)
  getEvaLandlordByUid(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}

        // 获取坟墓信息
        const graveList = await GraveController.getImpListWithLandlord(res.type, res.doorNo)
        if (res && res.uid) {
          // 赋值坟墓信息
          res.immigrantGraveList = graveList || []
          if (this.isArrayAndNotNull(res.demographicList)) {
            res.demographicList = res.demographicList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantHouseList)) {
            res.immigrantHouseList = res.immigrantHouseList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantTreeList)) {
            res.immigrantTreeList = res.immigrantTreeList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantEquipmentList)) {
            res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantFacilitiesList)) {
            res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetHouseFitUpList)) {
            res.assetHouseFitUpList = res.assetHouseFitUpList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.assetLandList)) {
            res.assetLandList = res.assetLandList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.assetAppendantList)) {
            res.assetAppendantList = res.assetAppendantList.filter((item) => item.isDelete !== '1')
          }

          if (this.isArrayAndNotNull(res.immigrantChooseHouseList)) {
            res.immigrantChooseHouseList = res.immigrantChooseHouseList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantCompensationCardList)) {
            res.immigrantCompensationCardList = res.immigrantCompensationCardList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantBuildOneselfList)) {
            res.immigrantBuildOneselfList = res.immigrantBuildOneselfList.filter(
              (item) => item.isDelete !== '1'
            )
          }

          if (this.isArrayAndNotNull(res.immigrantProceduresList)) {
            res.immigrantProceduresList = res.immigrantProceduresList.filter(
              (item: any) => item.isDelete !== '1'
            )
          }

          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]

          // 选择户型类型
          res.houseAreaType = res.immigrantSettle ? res.immigrantSettle.houseAreaType : null
          // 户主的 settingWay
          res.settingWay =
            (res.demographicList || []).find((demographic) => demographic.relation === '1')
              ?.settingWay || ''
          // console.log(res, '业主详情')
          resolve(res)
          return
        }

        reject(null)
      } catch (error) {
        console.log(error, 'getImpLandlordByUid-error')
        reject(null)
      }
    })
  }

  // 调查对象-修改基础信息
  updateBaseLandlord(data: Partial<LandlordType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        const landlord = await this.getLandlordByUidNoFilter(data.uid)
        if (landlord) {
          const newData = { ...landlord, ...data }
          const values = getLandlordSqlValues(newData)
          const sql = `update ${LandlordTableName} set ${values} where uid = '${newData.uid}'`
          const res = await this.db.execteSql([sql])
          if (res && res.code) {
            reject(false)
            return
          }
          resolve(true)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
        }
      } catch (error) {
        console.log(error, 'updateBaseLandlord-error')
        reject(false)
      }
    })
  }

  // 调查对象修改-逻辑处理使用
  updateLandlord(data: LandlordType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        // 拿到更新的sql字符串
        const values = getLandlordSqlValues(data)
        const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject(false)
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateLandlord-error')
        reject(false)
      }
    })
  }

  // 调查对象-uid查询单个数据-逻辑处理使用(不做数据过滤)
  getLandlordByUidNoFilter(uid: string): Promise<LandlordType | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(null)
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}

        if (res && res.uid) {
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]
          // console.log(res, '业主详情')
          resolve(res)
          return
        }

        reject(null)
      } catch (error) {
        console.log(error, 'getLandlordByUidNoFilter-error')
        reject(null)
      }
    })
  }

  // 调查对象-根据行政村 和 名称 查询列表
  getLandlordListBySearch(data?: LandlordSearchType): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          name,
          areaCode,
          townCode,
          villageCode,
          virutalVillageCode,
          type,
          pageSize = 10,
          page = 1
        } = data || {}
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordTableName} where isPadDelete = '0'`
        if (type) {
          sql += ` and type = '${type}'`
        }
        if (name) {
          sql += ` and (name like '%${name}%' or doorNo like '%${name.slice(
            name.length - 6 < 0 ? 0 : name.length - 6,
            name.length
          )}%' or content like '%${name}%')`
        }
        if (areaCode) {
          sql += ` and areaCode = '${areaCode}'`
        }
        if (townCode) {
          sql += ` and townCode = '${townCode}'`
        }
        if (villageCode) {
          sql += ` and villageCode = '${villageCode}'`
        }
        if (virutalVillageCode) {
          sql += ` and virutalVillageCode = '${virutalVillageCode}'`
        }
        sql += ` order by updatedDate desc limit ${pageSize} offset ${(page - 1) * pageSize}`
        // console.log('sql', sql)
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (this.isArrayAndNotNull(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array.forEach((item) => {
            item.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            item.villageCodeText = districtMap[item.villageCode]
            item.townCodeText = districtMap[item.townCode]
            item.areaCodeText = districtMap[item.areaCode]
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'getLandlordListBySearch-error')
        reject([])
      }
    })
  }
}

export const ImpLandlordController = new ImpLandlord()
