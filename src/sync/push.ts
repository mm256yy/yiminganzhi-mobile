import { db, LandlordDDLType, LandlordTableName } from '@/database/index'
import { PullStateType, DeleteRecordType } from '@/types/sync'

class PushData {
  public db: any
  public state: PullStateType
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
      pullTime: ''
    }
  }
  async getModifyLandlordList() {
    const list: LandlordDDLType[] = await db.selectTableData(
      LandlordTableName,
      'status',
      'modify',
      'isDelete',
      '0'
    )
    this.state.peasantHouseholdPushDtoList = list.map((item) => JSON.parse(item.content))
    this.getDeleteRecordList()
  }

  private async getDeleteRecordList() {
    const deleteList: DeleteRecordType[] = []
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
            immigrantFile
          } = landlordItem
          if (demographicList && demographicList.length) {
            demographicList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'demographicList',
                  deleteId: item.id
                })
              }
            })
          }
          if (immigrantAppendantList && immigrantAppendantList.length) {
            immigrantAppendantList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantAppendantList',
                  deleteId: item.id
                })
              }
            })
          }
          if (immigrantGraveList && immigrantGraveList.length) {
            immigrantGraveList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantGraveList',
                  deleteId: item.id
                })
              }
            })
          }
          if (immigrantHouseList && immigrantHouseList.length) {
            immigrantHouseList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantHouseList',
                  deleteId: item.id
                })
              }
            })
          }
          if (immigrantIncomeList && immigrantIncomeList.length) {
            immigrantIncomeList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantIncomeList',
                  deleteId: item.id
                })
              }
            })
          }
          if (immigrantTreeList && immigrantTreeList.length) {
            immigrantTreeList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantTreeList',
                  deleteId: item.id
                })
              }
            })
          }

          if (immigrantWillList && immigrantWillList.length) {
            immigrantWillList.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantWillList',
                  deleteId: item.id
                })
              }
            })
          }
          if (immigrantFile && immigrantFile.length) {
            immigrantFile.forEach((item) => {
              if (item.id && item.isDelete === '1') {
                deleteList.push({
                  type: 'immigrantFile',
                  deleteId: item.id
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
          if (item.id && item.isDelete === '1') {
            deleteList.push({
              type: 'peasantHouseholdPushDtoList',
              deleteId: item.id
            })
          }
        })
      }
    }
    this.state.deleteRecordList = deleteList
  }
}

export const pushInstance = new PushData()
