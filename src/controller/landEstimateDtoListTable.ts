import { Common } from './common'
import { landEstimateDtoListName, LandlordTableName } from '@/database'
import { getLandPeasantHouseholdDtoListApi } from '@/service'
import { addLandlordApi } from '@/service'
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
          sql += ` and doorNo = '${doorNo}'`
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
          if (res && res.code) {
            reject(false)
            return
          }
        })
        const sqlTd = `select * from ${landEstimateDtoListName} where doorNo='${doorNos}'`
        listTds = await this.db.selectSql(sqlTd)
        const sqlUser = `select * from ${LandlordTableName} where type = 'LandNoMove' and doorNo='${doorNos}'`
        const userData = await this.db.selectSql(sqlUser)
        const userDataAll = await this.db.selectSql(
          `select * from ${LandlordTableName} where type = 'LandNoMove'`
        )
        console.log(userData, listTds, doorNos, '修改人')

        if (userData.length == 1) {
          ImpDataFillController.updateLandlordAssetLandBatch(userData[0].uid, listTds)
          userDataAll.forEach((item: any) => {
            if (item.landEstimateDtoList) {
              let m = false
              item.landEstimateDtoList.forEach((key: any) => {
                if (uids.incloud(key.uid)) {
                  m = true
                }
              })
              if (m) {
                ImpDataFillController.updateLandlordAssetLandBatch(
                  item.uid,
                  item.landEstimateDtoList.filter((value: any) => !uids.incloud(value.uid))
                )
              }
            }
          })
        } else {
          console.log('数据重复')
        }
        resolve(true)
      } catch (error) {
        console.log(error, 'updateLandlord-error')
        reject(false)
      }
    })
  }
}
export const landEstimateDtoListFill = new landEstimateDtoListFills()
