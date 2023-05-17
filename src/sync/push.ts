import {
  db,
  LandlordDDLType,
  LandlordTableName,
  OtherDataType,
  OtherTableName,
  VillageDDLType,
  VillageTableName,
  ImageDDLType,
  ImageTableName,
  GraveTableName,
  GraveDDLType
} from '@/database/index'

import { VillageType } from '@/types/common'
import { PushStateType, DeleteRecordType, LandlordType } from '@/types/sync'
import dayjs from 'dayjs'
import { pushDataApi } from './api'
import { env, getHeaderCommonParams } from '@/config'

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
      villageList: [],
      immigrantGraveList: []
    }
  }

  private initAndReset() {
    this.state = {
      peasantHouseholdPushDtoList: [],
      deleteRecordList: [],
      pullTime: '',
      villageList: [],
      immigrantGraveList: []
    }
  }

  getModifyLandlordList() {
    return new Promise((resolve, reject) => {
      db.selectTableData(LandlordTableName, 'status', 'modify', 'isDelete', '0')
        .then((res: LandlordDDLType[]) => {
          const list: LandlordType[] = res.map((item) => JSON.parse(item.content))
          this.state.peasantHouseholdPushDtoList = list
          this.getDeleteRecordList().finally(() => {
            resolve(list)
          })
        })
        .catch((err) => {
          console.error('推送-获取业主列表失败', err)
          reject([])
        })
    })
  }

  getModifyVillageList() {
    return new Promise((resolve, reject) => {
      db.selectTableData(VillageTableName, 'status', 'modify', 'isDelete', '0')
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

  getModifyGraveList() {
    return new Promise((resolve, reject) => {
      db.selectTableData(GraveTableName, 'status', 'modify', 'isDelete', '0')
        .then((res: VillageDDLType[]) => {
          const result = res.map((item) => JSON.parse(item.content))
          this.state.immigrantGraveList = result
          resolve(result)
        })
        .catch(() => {
          reject(null)
        })
    })
  }

  getPullTime() {
    return new Promise((resolve, reject) => {
      db.selectTableData(OtherTableName, 'type', OtherDataType.PullTime)
        .then((res: any) => {
          this.state.pullTime = res.content
          resolve(Number(res.content) || '')
        })
        .catch(() => {
          reject('')
        })
    })
  }

  private getDeleteRecordList() {
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

      // 删除的坟墓
      const immigrantGraveList: GraveDDLType[] = await db.selectTableData(
        GraveTableName,
        'isDelete',
        '1'
      )
      if (immigrantGraveList && immigrantGraveList.length) {
        const realList = immigrantGraveList.map((item) => {
          return JSON.parse(item.content)
        })
        if (realList.length) {
          realList.forEach((item) => {
            if (item.uid && item.id) {
              deleteList.push({
                type: 'immigrantGraveList',
                deleteId: item.uid
              })
            }
          })
        }
      }

      const list: LandlordDDLType[] = await db.selectTableData(LandlordTableName, 'isDelete', '1')
      const { peasantHouseholdPushDtoList: landlordList } = this.state
      if (landlordList && landlordList.length) {
        landlordList.forEach((landlordItem) => {
          // id存在 表示是老数据 不是pad端新增的
          if (landlordItem.id) {
            const {
              demographicList,
              immigrantAppendantList,
              immigrantHouseList,
              immigrantIncomeList,
              immigrantTreeList,
              immigrantManagementList,
              immigrantEquipmentList,
              immigrantFacilitiesList
            } = landlordItem
            if (demographicList && demographicList.length) {
              demographicList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'demographicList',
                    deleteId: item.uid,
                    reason: item.reason
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
            // if (immigrantGraveList && immigrantGraveList.length) {
            //   immigrantGraveList.forEach((item) => {
            //     if (item.uid && item.isDelete === '1') {
            //       deleteList.push({
            //         type: 'immigrantGraveList',
            //         deleteId: item.uid
            //       })
            //     }
            //   })
            // }
            if (immigrantHouseList && immigrantHouseList.length) {
              immigrantHouseList.forEach((item) => {
                if (item.uid && item.isDelete === '1') {
                  deleteList.push({
                    type: 'immigrantHouseList',
                    deleteId: item.uid,
                    reason: item.reason
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
        const realList = list.map((landlordItem) => {
          return JSON.parse(landlordItem.content)
        })
        console.log('realList:', realList)
        if (realList.length) {
          realList.forEach((item) => {
            if (item.uid && item.id) {
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

  public uploadImages(): Promise<any> {
    // 上传本地图片-更新数据库
    return new Promise(async (resolve, reject) => {
      try {
        const imageList: ImageDDLType[] = await db.selectTableData(ImageTableName, 'status', '0')
        if (imageList && imageList.length) {
          let count = 0
          imageList.forEach((item) => {
            uni.uploadFile({
              url: `${env.apiBaseUrl}${env.apiBasePath}/files`,
              filePath: item.path,
              name: 'files',
              header: {
                ...getHeaderCommonParams(),
                'content-type': 'application/x-www-form-urlencoded'
              },
              success: (res) => {
                console.log('推送数据-图片上传:', res.data)
                count++
                if (res && res.data) {
                  const responseData = JSON.parse(res.data)
                  if (responseData && responseData.data && responseData.data[0]) {
                    const values = `status = '1',url = '${
                      responseData.data[0]
                    }',updatedDate = '${dayjs().valueOf()}'`
                    const sql = `update ${ImageTableName} set ${values} where id = '${item.id}'`
                    db.execteSql([sql])
                  }
                }
              },
              fail: () => {
                count++
                console.log('图片上传失败:', item.path)
              },
              complete: () => {
                if (count === imageList.length) {
                  console.log('图片：全部完成')
                  resolve(true)
                  count = 0
                  return
                }
              }
            })
          })
        } else {
          console.log('图片：暂无上传')
          resolve(true)
        }
      } catch (err) {
        reject()
        console.log('uploadImages-error', err)
      }
    })
  }

  // 推送数据
  public push(): Promise<any> {
    return new Promise((resolve, reject) => {
      // 一起执行
      Promise.all([
        this.getModifyLandlordList(),
        this.getModifyVillageList(),
        this.getPullTime(),
        this.getModifyGraveList()
      ])
        .then(() => {
          // 拿到结果了
          const {
            peasantHouseholdPushDtoList,
            deleteRecordList,
            pullTime,
            villageList,
            immigrantGraveList
          } = this.state
          console.info('推送数据-业主列表:', peasantHouseholdPushDtoList)
          console.info('推送数据-自然村列表:', villageList)
          console.info('推送数据-删除列表:', deleteRecordList)
          console.info('推送数据-拉取时间:', pullTime)
          console.info('推送数据-坟墓列表:', immigrantGraveList)

          pushDataApi({
            peasantHouseholdPushDtoList,
            deleteRecordList,
            pullTime,
            villageList,
            immigrantGraveList
          })
            .then((res) => {
              console.log('推送: 接口suc:', res)
              // 跑图片上传 不需要关注失败或者成功
              this.uploadImages()
                .catch(() => {
                  console.log('部分图片推送失败，请再次同步')
                  // uni.showToast('部分图片推送失败，请再次同步')
                })
                .finally(() => {
                  resolve(res)
                })
            })
            .catch((err) => {
              console.error('推送: 接口err', err)
              reject(err)
            })
            .finally(() => {
              // 初始化 重置
              this.initAndReset()
            })
        })
        .catch((err) => {
          console.error('推送: 操作数据库err', err)
          reject(false)
        })
    })
  }
}

export const pushInstance = new PushData()
