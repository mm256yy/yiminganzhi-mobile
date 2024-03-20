import { Common } from './common'
import { landEstimateDtoListName, LandlordTableName } from '@/database'
import { getLandPeasantHouseholdDtoListApi } from '@/service'
import {
  addLandlordApi,
  addImpLandlordAssetAppendantApi,
  deleteImpLandlordAssetAppendantApi
} from '@/service'
import { ImpDataFillController } from '@/controller'
import { guid } from '@/utils'
export class landEstimateDtoListFills extends Common {
  public format: string
  constructor() {
    super()
    this.format = 'YYYY-MM-DD HH:mm:ss'
  }
  //模糊查询土地
  getLandlordListBySearch(data?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          name,
          areaCode,
          townCode,
          villageCode,
          virutalVillageCode,
          doorNo,
          landNumber,
          rightHolder,
          landName,
          landNature,
          relationFlag,
          estimateFlag,
          area,
          inundationRange,
          ownershipUnitIsNull,
          pageSize = 4,
          page = 1,
          landLevel
        } = data || {}
        let array: any[] = []
        let landLevelOne = ''
        let landLevelTwo = ''
        let sql = `select * from ${landEstimateDtoListName} where 1=1`
        if (landLevel) {
          landLevelOne = landLevel.split('-')[0]
          landLevelTwo = landLevel.split('-')[1]
        }
        if (doorNo) {
          sql += ` and showDoorNo = '${doorNo}'`
        }
        if (landNumber) {
          sql += ` and landNumber = '${landNumber}'`
        }
        if (rightHolder) {
          sql += ` and rightHolder = '${rightHolder}'`
        }
        if (landName) {
          sql += ` and landName = '${landName}'`
        }
        if (landNature) {
          sql += ` and landNature = '${landNature}'`
        }
        if (landLevelOne) {
          sql += ` and landLevelOne = '${landLevelOne}'`
        }
        if (landLevelTwo) {
          sql += ` and landLevelTwo = '${landLevelTwo}'`
        }
        if (relationFlag) {
          sql += ` and relationFlag = '${relationFlag}'`
        }
        if (estimateFlag) {
          sql += ` and estimateFlag = '${estimateFlag}'`
        }
        if (area) {
          sql += ` and area = '${area}'`
        }
        if (inundationRange) {
          sql += ` and inundationRange = '${inundationRange}'`
        }
        if (name) {
          //模糊搜索
          sql += ` and (rightHolder like '%${name}%' or landNumber like '%${name}%')`
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
        if (ownershipUnitIsNull == 1) {
          sql += ` and areaCode = ''`
          sql += ` and townCode = ''`
          sql += ` and villageCode = ''`
          console.log(sql, '124')
        }
        sql += ` limit ${pageSize} offset ${(page - 1) * pageSize}`
        // console.log('sql', sql)
        const list: any[] = await this.db.selectSql(sql)
        array = list
        resolve(array)
      } catch (error) {
        console.log(error, 'getLandlordListBySearch-error')
        reject([])
      }
    })
  }
  //土地修改
  updateLandlord(data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid || !data.type) {
          reject(false)
          console.log('核心字段缺失')
          return
        }

        let values = ''
        const setuid = ''
        let doorNos = ''
        // 拿到更新的sql字符串
        if (data.type == 1) {
          const list = await getLandPeasantHouseholdDtoListApi()

          list.filter((item: any) => {
            if (item.id == data.id) {
              console.log(item.doorNo)
              doorNos = item.doorNo
              values = `doorNo='${item.doorNo}',householder='${item.name}',relationFlag='1'`
            }
          })
        } else {
          if (data.doorNo && data.doorNo.length != 9) {
            reject('户号校验失败')
            console.log('户号校验失败')
            return
          }
          doorNos = data.doorNo
          addLandlordApi({
            doorNo: data.doorNo,
            type: 'LandNoMove',
            cityCode: data.cityCode,
            areaCode: data.areaCode,
            townCode: data.townCode,
            villageCode: data.villageCode,
            name: data.rightHolder,
            card: data.card,
            landUserType: data.landUserType
          }).catch(() => {
            reject(false)
          })
          values = `doorNo='${data.doorNo}',householder='${data.rightHolder}',relationFlag='1'`
        }
        const uids = data.uid.split(',')
        let listTds = []
        uids.forEach(async (bbq: any) => {
          const sql = `update ${landEstimateDtoListName} set ${values} where uid = '${bbq}'`
          const res = await this.db.execteSql([sql])
          console.log(res)
          if (res && res.code) {
            reject(false)
            return
          }
        })
        const sqlTd = `select * from ${landEstimateDtoListName} where doorNo='${doorNos}'`
        listTds = await this.db.selectSql(sqlTd)
        const sqlUser = `select * from ${LandlordTableName} where doorNo='${doorNos}'`
        const userData = await this.db.selectSql(sqlUser)
        // const userDataAll = await this.db.selectSql(`select * from ${LandlordTableName} where 1=1`)
        const landNumbers = listTds.reduce((pre: any, item: any) => {
          pre.push(item.landNumber)
          return pre
        }, [])
        console.log(userData, listTds, doorNos, '修改人')
        ImpDataFillController.updateLandlordAssetLandBatch(userData[0].uid, listTds)
        if (data.oldDoorNo.length > 0) {
          console.log(data.oldDoorNo.length, '=================')

          for (const element of data.oldDoorNo) {
            const oldUsers = await this.db.selectSql(
              `select * from ${LandlordTableName} where doorNo='${element}'`
            )
            const oldUser = JSON.parse(oldUsers[0].content)
            console.log(oldUser)

            if (oldUser.landEstimateDtoList) {
              let m = false
              oldUser.landEstimateDtoList.forEach((key: any) => {
                if (uids.includes(key.uid)) {
                  m = true
                }
              })
              if (m) {
                ImpDataFillController.updateLandlordAssetLandBatch(
                  oldUser.uid,
                  oldUser.landEstimateDtoList.filter((value: any) => !uids.includes(value.uid))
                )
              }
            }
            if (oldUser.assetAppendantList) {
              for (const key of oldUser.assetAppendantList) {
                console.log(key, '土地信息')
                console.log(landNumbers, '土地编号')

                if (landNumbers.includes(key.landNumber)) {
                  await addImpLandlordAssetAppendantApi(userData[0].uid, key)
                  await deleteImpLandlordAssetAppendantApi(oldUser.uid, key.uid)
                }
              }
            }
          }
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateLandlord-error')
        reject(false)
      }
    })
  }

  // 土地评估状态更改
  updateEstimateFlag(data?: any): Promise<any> { 
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.uid) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
    let values = ''
     values = `estimateFlag='1'`
     const sql = `update ${landEstimateDtoListName} set ${values} where uid = '${data.uid}'`
     const res = await this.db.execteSql([sql])
        console.log('成功', res)
        if (res && res.code) {
          reject(false)
          return
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateEstimateFlag-error')
        reject(false)
      }
    })
  }

  getLandlordListBySearchTitle(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const listTit = await this.db.selectSql(`select * from ${landEstimateDtoListName}`)
        const array = listTit.length
        console.log(listTit.length, 'getLandlordListBySearchTitle')

        resolve(array)
      } catch (error) {
        console.log(error, 'getLandlordListBySearchTitle')
        reject([])
      }
    })
  }
}
export const landEstimateDtoListFill = new landEstimateDtoListFills()
