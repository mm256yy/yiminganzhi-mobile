/**
 * 提供业主相关的增删改查功能
 */

import {
  LandlordTableName,
  LandlordDDLType,
  getLandlordSqlValues,
  landlordFields,
  getLandlordValues,
  LandlordHasStatusTableName,
  LandlordHasStatusDDLType
} from '@/database'
import { Common } from './common'
import { LandlordType } from '@/types/sync'
import {
  guid,
  getCurrentTimeStamp,
  getStorage,
  StorageKey,
  formatDict,
  networkCheck
} from '@/utils'
import {
  LandlordQuery,
  MainType,
  ReportParamsType,
  LandlordSearchType,
  ReportStatusEnum,
  SignStatusEnum
} from '@/types/common'
import dayjs from 'dayjs'
import { imageUrlAndBase64Map } from '@/config'
import { pathToBase64 } from 'image-tools'
import { GraveController } from './grave'

export class Landlord extends Common {
  public format: string
  constructor() {
    super()
    this.format = 'YYYY-MM-DD HH:mm:ss'
  }

  // 获取业主基础信息列表
  getList(type: MainType): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        // areaCode: string
        // townCode: string
        // villageCode: string
        // virutalVillageCode: string
        // longitude: number
        // latitude: number
        // name: string
        // doorNo: string
        // type: MainType
        let array: LandlordType[] = []
        const sql = `select uid, id, name, doorNo, type, longitude, latitude, areaCode, townCode, villageCode, virutalVillageCode from ${LandlordTableName} where isPadDelete = '0' and type = '${type}'`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (this.isArrayAndNotNull(list)) {
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array = list.map((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
            const landlordItem: any = { ...item }
            landlordItem.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            landlordItem.villageCodeText = districtMap[item.villageCode]
            landlordItem.townCodeText = districtMap[item.townCode]
            landlordItem.areaCodeText = districtMap[item.areaCode]
            return landlordItem
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'landlord-get-list-error')
        reject([])
      }
    })
  }

  // 获取业主基础信息列表-地图使用
  getListWithMap(type: MainType): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        // areaCode: string
        // townCode: string
        // villageCode: string
        // virutalVillageCode: string
        // longitude: number
        // latitude: number
        // name: string
        // doorNo: string
        // type: MainType
        let array: LandlordType[] = []
        const sql = `select uid, id, name, doorNo, type, longitude, latitude, areaCode, townCode, villageCode, virutalVillageCode from ${LandlordTableName} where isPadDelete = '0' and type = '${type}' and (longitude != '' and longitude is not null) and (latitude != '' and latitude is not null)`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        console.log(list, '居民户地图列表')
        if (this.isArrayAndNotNull(list)) {
          const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
          // 拿到上级行政区划
          array = list.map((item) => {
            // townCode: string
            // villageCode: string
            // virutalVillageCode: string
            // areaCode: string
            // 331102001201 行政村
            const landlordItem: any = { ...item }
            landlordItem.virutalVillageCodeText = districtMap[item.virutalVillageCode]
            landlordItem.villageCodeText = districtMap[item.villageCode]
            landlordItem.townCodeText = districtMap[item.townCode]
            landlordItem.areaCodeText = districtMap[item.areaCode]
            return landlordItem
          })
        }
        resolve(array)
      } catch (error) {
        console.log(error, 'landlord-get-list-error')
        reject([])
      }
    })
  }

  // 获取业主列表 分页
  getListWithPage(type: MainType, page: number, pageSize = 20): Promise<LandlordType[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: LandlordType[] = []
        const sql = `select * from ${LandlordTableName} where isPadDelete = '0' and type = '${type}' order by updatedDate desc limit ${pageSize} offset ${(page - 1) * pageSize
          }`
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        if (this.isArrayAndNotNull(list)) {
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
        console.log(data, 'data')
        const { name, timeArray, userId } = data
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordTableName} where reportUser = '${userId}'`
        if (name) {
          sql += ` and name like '%${name}%'`
        }
        if (timeArray && timeArray.length) {
          sql += ` and reportDate Between '${timeArray[0]}' and '${timeArray[1]}'`
        }
        // if (userId) {
        //   sql += ` and reportUser = '${userId}' order by updatedDate desc`
        // }
        console.log(sql, 'sql 语句')
        const list: LandlordDDLType[] = await this.db.selectSql(sql)
        console.log(list, 'getSubmitList-list')
        if (this.isArrayAndNotNull(list)) {
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
        if (data.type === MainType.Company || data.type === MainType.IndividualHousehold) {
          const companyUid = guid()
          data.company.uid = companyUid
        }
        data.demographicList = data.demographicList || []

        if (data.type === MainType.PeasantHousehold) {
          const demographicUid = guid()
          data.demographicList.push({
            name: data.name,
            card: '',
            relation: '1',
            doorNo: data.doorNo,
            townCode: data.townCode || '',
            villageCode: data.villageCode || '',
            virutalVillageCode: data.virutalVillageCode || '',
            address: data.address || '',
            cityCode: '',
            areaCode: data.areaCode || '',
            phone: data.phone,
            uid: demographicUid
          })
        }

        data.immigrantFile = data.immigrantFile || {}
        data.immigrantWill = data.immigrantWill || {}
        data.immigrantAppendantList = data.immigrantAppendantList || []
        data.immigrantGraveList = data.immigrantGraveList || []
        data.immigrantHouseList = data.immigrantHouseList || []
        data.immigrantIncomeList = data.immigrantIncomeList || []
        data.immigrantTreeList = data.immigrantTreeList || []
        data.immigrantManagementList = data.immigrantManagementList || []
        data.immigrantEquipmentList = data.immigrantEquipmentList || []
        data.immigrantFacilitiesList = data.immigrantFacilitiesList || []

        const values = getLandlordValues(data, 'modify')
        const res = await this.db.insertTableData(LandlordTableName, values, landlordFields)

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

  updateBaseLandlord(data: LandlordType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        const landlord = await this.getLandlordByUidNoFilter(data.uid)
        const newData = { ...landlord, ...data }
        const values = getLandlordSqlValues(newData)
        const sql = `update ${LandlordTableName} set ${values} where uid = '${newData.uid}' and isPadDelete = '0'`
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

  // 业主列表修改
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
        const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}' and isPadDelete = '0'`
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
        const values = `padStatus = 'modify',isPadDelete = '1',updatedDate = '${getCurrentTimeStamp()}'`
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

  // 业主列表-uid查询单个数据-页面使用
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
          'isPadDelete',
          '0'
        )
        const res: LandlordType = result && result[0] ? JSON.parse(result[0].content) : {}
        // 获取坟墓信息
        const graveList = await GraveController.getListWithLandlord(res.type, res.doorNo)
        if (res && res.uid) {
          // if (res.immigrantGraveList && res.immigrantGraveList.length) {
          //   res.immigrantGraveList = res.immigrantGraveList.filter((item) => item.isPadDelete !== '1')
          // }

          // 赋值坟墓信息
          res.immigrantGraveList = graveList
          // console.log(graveList, 'graveList')
          if (res.demographicList && res.demographicList.length) {
            res.demographicList = res.demographicList.filter((item) => item.isPadDelete !== '1')
          }

          if (res.immigrantHouseList && res.immigrantHouseList.length) {
            res.immigrantHouseList = res.immigrantHouseList.filter(
              (item) => item.isPadDelete !== '1'
            )
          }

          if (res.immigrantTreeList && res.immigrantTreeList.length) {
            res.immigrantTreeList = res.immigrantTreeList.filter((item) => item.isPadDelete !== '1')
          }

          if (res.immigrantEquipmentList && res.immigrantEquipmentList.length) {
            res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
              (item) => item.isPadDelete !== '1'
            )
          }

          if (res.immigrantFacilitiesList && res.immigrantFacilitiesList.length) {
            res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
              (item) => item.isPadDelete !== '1'
            )
          }

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
        console.log(error, 'getLandlordByUid-error')
        reject(null)
      }
    })
  }

  // 业主列表-uid查询单个数据-逻辑处理使用
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
          uid,
          'isPadDelete',
          '0'
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

  // 业主列表-uid查询单个数据-打印使用
  getLandlordByUidWithPrint(uids: string[], templateIds: number[]): Promise<LandlordType[] | null> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uids || !uids.length) {
          reject(null)
          return
        }
        let uidsString = `'${uids[0]}'`
        uids.forEach((uid, index) => {
          if (index > 0) {
            uidsString += `,'${uid}'`
          }
        })
        const sql = `select * from ${LandlordTableName} where uid in (${uidsString})`
        const network = await networkCheck()
        const result: LandlordDDLType[] = await this.db.selectSql(sql)
        const landlordArray: LandlordType[] = result.map((item) => JSON.parse(item.content))
        const realLandlordArr: LandlordType[] = []

        for (let i = 0; i < landlordArray.length; i++) {
          const res = landlordArray[i]
          // 获取坟墓信息
          const graveList = await GraveController.getListWithLandlord(res.type, res.doorNo).catch(
            (err) => {
              console.log(err, '获取坟墓失败')
            }
          )
          if (res && res.uid) {
            // 坟墓赋值
            res.immigrantGraveList = graveList || []

            if (res.company && res.company.uid) {
              res.company.industryTypeText = formatDict(res.company.industryType, 215)
              res.company.registerTypeText = formatDict(res.company.registerType, 219)
              res.company.licenceTypeText = formatDict(res.company.licenceType, 217)
              res.company.treatmentSchemeText = formatDict(res.company.treatmentScheme, 210)
              res.company.informationInvolvedText = formatDict(res.company.informationInvolved, 209)
              res.company.managementStatusText = formatDict(res.company.managementStatus, 213)
              res.company.establishDateText = res.company.establishDate
                ? dayjs(res.company.establishDate).format('YYYY-MM-DD')
                : ''
              res.company.companyTypeText = formatDict(res.company.companyType, 216)
              res.company.taxPeriodValidity
                ? dayjs(res.company.taxPeriodValidity)
                : res.company.taxPeriodValidity
            }
            if (res.demographicList && res.demographicList.length) {
              res.demographicList.forEach((item) => {
                item.relationText = formatDict(item.relation, 307)
                item.sexText = formatDict(item.sex, 292)
                item.nationText = formatDict(item.nation, 278)
                item.maritalText = formatDict(item.marital, 260)
                item.populationTypeText = formatDict(item.populationType, 244)
              })
              res.demographicList = res.demographicList.filter((item) => item.isPadDelete !== '1')
            }
            if (res.immigrantAppendantList && res.immigrantAppendantList.length) {
              res.immigrantAppendantList = res.immigrantAppendantList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }
            if (res.immigrantGraveList && res.immigrantGraveList.length) {
              res.immigrantGraveList.forEach((item) => {
                item.graveTypeText = formatDict(item.graveType, 345)
                item.materialsText = formatDict(item.materials, 295)
              })
              res.immigrantGraveList = res.immigrantGraveList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }

            // 存放房屋图片链接-离线
            const landlordHouseImageList: string[] = []
            // 在线图片保存
            const images: string[] = []
            if (res.immigrantHouseList && res.immigrantHouseList.length) {
              res.immigrantHouseList = res.immigrantHouseList.filter(
                (item) => item.isPadDelete !== '1'
              )

              res.immigrantHouseList.forEach((item) => {
                item.houseTypeText = formatDict(item.houseType, 266)
                item.propertyTypeText = formatDict(item.propertyType, 284)
                item.usageTypeText = formatDict(item.usageType, 265)
                item.constructionTypeText = formatDict(item.constructionType, 252)
                item.completedTimeText = item.completedTime
                  ? dayjs(item.completedTime).format('YYYY-MM')
                  : ''

                if (item.housePic) {
                  // 处理房屋图片相关
                  const houseImgs = JSON.parse(item.housePic)
                  if (houseImgs && houseImgs.length) {
                    houseImgs.forEach((imgItem: any) => {
                      if (/\.(jpg|jpeg|png|JPG|PNG|JPEG)/.test(imgItem.url)) {
                        if (imageUrlAndBase64Map[imgItem.url]) {
                          landlordHouseImageList.push(imageUrlAndBase64Map[imgItem.url].path)
                        } else {
                          if (network) {
                            images.push(
                              // 处理图片链接
                              imgItem.url.replace(
                                'https://zdwp.oss-cn-hangzhou.aliyuncs.com/',
                                'https://oss.zdwp.tech/'
                              )
                            )
                          }
                        }
                      }
                    })
                  }
                }
              })
            }
            // 图片字段赋值-在线
            res.images = images
            // 图片字段赋值-离线
            res.houseImageList = []
            /**
             * 房屋图片相关的处理
             * 2 居民户房屋模版id
             * 102 企业房屋模版id
             * 202 个体户房屋模版id
             * 301 村集体房屋模板id
             */

            // 只有在打印房屋示意图时需要处理图片
            if ([2, 102, 202, 301].includes(templateIds[0])) {
              // 拿到房屋图片的base64
              if (landlordHouseImageList && landlordHouseImageList.length) {
                const imgsRes = await Promise.all(
                  landlordHouseImageList.map((item) => pathToBase64(item))
                ).catch((imgErr) => {
                  res.houseImageList = []
                  console.log(imgErr, 'imgErr')
                })
                res.houseImageList = imgsRes
              } else {
                res.houseImageList = []
              }
            }

            if (res.immigrantIncomeList && res.immigrantIncomeList.length) {
              res.immigrantIncomeList = res.immigrantIncomeList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }
            if (res.immigrantTreeList && res.immigrantTreeList.length) {
              res.immigrantTreeList.forEach((item) => {
                item.usageTypeText = formatDict(item.usageType, 325)
                item.sizeText = formatDict(item.size, 269)
                item.unitText = formatDict(item.unit, 264)
              })
              res.immigrantTreeList = res.immigrantTreeList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }

            if (res.immigrantManagementList && res.immigrantManagementList.length) {
              res.immigrantManagementList = res.immigrantManagementList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }

            if (res.immigrantEquipmentList && res.immigrantEquipmentList.length) {
              res.immigrantEquipmentList.forEach((item) => {
                item.yearText = item.year ? dayjs(item.year).format('YYYY年') : ''
                item.moveTypeText = formatDict(item.moveType, 221)
                item.unitText = formatDict(item.unit, 268)
              })
              res.immigrantEquipmentList = res.immigrantEquipmentList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }

            if (res.immigrantFacilitiesList && res.immigrantFacilitiesList.length) {
              res.immigrantFacilitiesList.forEach((item) => {
                item.facilitiesTypeText = formatDict(item.facilitiesType, 236)
                item.locationTypeText = formatDict(item.locationType, 326)
                item.unitText = formatDict(item.unit, 268)
              })
              res.immigrantFacilitiesList = res.immigrantFacilitiesList.filter(
                (item) => item.isPadDelete !== '1'
              )
            }

            const districtMap = getStorage(StorageKey.DISTRICTMAP) || {}
            // 拿到上级行政区划
            res.virutalVillageCodeText = districtMap[res.virutalVillageCode]
            res.villageCodeText = districtMap[res.villageCode]
            res.townCodeText = districtMap[res.townCode]
            res.areaCodeText = districtMap[res.areaCode]
            res.locationTypeText = formatDict(res.locationType, 326)
            // 调查时间
            res.reportDateText = res.reportDate ? dayjs(res.reportDate).format('YYYY-MM-DD') : ''

            realLandlordArr.push(res)
          }
        }

        resolve(realLandlordArr)
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
          console.log(array, '测试数据是什么')
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
  // 业主列表-根据行政村 和 名称 查询列表
  getLandlordListBySearchTwo(data?: LandlordSearchType): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          name,
          areaCode,
          townCode,
          villageCode,
          warnStatus,
          virutalVillageCode,
          type,
          pageSize = 10,
          page = 1
        } = data || {}
        const array: LandlordType[] = []
        let sql = `select * from ${LandlordHasStatusTableName} where 1=1`
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
        if (warnStatus && warnStatus == '0') {
          sql += ` and   (stage is  null or stage ='' or stage ='null') `
        } else if (warnStatus && warnStatus == '2') {
          sql += ` and   (stage is not null and stage !='' and stage !='null' and lagAddDataStatus is not null  and lagAddDataStatus !='' and lagAddDataStatus !='null') `
        } else if (warnStatus && warnStatus == '1') {
          sql += ` and   (stage is not null and stage !='' and stage !='null' and warnAddDataStatus is not null  and warnAddDataStatus !='' and warnAddDataStatus !='null')   `
        }
        sql += ` order by updatedDate desc limit ${pageSize} offset ${(page - 1) * pageSize}`
        const list: LandlordHasStatusDDLType[] = await this.db.selectSql(sql)
        /* if (this.isArrayAndNotNull(list)) {
      list.forEach((item) => {
        const landlord = JSON.parse(item.type)
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
        } */
        resolve(list)
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
        const userInfo = getStorage(StorageKey.USERINFO)
        // 更新上报相关字段
        const reportUser = userInfo ? userInfo.id : ''
        if (!reportUser) {
          reject(null)
          return
        }
        const sql = `select count(reportStatus = 'ReportSucceed' or null) as hasReport,
        count(reportStatus = 'ReportSucceed' and reportDate Between '${dayjs()
            .startOf('day')
            .format(this.format)}' and '${dayjs()
              .endOf('day')
              .format(this.format)}' or null) as todayReport
      from ${LandlordTableName} where reportUser = '${reportUser}'`
        const res: LandlordDDLType[] = await this.db.selectSql(sql)
        const sql2 = `select count(reportStatus != 'ReportSucceed' or null) as noReport from ${LandlordTableName}`
        const res2: LandlordDDLType[] = await this.db.selectSql(sql2)
        const sql3 = `select * from ${LandlordTableName} where reportUser = '${reportUser}'`
        const res3: LandlordDDLType[] = await this.db.selectSql(sql3)
        console.log(res, res2, res3, '哈哈')
        const obj = res ? res[0] : {}
        const obj2 = res2 ? res2[0] : {}
        resolve({ ...obj, ...obj2 })
      } catch (error) {
        console.log(error, 'getHomeCollection-error')
        reject(null)
      }
    })
  }

  private isNullArray(arr: any) {
    return !arr || (Array.isArray(arr) && !arr.length)
  }

  // 填报完成
  reportData(query: ReportParamsType): Promise<boolean | string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const { isCheck, uid, type } = query
        if (!uid || !type) {
          reject('参数缺失')
          return
        }

        if (isCheck) {
          /**
           * 需要拿到准确的数据
           * 和页面中展示的数据一致
           */
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
            console.log('未通过校验')
            return
          }
        }

        // 更新时 需要拿到没有做过滤的数据
        const realData = await this.getLandlordByUidNoFilter(uid)
        if (!realData) {
          reject('获取业主信息失败')
          return
        }
        const userInfo = getStorage(StorageKey.USERINFO)
        // 更新上报相关字段
        realData.reportStatus = ReportStatusEnum.ReportSucceed
        realData.reportDate = dayjs()
        realData.reportUser = userInfo.id

        const values = `padStatus = 'modify',reportStatus = '${ReportStatusEnum.ReportSucceed
          }',reportDate = '${dayjs().format(this.format)}',reportUser = '${realData.reportUser
          }',content = '${JSON.stringify(realData)}',updatedDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${LandlordTableName} set ${values} where uid = '${realData.uid}' and isPadDelete = '0'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject('更新状态失败')
          console.log('更新状态失败')
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'reportData-error')
        reject('未知错误')
      }
    })
  }

  // 报表签字
  signData(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject('uid参数缺失')
          return
        }
        // 更新时 需要拿到没有做过滤的数据
        const data = await this.getLandlordByUidNoFilter(uid)
        if (!data) {
          reject('获取业主信息失败')
          return
        }

        const userInfo = getStorage(StorageKey.USERINFO)
        // 更新上报相关字段
        data.signStatus = SignStatusEnum.SignSucceed
        data.signDate = dayjs()
        data.signUser = userInfo.id

        const values = `padStatus = 'modify',signStatus = '${SignStatusEnum.SignSucceed
          }',signDate = '${dayjs().format(this.format)}',content = '${JSON.stringify(
            data
          )}',updatedDate = '${getCurrentTimeStamp()}'`
        const sql = `update ${LandlordTableName} set ${values} where uid = '${data.uid}' and isPadDelete = '0'`
        const res = await this.db.execteSql([sql])
        if (res && res.code) {
          reject('更新状态失败')
          console.log('更新状态失败')
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'signData-error')
        reject('未知错误')
      }
    })
  }

  // 查询行政村
  getVillageCodes(type?: MainType): Promise<string[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const array: string[] = []
        let sql = `select areaCode, townCode, villageCode from ${LandlordTableName} where isPadDelete = '0'`
        if (type) {
          sql += ` and type = '${type}'`
        }
        const list: LandlordDDLType[] = await this.db.selectSql(sql)

        if (this.isArrayAndNotNull(list)) {
          list.forEach((item) => {
            array.push(item.villageCode)
            array.push(item.townCode)
            array.push(item.areaCode)
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
