/**
 * 提供业主相关的增删改查功能
 */

import { LandlordTableName, LandlordDDLType } from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/sync'
import { guid, getCurrentTimeStamp, getStorage, StorageKey } from '@/utils'
import {
  LandlordQuery,
  MainType,
  ReportParamsType,
  LandlordSearchType,
  ReportStatusEnum
} from '@/types/common'
import dayjs from 'dayjs'
// uid: string
// content: string
// name: string
// type: MainType
// reportDate: string
// reportUser: string
// villageCode: string
// status: 'modify' | 'default'
// isDelete: '0' | '1'
// updatedDate: string
export class Landlord extends Common {
  public format: string
  constructor() {
    super()
    this.format = 'YYYY-MM-DD HH:mm:ss'
  }

  // 获取业主列表
  getList(type: MainType): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: LandlordType[] = []
        const sql = `select * from ${LandlordTableName} where isDelete = '0' and type = '${type}' order by updatedDate desc`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            array.push(JSON.parse(item.content))
          })
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array.forEach((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
            item.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            item.villageCodeText = districtMap[item.villageCode]
            item.townCodeText = districtMap[item.townCode]
            item.areaCodeText = districtMap[item.areaCode]
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
        const sql = `select * from ${LandlordTableName} where isDelete = '0' and type = '${type}' order by updatedDate desc limit ${pageSize} offset ${
          (page - 1) * pageSize
        }`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array.forEach((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
            item.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            item.villageCodeText = districtMap[item.villageCode]
            item.townCodeText = districtMap[item.townCode]
            item.areaCodeText = districtMap[item.areaCode]
            item.locationTypeText = this.getLocationTypeText(item.locationType)
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
          return
        }
        const { name, timeArray, userId } = data
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordTableName} where isDelete = '0'`
        if (name) {
          sql += ` and name like '%${name}%'`
        }
        if (timeArray && timeArray.length) {
          sql += ` and reportDate Between '${timeArray[0]}' and '${timeArray[1]}'`
        }
        if (userId) {
          sql += ` and reportUser = '${userId}' order by updatedDate desc`
        }
        console.log(sql, 'sql 语句')
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array.forEach((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
            item.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            item.villageCodeText = districtMap[item.villageCode]
            item.townCodeText = districtMap[item.townCode]
            item.areaCodeText = districtMap[item.areaCode]
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
          return
        }
        if (!data.type) {
          console.log('业主类型缺失')
          reject('')
          return
        }
        if (!data.doorNo) {
          console.log('doorNo缺失')
          reject('')
          return
        }
        const uid = guid()
        data.uid = uid
        // 预设字段
        data.reportStatus = ReportStatusEnum.UnReport
        data.reportUser = ''
        data.reportDate = ''
        data.company = data.company || {}
        data.immigrantFile = data.immigrantFile || {}
        data.immigrantWill = data.immigrantWill || {}
        data.demographicList = data.demographicList || []
        data.immigrantAppendantList = data.immigrantAppendantList || []
        data.immigrantGraveList = data.immigrantGraveList || []
        data.immigrantHouseList = data.immigrantHouseList || []
        data.immigrantIncomeList = data.immigrantIncomeList || []
        data.immigrantTreeList = data.immigrantTreeList || []
        data.immigrantManagementList = data.immigrantManagementList || []
        data.immigrantEquipmentList = data.immigrantEquipmentList || []
        data.immigrantFacilitiesList = data.immigrantFacilitiesList || []

        const fields = `'uid','status','type','name','reportStatus','reportDate','reportUser','villageCode','content','updatedDate','isDelete'`
        const values = `'${uid}','modify','${data.type}','${data.name}','${
          ReportStatusEnum.UnReport
        }','','','${data.villageCode}','${JSON.stringify(data)}','${getCurrentTimeStamp()}','0'`
        const res = await this.db.insertTableData(LandlordTableName, values, fields)

        if (res && res.code) {
          reject('')
          return
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
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        const values = `status = 'modify',type = '${data.type}',name = '${
          data.name
        }',reportStatus = '${data.reportStatus}',reportDate = '${data.reportDate}',reportUser = '${
          data.reportUser
        }',villageCode = '${data.villageCode}',content = '${JSON.stringify(
          data
        )}',updatedDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}' and isDelete = '0'`
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

  // 业主列表删除
  deleteLandlord(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          return
        }
        const values = `status = 'modify',isDelete = '1',updatedDate = '${getCurrentTimeStamp()}'`
        const res = await this.db.updateTableData(LandlordTableName, values, 'uid', uid)
        if (res && res.code) {
          reject(false)
          return
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
          return
        }
        const result: LandlordDDLType[] = await this.db.selectTableData(
          LandlordTableName,
          'uid',
          uid,
          'isDelete',
          '0'
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}
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

          if (res.immigrantManagementList && res.immigrantManagementList.length) {
            res.immigrantManagementList = res.immigrantManagementList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }

          if (res.immigrantEquipmentList && res.immigrantEquipmentList.length) {
            res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }

          if (res.immigrantFacilitiesList && res.immigrantFacilitiesList.length) {
            res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
              (item) => !item.isDelete || item.isDelete === '0'
            )
          }

          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
          res.villageCodeText = districtMap[res.villageCode]
          res.townCodeText = districtMap[res.townCode]
          res.areaCodeText = districtMap[res.areaCode]

          resolve(res)
        }
        reject(null)
      } catch (error) {
        console.log(error, 'getLandlordByUid-error')
        reject(null)
      }
    })
  }

  // 业主列表-根据行政村 和 名称 查询列表
  getLandlordListBySearch(data?: LandlordSearchType): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, villageCode, type, pageSize = 10, page = 1 } = data || {}
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordTableName} where isDelete = '0'`
        if (type) {
          sql += ` and type = '${type}'`
        }
        if (name) {
          sql += ` and name like '%${name}%'`
        }
        if (villageCode) {
          sql += ` and villageCode = '${villageCode}'`
        }
        sql += ` order by updatedDate desc limit ${pageSize} offset ${(page - 1) * pageSize}`

        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const landlord = JSON.parse(item.content)
            array.push(landlord)
          })
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array.forEach((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
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

  // 获取首页统计数据
  getHomeCollection(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const sql = `select count(reportStatus = 'ReportSucceed' or null) as hasReport,
        count(reportStatus != 'ReportSucceed' or null) as noReport,
        count(reportStatus = 'ReportSucceed' and reportDate Between '${dayjs()
          .startOf('day')
          .format(this.format)}' and '${dayjs()
          .endOf('day')
          .format(this.format)}' or null) as todayReport
      from ${LandlordTableName}`
        const res: LandlordDDLType[] = await this.db.selectSql(sql)

        resolve(res)
      } catch (error) {
        console.log(error, 'getHomeCollection-error')
        reject(null)
      }
    })
  }

  private isNullArray(arr: any) {
    return !arr || (Array.isArray(arr) && !arr.length)
  }

  // 数据上报
  reportData(query: ReportParamsType): Promise<boolean | string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { isCheck, uid, type } = query
        if (!uid || !type) {
          reject('参数缺失')
          return
        }
        const data = await this.getLandlordByUid(uid)
        if (!data) {
          reject('获取业主信息失败')
          return
        }
        const {
          demographicList,
          immigrantAppendantList,
          immigrantGraveList,
          immigrantHouseList,
          immigrantIncomeList,
          immigrantTreeList,
          immigrantWill,
          immigrantManagementList,
          immigrantEquipmentList,
          immigrantFacilitiesList,
          company
        } = data

        if (isCheck) {
          const array: string[] = []
          if (this.isNullArray(immigrantHouseList)) {
            array.push('房屋信息采集：未添加房屋记录')
          }
          if (this.isNullArray(immigrantTreeList)) {
            array.push('零星林果木信息采集：未添加林（果）木记录')
          }
          if (this.isNullArray(immigrantAppendantList)) {
            array.push('附属物信息采集：未填写附属物信息')
          }
          // 上报开始校验数据
          if (type === MainType.PeasantHousehold) {
            // 居民户
            if (demographicList && demographicList.length <= 1) {
              array.push('人口信息采集：未添加该户除户主外人口')
            }
            if (this.isNullArray(immigrantIncomeList)) {
              array.push('家庭收入情况信息采集：未填写家庭收入信息')
            }
            if (!immigrantWill) {
              array.push('安置意愿调查信息：未填写安置意愿信息')
            }
          } else if (type === MainType.IndividualHousehold) {
            // 个体户
            if (!company) {
              array.push('个体户基本信息：未填写个体户基本信息')
            }
          } else if (type === MainType.Company) {
            // 企业
            if (!company || JSON.stringify(company) === '{}') {
              array.push('企业基本信息：未填写企业基本')
            }
            if (this.isNullArray(immigrantManagementList)) {
              array.push('企业经营现状采集：未填写经营现状信息')
            }
            if (this.isNullArray(immigrantEquipmentList)) {
              array.push('企业设施设备采集：未填写企业设施设备信息')
            }
          } else if (type === MainType.Village) {
            // 村集体
            if (this.isNullArray(immigrantGraveList)) {
              array.push('坟墓调查信息采集：未添加坟墓调查信息记录')
            }
            if (this.isNullArray(immigrantFacilitiesList)) {
              array.push('农村小型专项及农副业设施信息采集：未添加农村小型专项及农副业设施信息记录')
            }
          }

          if (array.length) {
            // 未通过校验
            resolve(array)
            return
          }
        }

        const userInfo = getStorage(StorageKey.USERINFO)
        // 更新上报相关字段
        data.reportStatus = ReportStatusEnum.ReportSucceed
        data.reportDate = dayjs()
        data.reportUser = userInfo.id

        const values = `status = 'modify',reportStatus = '${
          ReportStatusEnum.ReportSucceed
        }',reportDate = '${dayjs().format(this.format)}',reportUser = '${
          data.reportUser
        }',content = '${JSON.stringify(data)}',updatedDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}' and isDelete = '0'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject('更新状态失败')
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'reportData-error')
        reject('未知错误')
      }
    })
  }

  // 查询行政村
  getVillageCodes(type?: MainType): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: string[] = []
        let sql = `select * from ${LandlordTableName} where isDelete = '0'`
        if (type) {
          sql += ` and type = '${type}'`
        }
        const list: LandlordDDLType[] = await this.db.selectSql(sql)

        if (list && Array.isArray(list)) {
          list.forEach((item) => {
            const content = JSON.parse(item.content)
            array.push(content.villageCode)
            array.push(content.townCode)
            array.push(content.areaCode)
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'landlord-getVillageCodes-error')
        reject([])
      }
    })
  }
}

export const LandlordController = new Landlord()
