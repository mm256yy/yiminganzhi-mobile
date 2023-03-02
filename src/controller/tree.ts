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

  public isArrayAndNotNull(list: any): boolean {
    if (list && Array.isArray(list) && list.length) {
      return true
    }
    return false
  }

  // Country: 'areaCode',
  // Township: 'townCode',
  // Village: 'villageCode',
  // naturalVillage: 'virutalVillageCode'

  getLandlordTree(type: MainType): Promise<any[]> {
    return new Promise(async (resolve) => {
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
              totalMap[item.virutalVillageCode] = 0
            } else {
              totalMap[item.virutalVillageCode]++
            }
            // 填报的人口
            if (item.reportStatus === 'ReportSucceed') {
              if (!reportMap[item.virutalVillageCode]) {
                reportMap[item.virutalVillageCode] = 0
              } else {
                reportMap[item.virutalVillageCode]++
              }
            }
          }

          // 行政村
          if (item.villageCode) {
            // 总的人口
            if (!totalMap[item.villageCode]) {
              totalMap[item.villageCode] = 0
            } else {
              totalMap[item.villageCode]++
            }
            // 填报的人口
            if (item.reportStatus === 'ReportSucceed') {
              if (!reportMap[item.villageCode]) {
                reportMap[item.villageCode] = 0
              } else {
                reportMap[item.villageCode]++
              }
            }
          }

          // 乡级
          if (item.townCode) {
            // 总的人口
            if (!totalMap[item.townCode]) {
              totalMap[item.townCode] = 0
            } else {
              totalMap[item.townCode]++
            }
            // 填报的人口
            if (item.reportStatus === 'ReportSucceed') {
              if (!reportMap[item.townCode]) {
                reportMap[item.townCode] = 0
              } else {
                reportMap[item.townCode]++
              }
            }
          }

          // 区/镇级
          if (item.areaCode) {
            // 总的人口
            if (!totalMap[item.areaCode]) {
              totalMap[item.areaCode] = 0
            } else {
              totalMap[item.areaCode]++
            }
            // 填报的人口
            if (item.reportStatus === 'ReportSucceed') {
              if (!reportMap[item.areaCode]) {
                reportMap[item.areaCode] = 0
              } else {
                reportMap[item.areaCode]++
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
          const totalArray = [...districtList, ...villageList]
          totalArray.forEach((item) => {
            item.totalNum = totalMap[item.code] || 0
            item.reportNum = reportMap[item.code] || 0
          })
          const treeArray = [...totalArray, ...landlordList]
          const res = arrayToTree(treeArray)
          resolve(res)
        } else {
          const totalArray = [...districtList]
          totalArray.forEach((item) => {
            item.totalNum = totalMap[item.code] || 0
            item.reportNum = reportMap[item.code] || 0
          })
          const treeArray = [...totalArray, ...landlordList]
          const res = arrayToTree(treeArray)
          console.log(res, '其他res')
          resolve(res)
        }
      } else {
        resolve([])
      }
    })
  }

  getVillageTree(): Promise<any[]> {
    return new Promise(async (resolve) => {
      // 拿到 区划列表
      const districtList = await DistrictController.getList()
      // 拿到 自然村列表
      const villageList = await VillageController.getList()
      const totalArray = [...districtList, ...villageList]
      if (this.isArrayAndNotNull(totalArray)) {
        const res = arrayToTree(totalArray)
        console.log(res, '自然村树')
        resolve(res)
      } else {
        resolve([])
      }
    })
  }
}

export const DistrictTreeController = new DistrictTree()
