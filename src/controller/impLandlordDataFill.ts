/**
 * 部分实施阶段 数据填报
 */

import { guid } from '@/utils'
import {
  HouseType,
  PopulationType,
  AppendantType,
  TreeType,
  EquipmentType,
  FacilitiesType
} from '@/types/datafill'
import {
  ImmigrantDocumentationType,
  AssetHouseFitUpType,
  AssetLandType,
  AssetAppendantType,
  ImmigrantLandType,
  ImmigrantSettleType,
  ImmigrantHouseEmptyType,
  ImmigrantLandEmptyType,
  ImmigrantExcessType,
  ImmigrantChooseHouseType,
  ImmigrantCompensationCardType,
  ImmigrantBuildOneselfType,
  ImmigrantProceduresType,
  SimulateDemographicType,
  SimulateImmigrantSettleType,
  ImmigrantFillingType,
  ImmigrantSelfSeekingType
} from '@/types/impDataFill'
import { ImpLandlord } from './impLandlord'
import { defaultDocumentObj, defaultFillingObj } from './config'
import { HouseAreaType } from '@/types/common'
import { homesteadAreaSize, apartmentAreaSize, apartmentArea, resettleArea } from '@/config'

class ImpDataFill extends ImpLandlord {
  constructor() {
    super()
  }

  // 调查对象-人口新增操作
  addLandlordPeople(uid: string, data: PopulationType): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject('调查对象uid缺失')
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        // 更新了
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.demographicList) {
            landlordItem.demographicList = []
          }
          const arr = landlordItem.demographicList.filter((item) => item.relation === '1')
          if (arr && arr.length > 1) {
            reject('户主不能有多个')
            console.log('户主不能有多个')
            return
          }
          landlordItem.demographicList.push(data)
        } else {
          reject('调查对象信息查询失败')
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordPeople-error')
        reject(false)
      }
    })
  }
  // 调查对象-人口修改操作 批量
  updateLandlordPeopleBatch(uid: string, data: PopulationType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('附属物列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.demographicList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordPeopleBatch-error')
        reject(false)
      }
    })
  }
  // 调查对象-人口修改操作
  updateLandlordPeople(uid: string, data: Partial<PopulationType>): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject('调查对象uid缺失')
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.demographicList = landlordItem.demographicList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              // 更新了
              item.isUpdate = '1'
            }
            return item
          })
          const arr = landlordItem.demographicList.filter((item) => item.relation === '1')
          if (arr && arr.length > 1) {
            reject('户主不能有多个')
            console.log('户主不能有多个')
            return
          }
        } else {
          reject('调查对象信息查询失败')
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordPeople-error')
        reject(false)
      }
    })
  }
  // 调查对象-人口删除操作
  deleteLandlordPeople(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.demographicList = landlordItem.demographicList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isUpdate = '1'
              item.isDelete = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        console.log(landlordItem, '删除的接口内部数据')
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordPeople-error')
        reject(false)
      }
    })
  }

  // 调查对象-附属物新增操作
  addLandlordAppendant(uid: string, data: AppendantType): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject('业主uid缺失')
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantAppendantList) {
            landlordItem.immigrantAppendantList = []
          }
          landlordItem.immigrantAppendantList.push(data)
        } else {
          reject('业主信息查询失败')
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordAppendant-error')
        reject(false)
      }
    })
  }
  // 调查对象-附属物修改操作 批量
  updateLandlordAppendantBatch(uid: string, data: AppendantType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('附属物列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAppendantBatch-error')
        reject(false)
      }
    })
  }
  // 调查对象-附属物修改操作
  updateLandlordAppendant(uid: string, data: AppendantType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList = landlordItem.immigrantAppendantList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAppendant-error')
        reject(false)
      }
    })
  }

  // 调查对象-附属物删除操作
  deleteLandlordAppendant(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList = landlordItem.immigrantAppendantList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordAppendant-error')
        reject(false)
      }
    })
  }

  // 调查对象-附属物新增操作
  addLandlordTree(uid: string, data: TreeType): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject('业主uid缺失')
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantTreeList) {
            landlordItem.immigrantTreeList = []
          }
          landlordItem.immigrantTreeList.push(data)
        } else {
          reject('业主信息查询失败')
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordTree-error')
        reject(false)
      }
    })
  }
  // 调查对象-果木修改操作
  updateLandlordTreeBatch(uid: string, data: TreeType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('果木列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          // const deleteList = landlordItem.immigrantTreeList.filter((item) => item.isDelete === '1')
          landlordItem.immigrantTreeList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordTreeBatch-error')
        reject(false)
      }
    })
  }
  // 调查对象-附属物修改操作
  updateLandlordTree(uid: string, data: TreeType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList = landlordItem.immigrantTreeList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordTree-error')
        reject(false)
      }
    })
  }
  // 调查对象-果木删除操作
  deleteLandlordTree(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList = landlordItem.immigrantTreeList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordTree-error')
        reject(false)
      }
    })
  }

  // 调查对象- 房屋新增操作
  addLandlordHouse(uid: string, data: HouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantHouseList) {
            landlordItem.immigrantHouseList = []
          }
          landlordItem.immigrantHouseList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordHouse-error')
        reject(false)
      }
    })
  }
  // 调查对象-房屋修改操作
  updateLandlordHouse(uid: string, data: HouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantHouseList = landlordItem.immigrantHouseList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordHouse-error')
        reject(false)
      }
    })
  }
  // 调查对象-房屋删除操作
  deleteLandlordHouse(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantHouseList = landlordItem.immigrantHouseList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordHouse-error')
        reject(false)
      }
    })
  }

  // 调查对象-房屋装修 新增操作
  addLandlordHouseFitUp(uid: string, data: AssetHouseFitUpType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.assetHouseFitUpList) {
            landlordItem.assetHouseFitUpList = []
          }
          landlordItem.assetHouseFitUpList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordHouseFitUp-error')
        reject(false)
      }
    })
  }
  // 调查对象-房屋装修 修改操作 批量
  updateLandlordHouseFitUpBatch(uid: string, data: AssetHouseFitUpType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('房屋装修列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetHouseFitUpList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordHouseFitUpBatch-error')
        reject(false)
      }
    })
  }
  // 调查对象-房屋装修 修改操作
  updateLandlordHouseFitUp(uid: string, data: AssetHouseFitUpType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetHouseFitUpList = landlordItem.assetHouseFitUpList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordHouseFitUp-error')
        reject(false)
      }
    })
  }
  // 调查对象-房屋装修 删除操作
  deleteLandlordHouseFitUp(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetHouseFitUpList = landlordItem.assetHouseFitUpList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordHouseFitUp-error')
        reject(false)
      }
    })
  }

  // 调查对象-设施设备新增操作
  addLandlordEquipment(uid: string, data: EquipmentType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        console.log(landlordItem, '测试landlordItem')
        if (landlordItem) {
          if (!landlordItem.immigrantEquipmentList) {
            landlordItem.immigrantEquipmentList = []
          }
          landlordItem.immigrantEquipmentList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 调查对象-设施设备修改操作
  updateLandlordEquipment(uid: string, data: EquipmentType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 调查对象-设施设备删除操作
  deleteLandlordEquipment(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordEquipment-error')
        reject(false)
      }
    })
  }

  // 调查对象-基础设施评估新增操作  暂时这么写 枚举类型需更换
  addInfrastructure(uid: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        console.log(landlordItem, '测试landlordItem')
        if (landlordItem) {
          if (!landlordItem.immigrantEquipmentList) {
            landlordItem.immigrantEquipmentList = []
          }
          landlordItem.immigrantEquipmentList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 调查对象-基础设施评估修改操作
  updateInfrastructure(uid: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 调查对象-基础设施评估删除操作
  deleteInfrastructure(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordEquipment-error')
        reject(false)
      }
    })
  }

  // 调查对象-其他评估新增操作
  addOther(uid: string, data: EquipmentType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        console.log(landlordItem, '测试landlordItem')
        if (landlordItem) {
          if (!landlordItem.immigrantEquipmentList) {
            landlordItem.immigrantEquipmentList = []
          }
          landlordItem.immigrantEquipmentList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 调查对象-其他评估修改操作
  updateOther(uid: string, data: EquipmentType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 调查对象-其他评估删除操作
  deleteOther(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordEquipment-error')
        reject(false)
      }
    })
  }


  // 调查对象-农村专项设施新增操作
  addLandlordFacilities(uid: string, data: FacilitiesType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantFacilitiesList) {
            landlordItem.immigrantFacilitiesList = []
          }
          landlordItem.immigrantFacilitiesList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordFacilities-error')
        reject(false)
      }
    })
  }
  // 调查对象-农村专项设施修改操作
  updateLandlordFacilities(uid: string, data: FacilitiesType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantFacilitiesList = landlordItem.immigrantFacilitiesList.map(
            (item) => {
              if (item.uid === data.uid) {
                item = { ...item, ...data }
                item.isUpdate = '1'
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordFacilities-error')
        reject(false)
      }
    })
  }
  // 调查对象-农村专项设施删除操作
  deleteLandlordFacilities(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantFacilitiesList = landlordItem.immigrantFacilitiesList.map(
            (item) => {
              if (item.uid === itemUid) {
                item.deleteReason = deleteReason || ''
                item.isDelete = '1'
                item.isUpdate = '1'
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordFacilities-error')
        reject(false)
      }
    })
  }

  // 调查对象-土地基本情况 新增操作
  addLandlordAssetLand(uid: string, data: AssetLandType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.assetLandList) {
            landlordItem.assetLandList = []
          }
          landlordItem.assetLandList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordAssetLand-error')
        reject(false)
      }
    })
  }
  // 调查对象-土地基本情况 修改操作 批量
  updateLandlordAssetLandBatch(uid: string, data: AssetLandType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('土地基本情况评估列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetLandList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAssetLandBatch-error')
        reject(false)
      }
    })
  }
  // 调查对象-土地基本情况 修改操作
  updateLandlordAssetLand(uid: string, data: AssetLandType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetLandList = landlordItem.assetLandList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAssetLand-error')
        reject(false)
      }
    })
  }
  // 调查对象-土地基本情况 删除操作
  deleteLandlordAssetLand(uid: string, itemUid: string, deleteReason?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetLandList = landlordItem.assetLandList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordAssetLand-error')
        reject(false)
      }
    })
  }

  // 调查对象-土地青苗及附着物 新增操作
  addLandlordAssetAppendant(uid: string, data: AssetAppendantType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        data.isUpdate = '1'
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (!landlordItem.assetAppendantList) {
            landlordItem.assetAppendantList = []
          }
          landlordItem.assetAppendantList.push(data)
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordAssetAppendant-error')
        reject(false)
      }
    })
  }
  // 调查对象-土地青苗及附着物 修改操作
  updateLandlordAssetAppendantBatch(uid: string, data: AssetAppendantType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('土地青苗及附着物评估列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetAppendantList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAssetAppendantBatch-error')
        reject(false)
      }
    })
  }
  // 调查对象-土地青苗及附着物 修改操作
  updateLandlordAssetAppendant(uid: string, data: AssetAppendantType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetAppendantList = landlordItem.assetAppendantList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAssetAppendant-error')
        reject(false)
      }
    })
  }
  // 调查对象-土地青苗及附着物 删除操作
  deleteLandlordAssetAppendant(
    uid: string,
    itemUid: string,
    deleteReason?: string
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.assetAppendantList = landlordItem.assetAppendantList.map((item) => {
            if (item.uid === itemUid) {
              item.deleteReason = deleteReason || ''
              item.isDelete = '1'
              item.isUpdate = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordAssetAppendant-error')
        reject(false)
      }
    })
  }

  // 调查对象-归档信息 修改操作
  updateLandlordDocumentation(
    uid: string,
    data: Partial<ImmigrantDocumentationType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        let mergeObj: any = {}
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantDocumentation) {
            // 存在
            mergeObj = {
              ...landlordItem.immigrantDocumentation,
              ...data
            }
            mergeObj.isUpdate = '1'
          } else {
            // 不存在
            mergeObj = { ...defaultDocumentObj, ...data }
            mergeObj.isUpdate = '1'
          }
          landlordItem.immigrantDocumentation = mergeObj
          if (!landlordItem.immigrantDocumentation.uid) {
            landlordItem.immigrantDocumentation.uid = guid()
          }
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }

        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordDocumentation-error')
        reject(false)
      }
    })
  }

  // 调查对象-生产用地 修改操作
  updateLandlordImmigrantLand(uid: string, data: Partial<ImmigrantLandType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantLand) {
            // 存在
            landlordItem.immigrantLand = { ...landlordItem.immigrantLand, ...data }
          } else {
            landlordItem.immigrantLand = { ...data }
          }
          if (!landlordItem.immigrantLand.uid) {
            landlordItem.immigrantLand.uid = guid()
          }
          landlordItem.immigrantLand.isUpdate = '1'
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordImmigrantLand-error')
        reject(false)
      }
    })
  }

  // 调查对象-搬迁安置确认 修改操作
  updateLandlordRelocateResettle(
    uid: string,
    data: Partial<ImmigrantSettleType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantSettle) {
            // 存在
            landlordItem.immigrantSettle = { ...landlordItem.immigrantSettle, ...data }
          } else {
            landlordItem.immigrantSettle = { ...data }
          }
          if (!landlordItem.immigrantSettle.uid) {
            landlordItem.immigrantSettle.uid = guid()
          }
          landlordItem.immigrantSettle.isUpdate = '1'

          /**
           * 给选房择址添加初始数据
           */

          // 存放选房择址初始值
          let array: any = []
          // 选择了 宅基地和公寓房
          const {
            houseAreaType,
            areaType,
            settleAddress,
            typeOneNum,
            typeTwoNum,
            typeThreeNum,
            typeFourNum
          } = landlordItem.immigrantSettle
          console.log(landlordItem.immigrantSettle,'测试这是什么')
          if (houseAreaType === HouseAreaType.homestead || houseAreaType === HouseAreaType.flat) {
            const houseAreaTypeText = houseAreaType === HouseAreaType.flat ? '公寓房' : '宅基地'

            // 选房择址 默认字段
            const defaultChooseHouseObj = {
              lotteryOrder: '',
              placeOrder: '',
              eachPieceLand: null,
              landNo: '',
              landArea: '',
              houseNo: '',
              roomNo: '',
              storeroomNo: '',
              lotteryOrderPic: '[]',
              placeOrderPic: '[]',
              chooseHousePic: '[]',
              otherPic: '[]',
              lotteryOrderVerifyPic: '[]',
              placeOrderVerifyPic: '[]',
              carNo: ''
            }
            if (houseAreaType === HouseAreaType.homestead) {
              const obj = {
                uid: guid(),
                doorNo: landlordItem.doorNo,
                settleAddress,
                settleAddressText: resettleArea.find((item) => item.id === settleAddress)?.name,
                houseAreaType,
                houseAreaTypeText,
                area: homesteadAreaSize.find((item) => item.id === areaType)?.name,
                ...defaultChooseHouseObj
              }
              array = [obj]
            } else {
              if (typeOneNum) {
                for(let i=0;i<typeOneNum;i++){
                array.push({
                  uid: guid(),
                  doorNo: landlordItem.doorNo,
                  settleAddress,
                  settleAddressText: apartmentArea.find((item) => item.id === settleAddress)?.name,
                  houseAreaType,
                  houseAreaTypeText,
                  area: apartmentAreaSize[0].name,
                  ...defaultChooseHouseObj
                })
              }
              }
              if (typeTwoNum) {
                for(let i=0;i<typeTwoNum;i++){
                  array.push({
                    uid: guid(),
                    doorNo: landlordItem.doorNo,
                    settleAddress,
                    settleAddressText: apartmentArea.find((item) => item.id === settleAddress)?.name,
                    houseAreaType,
                    houseAreaTypeText,
                    area: apartmentAreaSize[1].name,
                    ...defaultChooseHouseObj
                  })
                }
              }
              if (typeThreeNum) {
                for(let i=0;i<typeThreeNum;i++){
                array.push({
                  uid: guid(),
                  doorNo: landlordItem.doorNo,
                  settleAddress,
                  settleAddressText: apartmentArea.find((item) => item.id === settleAddress)?.name,
                  houseAreaType,
                  houseAreaTypeText,
                  area: apartmentAreaSize[2].name,
                  ...defaultChooseHouseObj
                })
              }
              }
              if (typeFourNum) {
                for(let i=0;i<typeFourNum;i++){
                array.push({
                  uid: guid(),
                  doorNo: landlordItem.doorNo,
                  settleAddress,
                  settleAddressText: apartmentArea.find((item) => item.id === settleAddress)?.name,
                  houseAreaType,
                  houseAreaTypeText,
                  area: apartmentAreaSize[3].name,
                  ...defaultChooseHouseObj
                })
              }
              }
            }
          } else {
            array = []
          }
          // 给选房择址 赋值
          landlordItem.immigrantChooseHouseList = array
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordRelocateResettle-error')
        reject(false)
      }
    })
  }

  // 调查对象-房屋腾空 修改操作
  updateLandlordHouseEmpty(uid: string, data: Partial<ImmigrantHouseEmptyType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantHouseEmpty) {
            // 存在
            landlordItem.immigrantHouseEmpty = { ...landlordItem.immigrantHouseEmpty, ...data }
          } else {
            landlordItem.immigrantHouseEmpty = { ...data }
          }
          if (!landlordItem.immigrantHouseEmpty.uid) {
            landlordItem.immigrantHouseEmpty.uid = guid()
          }

          landlordItem.immigrantHouseEmpty.isUpdate = '1'
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordHouseEmpty-error')
        reject(false)
      }
    })
  }

  // 调查对象-土地腾空 修改操作
  updateLandlordLandEmpty(uid: string, data: Partial<ImmigrantLandEmptyType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantLandEmpty) {
            // 存在
            landlordItem.immigrantLandEmpty = { ...landlordItem.immigrantLandEmpty, ...data }
          } else {
            landlordItem.immigrantLandEmpty = { ...data }
          }
          if (!landlordItem.immigrantLandEmpty.uid) {
            landlordItem.immigrantLandEmpty.uid = guid()
          }
          landlordItem.immigrantLandEmpty.isUpdate = '1'
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordLandEmpty-error')
        reject(false)
      }
    })
  }

  // 调查对象-过渡安置 修改操作
  updateLandlordExcess(uid: string, data: Partial<ImmigrantExcessType>): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantExcess) {
            // 存在
            landlordItem.immigrantExcess = { ...landlordItem.immigrantExcess, ...data }
          } else {
            landlordItem.immigrantExcess = { ...data }
          }
          if (!landlordItem.immigrantExcess.uid) {
            landlordItem.immigrantExcess.uid = guid()
          }
          landlordItem.immigrantExcess.isUpdate = '1'
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordExcess-error')
        reject(false)
      }
    })
  }

  // 调查对象-选房择址 修改操作 批量
  updateLandlordChooseHouseBatch(uid: string, data: ImmigrantChooseHouseType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('选房择址列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantChooseHouseList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordChooseHouseBatch-error')
        reject(false)
      }
    })
  }

  // 调查对象-选房择址 修改操作
  updateLandlordChooseHouse(uid: string, data: ImmigrantChooseHouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantChooseHouseList = landlordItem.immigrantChooseHouseList.map(
            (item) => {
              if (item.uid === data.uid) {
                item = { ...item, ...data }
                item.isUpdate = '1'
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordChooseHouse-error')
        reject(false)
      }
    })
  }

  // 调查对象-移民建卡 修改操作
  updateLandlordCompensationCardBatch(
    uid: string,
    data: ImmigrantCompensationCardType[]
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('移民建卡列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantCompensationCardList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            item.isUpdate = '1'
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordCompensationCardBatch-error')
        reject(false)
      }
    })
  }

  // 调查对象-移民建卡 修改操作
  updateLandlordCompensationCard(
    uid: string,
    data: ImmigrantCompensationCardType
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      console.log(uid, data, 'uid测试')
      try {
        if (!uid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        console.log(landlordItem, '更新的数据')
        if (landlordItem) {
          if (landlordItem.immigrantCompensationCardList.length > 0) {
            const index = landlordItem.immigrantCompensationCardList.findIndex(
              (e: any) => e.id == data.id
            )
            if (index > -1) {
              landlordItem.immigrantCompensationCardList[index] = data
            } else {
              console.log(landlordItem.immigrantCompensationCardList, data, '筛查的数据')
              landlordItem.immigrantCompensationCardList.push(data)
            }
          } else {
            landlordItem.immigrantCompensationCardList.push({ ...data, isUpdate: '1' })
          }
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        console.log('用户表', landlordItem.immigrantCompensationCardList)
        console.log('更新表', data)
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordCompensationCard-error')
        reject(false)
      }
    })
  }

  // 自建房 修改操作
  updateLandlordBuildSelf(
    uid: string,
    itemUid: string,
    data: Partial<ImmigrantBuildOneselfType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data) {
          reject(false)
          console.log('自建房信息缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantBuildOneselfList = landlordItem.immigrantBuildOneselfList.map(
            (item) => {
              if (item.uid === itemUid) {
                item = { ...item, ...data }
                item.isUpdate = '1'
              }
              return item
            }
          )
          // isComplete = '1'的下一个 需要更新 为 '2'
          let isCompleteOneIndex = -1
          landlordItem.immigrantBuildOneselfList.forEach((item, index) => {
            if (item.isComplete === '1') {
              isCompleteOneIndex = index
            }
          })
          if (isCompleteOneIndex !== -1) {
            landlordItem.immigrantBuildOneselfList = landlordItem.immigrantBuildOneselfList.map(
              (item, dex) => {
                if (dex === isCompleteOneIndex + 1) {
                  item.isComplete = '2'
                }
                return item
              }
            )
          }
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordBuildSelf-error')
        reject(false)
      }
    })
  }

  // 相关手续  修改操作
  updateLandlordProcedures(
    uid: string,
    itemUid: string,
    data: Partial<ImmigrantProceduresType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('调查对象uid缺失')
          return
        }
        if (!data) {
          reject(false)
          console.log('相关手续信息缺失')
          return
        }
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.immigrantProceduresList = landlordItem.immigrantProceduresList.map(
            (item) => {
              if (item.uid === itemUid) {
                item = { ...item, ...data }
                item.isUpdate = '1'
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordProcedures-error')
        reject(false)
      }
    })
  }

  // 模拟安置 生产安置
  updateImpLandlordSimulateDemographic(
    uid: string,
    data: Partial<SimulateDemographicType>[]
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          landlordItem.simulateDemographic = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
            }
            return item
          })
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateImpLandlordSimulateDemographic-error')
        reject(false)
      }
    })
  }

  // 模拟安置 搬迁安置
  updateImpLandlordSimulateImmigrantSettle(
    uid: string,
    data: Partial<SimulateImmigrantSettleType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.simulateImmigrantSettle) {
            // 存在
            landlordItem.simulateImmigrantSettle = {
              ...landlordItem.simulateImmigrantSettle,
              ...data
            }
          } else {
            landlordItem.simulateImmigrantSettle = { ...data }
          }
          if (!landlordItem.simulateImmigrantSettle.uid) {
            landlordItem.simulateImmigrantSettle.uid = guid()
          }
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateImpLandlordSimulateImmigrantSettle-error')
        reject(false)
      }
    })
  }

  // 填报状态更新
  updateImpLandlordImmigrantFilling(
    uid: string,
    data: Partial<ImmigrantFillingType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        let mergeObj: any = {}
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantFilling) {
            // 存在
            mergeObj = {
              ...landlordItem.immigrantFilling,
              ...data
            }
          } else {
            // 不存在
            mergeObj = { ...defaultFillingObj, ...data }
          }
          landlordItem.immigrantFilling = mergeObj
          if (!landlordItem.immigrantFilling.uid) {
            landlordItem.immigrantFilling.uid = guid()
          }
          landlordItem.immigrantFilling.isUpdate = '1'
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }

        // 更新数据
        console.log(landlordItem, '测试填报完成接口')
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateImpLandlordImmigrantFilling-error')
        reject(false)
      }
    })
  }

  // 搬迁安置 自谋出路
  updateImpLandlordImmigrantSelfSeeking(
    uid: string,
    data: Partial<ImmigrantSelfSeekingType>
  ): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !uid) {
          reject(false)
          console.log('uid或数据缺失')
          return
        }

        // 拿到详情信息
        const landlordItem = await this.getLandlordByUidNoFilter(uid)
        if (landlordItem) {
          if (landlordItem.immigrantSelfSeeking) {
            // 存在
            landlordItem.immigrantSelfSeeking = {
              ...landlordItem.immigrantSelfSeeking,
              ...data
            }
          } else {
            landlordItem.immigrantSelfSeeking = { ...data }
          }
          if (!landlordItem.immigrantSelfSeeking.uid) {
            landlordItem.immigrantSelfSeeking.uid = guid()
          }
          landlordItem.immigrantSelfSeeking.isUpdate = '1'
        } else {
          reject(false)
          console.log('调查对象信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateImpLandlordImmigrantSelfSeeking-error')
        reject(false)
      }
    })
  }
}

export const ImpDataFillController = new ImpDataFill()
