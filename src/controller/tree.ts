/**
 * 区划/业主 树 查询
 */

import { Common } from './common'
import { LandlordController } from './landlord'
import { DistrictController } from './district'
import { VillageController } from './village'
import { MainType } from '@/types/common'
import { arrayToTree } from '@/utils'

class DistrictTree extends Common {
  constructor() {
    super()
  }

  // Country: 'areaCode',
  // Township: 'townCode',
  // Village: 'villageCode',
  // naturalVillage: 'virutalVillageCode'

  getLandlordTree(type: MainType): Promise<any[]> {
    return new Promise(async (resolve) => {
      try {
        // 拿到 区划列表
        const districtList = await DistrictController.getList()

        // 拿到 业主列表
        const landlordList = await LandlordController.getList(type)
        // 空校验
        if (this.isArrayAndNotNull(districtList) && this.isArrayAndNotNull(landlordList)) {
          // 统计 信息
          const totalMap: any = {}
          const reportMap: any = {}
          landlordList.forEach((item) => {
            item.landlord = true
            item.parentCode =
              item.type === MainType.PeasantHousehold ? item.virutalVillageCode : item.villageCode
            item.code = item.id
            // 自热村
            if (item.virutalVillageCode) {
              // 总的人口
              if (!totalMap[item.virutalVillageCode]) {
                totalMap[item.virutalVillageCode] = 1
              } else {
                totalMap[item.virutalVillageCode] = totalMap[item.virutalVillageCode] + 1
              }
              // 填报的人口
              if (item.reportStatus === 'ReportSucceed') {
                if (!reportMap[item.virutalVillageCode]) {
                  reportMap[item.virutalVillageCode] = 1
                } else {
                  reportMap[item.virutalVillageCode] = reportMap[item.virutalVillageCode] + 1
                }
              }
            }

            // 行政村
            if (item.villageCode) {
              // 总的人口
              if (!totalMap[item.villageCode]) {
                totalMap[item.villageCode] = 1
              } else {
                totalMap[item.villageCode] = totalMap[item.villageCode] + 1
              }
              // 填报的人口
              if (item.reportStatus === 'ReportSucceed') {
                if (!reportMap[item.villageCode]) {
                  reportMap[item.villageCode] = 1
                } else {
                  reportMap[item.villageCode] = reportMap[item.villageCode] + 1
                }
              }
            }

            // 乡级
            if (item.townCode) {
              // 总的人口
              if (!totalMap[item.townCode]) {
                totalMap[item.townCode] = 1
              } else {
                totalMap[item.townCode] = totalMap[item.townCode] + 1
              }
              // 填报的人口
              if (item.reportStatus === 'ReportSucceed') {
                if (!reportMap[item.townCode]) {
                  reportMap[item.townCode] = 1
                } else {
                  reportMap[item.townCode] = reportMap[item.townCode] + 1
                }
              }
            }

            // 区/镇级
            if (item.areaCode) {
              // 总的人口
              if (!totalMap[item.areaCode]) {
                totalMap[item.areaCode] = 1
              } else {
                totalMap[item.areaCode] = totalMap[item.areaCode] + 1
              }
              // 填报的人口
              if (item.reportStatus === 'ReportSucceed') {
                if (!reportMap[item.areaCode]) {
                  reportMap[item.areaCode] = 1
                } else {
                  reportMap[item.areaCode] = reportMap[item.areaCode] + 1
                }
              }
            }
          })

          // 拿到自然村
          let villageList = []
          if (type === MainType.PeasantHousehold) {
            // 剧名户 需要拿到自然村
            villageList = await VillageController.getList()
            villageList.forEach((item) => {
              item.districtType === 'naturalVillage'
            })
            let totalArray = [...districtList, ...villageList]
            totalArray.forEach((item) => {
              item.totalNum = totalMap[item.code] || 0
              item.reportNum = reportMap[item.code] || 0
            })
            // 过滤掉没有业主的数据
            totalArray = totalArray.filter((item) => item.totalNum !== 0)
            const treeArray = [...totalArray, ...landlordList]
            const res = arrayToTree(treeArray)
            resolve(res)
          } else {
            let totalArray = [...districtList]
            totalArray.forEach((item) => {
              item.totalNum = totalMap[item.code] || 0
              item.reportNum = reportMap[item.code] || 0
            })
            // 过滤掉没有业主的数据
            totalArray = totalArray.filter((item) => item.totalNum !== 0)
            const treeArray = [...totalArray, ...landlordList]
            const res = arrayToTree(treeArray)
            resolve(res)
          }
        } else {
          resolve([])
        }
      } catch (error) {
        console.log(error, 'getLandlordTree-error')
        resolve([])
      }
    })
  }

  // 获取行政村 下拉树 过滤了空数据
  getVillageTree(type?: MainType): Promise<any[]> {
    return new Promise(async (resolve) => {
      try {
        // 拿到 区划列表
        const districtList = await DistrictController.getList()
        // 拿到 业主列表 5.17删除过滤逻辑
        // const villageCodes = await LandlordController.getVillageCodes(type)

        let newDistrictList: any[] = []
        if (type === MainType.PeasantHousehold) {
          // 拿到 自然村列表
          const villageList = await VillageController.getList()
          newDistrictList = [...districtList, ...villageList]
        } else {
          newDistrictList = districtList
        }
        if (this.isArrayAndNotNull(newDistrictList)) {
          const res = arrayToTree(newDistrictList)
          resolve(res)
        } else {
          resolve([])
        }
      } catch (error) {
        console.log(error, 'getVillageTree-error')
        resolve([])
      }
    })
  }

  // 获取自然村
  getVirutalVillageTree(): Promise<any[]> {
    return new Promise(async (resolve) => {
      try {
        // 拿到 区划列表
        const districtList = await DistrictController.getList()
        // 拿到 自然村列表
        const villageList = await VillageController.getList()
        const totalMap: any = {}
        villageList.forEach((item) => {
          if (item.villageCode) {
            if (!totalMap[item.villageCode]) {
              totalMap[item.villageCode] = 1
            } else {
              totalMap[item.villageCode] = totalMap[item.villageCode] + 1
            }
          }
          if (item.townCode) {
            if (!totalMap[item.townCode]) {
              totalMap[item.townCode] = 1
            } else {
              totalMap[item.townCode] = totalMap[item.townCode] + 1
            }
          }
          if (item.areaCode) {
            if (!totalMap[item.areaCode]) {
              totalMap[item.areaCode] = 1
            } else {
              totalMap[item.areaCode] = totalMap[item.areaCode] + 1
            }
          }
        })

        districtList.forEach((item) => {
          item.totalNum = totalMap[item.code] || 0
        })

        const newDistrictList = districtList.filter((item) => item.totalNum !== 0)
        const totalArray = [...newDistrictList, ...villageList]
        if (this.isArrayAndNotNull(totalArray)) {
          const res = arrayToTree(totalArray)
          // console.log(res, '自然村树')
          resolve(res)
        } else {
          resolve([])
        }
      } catch (error) {
        console.log(error, 'getVirutalVillageTree-error')
        resolve([])
      }
    })
  }
}

export const DistrictTreeController = new DistrictTree()
