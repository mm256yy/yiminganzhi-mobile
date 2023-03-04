import {
  db,
  LandlordDDLType,
  LandlordTableName,
  OtherDataType,
  OtherTableName,
  VillageDDLType,
  VillageTableName
} from '@/database/index'
import { ImageTableName } from '@/database/tables/image'
import { VillageType } from '@/types/common'
import { PushStateType, DeleteRecordType, LandlordType } from '@/types/sync'
import dayjs from 'dayjs'
import { pushDataApi, filesUpload } from './api'

class PushData {
  public db: any
  public state: PushStateType
  constructor() {
    // 数据库是否打开
    const isOpen = db.isOpen()
    this.db = db
    if (!isOpen) {
      db.openDB().then(() => {
        this.db = db
      })
    }
    this.state = {
      peasantHouseholdPushDtoList: [],
      deleteRecordList: [],
      pullTime: '',
      villageList: []
    }
  }

  getModifyLandlordList() {
    return new Promise(async (resolve, reject) => {
      db.selectTableData(LandlordTableName, 'status', 'modify', 'isDelete', '0')
        .then((res: LandlordDDLType[]) => {
          const list: LandlordType[] = res.map((item) => JSON.parse(item.content))
          this.state.peasantHouseholdPushDtoList = list
          this.getDeleteRecordList().finally(() => {
            resolve(list)
          })
        })
        .catch(() => {
          reject([])
        })
    })
  }

  async getModifyVillageList() {
    return new Promise(async (resolve, reject) => {
      db.selectTableData(VillageTableName, 'status', 'modify')
        .then((res: VillageDDLType[]) => {
          const result = res.map((item) => JSON.parse(item.content))
          this.state.villageList = result
          resolve(result)
        })
        .catch(() => {
          reject(null)
        })
    })
  }

  async getPullTime() {
    return new Promise(async (resolve, reject) => {
      db.selectTableData(OtherTableName, 'type', OtherDataType.PullTime)
        .then((res: any) => {
          this.state.pullTime = res.content
          resolve(res.content)
        })
        .catch(() => {
          reject('')
        })
    })
  }

  private async getDeleteRecordList() {
    return new Promise(async (resolve) => {
      const deleteList: DeleteRecordType[] = []

      const villageList: VillageType[] = await db.selectTableData(VillageTableName, 'isDelete', '1')
      villageList.forEach((item) => {
        if (item.id && item.uid) {
          deleteList.push({
            type: 'village',
            deleteId: item.uid
          })
        }
      })
      const list: LandlordDDLType[] = await db.selectTableData(LandlordTableName, 'isDelete', '1')

      const { peasantHouseholdPushDtoList: landlordList } = this.state
      if (landlordList && landlordList.length) {
        landlordList.forEach((landlordItem) => {
          // id存在 表示是老数据 不是pad端新增的
          if (landlordItem.id) {
            const {
              demographicList,
              immigrantAppendantList,
              immigrantGraveList,
              immigrantHouseList,
              immigrantIncomeList,
              immigrantTreeList,
              immigrantWillList,
              immigrantFile,
              immigrantManagementList,
              immigrantEquipmentList,
              immigrantFacilitiesList
            } = landlordItem
            if (demographicList && demographicList.length) {
              demographicList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'demographicList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantAppendantList && immigrantAppendantList.length) {
              immigrantAppendantList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantAppendantList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantGraveList && immigrantGraveList.length) {
              immigrantGraveList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantGraveList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantHouseList && immigrantHouseList.length) {
              immigrantHouseList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantHouseList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantIncomeList && immigrantIncomeList.length) {
              immigrantIncomeList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantIncomeList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantTreeList && immigrantTreeList.length) {
              immigrantTreeList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantTreeList',
                    deleteId: item.uid
                  })
                }
              })
            }

            if (immigrantWillList && immigrantWillList.length) {
              immigrantWillList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantWillList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantFile && immigrantFile.length) {
              immigrantFile.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantFile',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantManagementList && immigrantManagementList.length) {
              immigrantManagementList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantManagementList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantEquipmentList && immigrantEquipmentList.length) {
              immigrantEquipmentList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantEquipmentList',
                    deleteId: item.uid
                  })
                }
              })
            }
            if (immigrantFacilitiesList && immigrantFacilitiesList.length) {
              immigrantFacilitiesList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantFacilitiesList',
                    deleteId: item.uid
                  })
                }
              })
            }
          }
        })
      }
      if (list && list.length) {
        const realList = list.map((landlordItem) => JSON.parse(landlordItem.content))
        if (realList.length) {
          realList.forEach((item) => {
            if (item.uid && item.isDelete === '1') {
              deleteList.push({
                type: 'peasantHouseholdPushDtoList',
                deleteId: item.uid
              })
            }
          })
        }
      }
      this.state.deleteRecordList = deleteList
      resolve(deleteList)
    })
  }

  public isArrayAndNotNull(list: any): boolean {
    if (list && Array.isArray(list) && list.length) {
      return true
    }
    return false
  }

  public uploadImages() {
    // 上传本地图片-更新数据库
    return new Promise(async (resolve, reject) => {
      try {
        const imageList: VillageType[] = await db.selectTableData(ImageTableName, 'status', '0')
        if (imageList && imageList.length) {
          // id
          // 'url' text,
          // 'file' text,
          // 'base64' text,
          // 'status' text,
          // 'updatedDate' text
          const files = imageList.map((item) => item.file)
          filesUpload({
            files
          })
            .then((res) => {
              // 更新状态
              if (res && res.length) {
                const ids: number[] = []
                // 拿到 需要更新的id
                imageList.forEach((item) => {
                  if (res.includes(item.url)) {
                    ids.push(item.id)
                  }
                })
                const sqls: string[] = []
                ids.forEach((id) => {
                  const values = `status = '1',file = '',updatedDate = '${dayjs().valueOf()}'`
                  sqls.push(`update ${LandlordTableName} set ${values} where id = '${id}'`)
                })
                db?.execteSql(sqls)
              }
            })
            .catch(() => {
              // 如果失败了 等下次在上传
            })
        }
      } catch (err) {
        console.log('uploadImages-error', err)
      }
    })
  }

  // 推送数据
  public async push(): Promise<any> {
    return new Promise((resolve, reject) => {
      // 一起执行
      Promise.all([this.getModifyLandlordList, this.getModifyVillageList, this.getPullTime])
        .then(() => {
          // 拿到结果了
          const { peasantHouseholdPushDtoList, deleteRecordList, pullTime, villageList } =
            this.state

          pushDataApi({
            peasantHouseholdPushDtoList,
            deleteRecordList,
            pullTime,
            villageList
          })
            .then((res) => {
              resolve(res)
            })
            .catch((err) => {
              reject(err)
            })
        })
        .catch(() => {
          reject(false)
        })

      // 跑图片上传 不需要关注失败或者成功
      this.uploadImages()
    })
  }
}

export const pushInstance = new PushData()
