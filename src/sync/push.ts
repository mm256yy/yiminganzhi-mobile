import {
  db,
  LandlordDDLType,
  LandlordTableName,
  OtherDataType,
  OtherTableName,
  VillageDDLType,
  VillageTableName
} from '@/database/index'
import { VillageType } from '@/types/common'
import { PushStateType, DeleteRecordType, LandlordType } from '@/types/sync'
import { pushDataApi } from './api'

class PushData {
  public db: any
  public state: PushStateType
  constructor() {
    // 数据库是否打开
    const isOpen = db.isOpen()
    if (isOpen) {
      this.db = db
    } else {
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
        .then((res) => {
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

  // 推送数据
  public async push(): Promise<any> {
    return new Promise((resolve, reject) => {
      // 一起执行
      Promise.all([this.getModifyLandlordList, this.getModifyVillageList, this.getPullTime])
        .then(() => {
          // 拿到结果了
          const { peasantHouseholdPushDtoList, deleteRecordList, pullTime, villageList } =
            this.state
          if (
            this.isArrayAndNotNull(peasantHouseholdPushDtoList) &&
            this.isArrayAndNotNull(villageList) &&
            this.isArrayAndNotNull(deleteRecordList)
          ) {
            pushDataApi({
              peasantHouseholdPushDtoList,
              deleteRecordList,
              pullTime,
              villageList
            })
              .then(() => {
                resolve(true)
              })
              .catch((err) => {
                reject(err)
              })
          } else {
            resolve(true)
          }
        })
        .catch(() => {
          resolve(false)
        })
    })
  }
}

export const pushInstance = new PushData()
