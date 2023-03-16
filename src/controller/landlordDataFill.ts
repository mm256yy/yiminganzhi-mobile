/**
 * 提供业主 - 数据填报 相关的增删改功能
 */

import { LandlordType } from '@/types/sync'
import { guid } from '@/utils'
import {
  PopulationType,
  AppendantType,
  WillType,
  TreeType,
  HouseType,
  FamilyIncomeType,
  GraveType,
  ImmigrantFileType,
  // CompanyType,
  EquipmentType,
  FacilitiesType,
  ManagementType
} from '@/types/datafill'
import { Landlord } from './landlord'

// // 人口
// demographicList: PopulationType[]
// // 附属物
// immigrantAppendantList: AppendantType[]
// // 果木
// immigrantTreeList: TreeType[]
// // 坟墓
// immigrantGraveList: GraveType[]
// // 房屋
// immigrantHouseList: HouseType[]
// // 安置意愿
// immigrantWillList: WillType[]
// // 家庭收入
// immigrantIncomeList: FamilyIncomeType[]
// 附件
// immigrantFile: ImmigrantFile[]
class DataFill extends Landlord {
  constructor() {
    super()
  }

  // 业主-人口新增操作
  addLandlordPeople(uid: string, data: PopulationType): Promise<boolean | string> {
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
        const landlordItem = await this.getLandlordByUid(uid)
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
          reject('业主信息查询失败')
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordPeople-error')
        reject(false)
      }
    })
  }
  // 业主-人口修改操作
  updateLandlordPeople(uid: string, data: PopulationType): Promise<boolean | string> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject('业主uid缺失')
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.demographicList = landlordItem.demographicList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
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
          reject('业主信息查询失败')
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordPeople-error')
        reject(false)
      }
    })
  }
  // 业主-人口删除操作
  deleteLandlordPeople(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.demographicList = landlordItem.demographicList.map((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordPeople-error')
        reject(false)
      }
    })
  }

  // 业主-附属物修改操作
  updateLandlordAppendant(uid: string, data: AppendantType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('附属物列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordAppendant-error')
        reject(false)
      }
    })
  }
  // 业主-附属物删除操作
  deleteLandlordAppendant(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList = landlordItem.immigrantAppendantList.map((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordAppendant-error')
        reject(false)
      }
    })
  }

  // 业主-安置意愿修改操作
  updateLandlordWill(uid: string, data: WillType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        if (!data) {
          reject(false)
          console.log('安置意愿信息缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!data.uid) {
            const itemUid = guid()
            data.uid = itemUid
            if (data.immigrantWillProductionList && data.immigrantWillProductionList.length) {
              data.immigrantWillProductionList = data.immigrantWillProductionList.map((will) => {
                if (!will.uid) {
                  const willUid = guid()
                  will.uid = willUid
                }
                return will
              })
            }
            landlordItem.immigrantWill = data
          } else {
            landlordItem.immigrantWill = data
          }
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordWill-error')
        reject(false)
      }
    })
  }

  // 业主-果木修改操作
  updateLandlordTree(uid: string, data: TreeType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('果木列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordTree-error')
        reject(false)
      }
    })
  }
  // 业主-果木删除操作
  deleteLandlordTree(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList = landlordItem.immigrantTreeList.map((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordTree-error')
        reject(false)
      }
    })
  }

  // 业主- 坟墓新增操作
  addLandlordGrave(uid: string, data: GraveType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantGraveList) {
            landlordItem.immigrantGraveList = []
          }
          landlordItem.immigrantGraveList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordGrave-error')
        reject(false)
      }
    })
  }
  // 业主-坟墓修改操作
  updateLandlordGrave(uid: string, data: GraveType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantGraveList = landlordItem.immigrantGraveList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordGrave-error')
        reject(false)
      }
    })
  }
  // 业主-坟墓删除操作
  deleteLandlordGrave(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantGraveList = landlordItem.immigrantGraveList.map((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordGrave-error')
        reject(false)
      }
    })
  }

  // 业主- 房屋新增操作
  addLandlordHouse(uid: string, data: HouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantHouseList) {
            landlordItem.immigrantHouseList = []
          }
          landlordItem.immigrantHouseList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordHouse-error')
        reject(false)
      }
    })
  }
  // 业主-房屋修改操作
  updateLandlordHouse(uid: string, data: HouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantHouseList = landlordItem.immigrantHouseList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordHouse-error')
        reject(false)
      }
    })
  }
  // 业主-房屋删除操作
  deleteLandlordHouse(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        console.log(landlordItem?.immigrantHouseList, '删除前的')
        if (landlordItem) {
          landlordItem.immigrantHouseList = landlordItem.immigrantHouseList.map((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
            return item
          })
          console.log(landlordItem.immigrantHouseList, '删除后的')
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordHouse-error')
        reject(false)
      }
    })
  }

  // 业主-家庭收入修改操作
  updateLandlordFamilyIncome(uid: string, data: FamilyIncomeType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          // 每次都是重置
          landlordItem.immigrantIncomeList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordFamilyIncome-error')
        reject(false)
      }
    })
  }

  // 业主-附件修改操作
  updateLandlordImmigrantFile(uid: string, data: ImmigrantFileType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!data.uid) {
            const itemUid = guid()
            data.uid = itemUid
            data.isDelete = '0'
          }
          landlordItem.immigrantFile = data
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordImmigrantFile-error')
        reject(false)
      }
    })
  }

  // 业主-企业/个体户 修改操作
  updateLandlordCompany(uid: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        if (!data || !data.company) {
          reject(false)
          console.log('company缺失')
          return
        }

        let landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem = {
            ...landlordItem,
            ...data,
            company: { ...landlordItem.company, ...data.company }
          }
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordCompany-error')
        reject(false)
      }
    })
  }
  // 业主-企业/个体户 删除操作
  deleteLandlordCompany(uid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.company.isDelete = '1'
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordCompany-error')
        reject(false)
      }
    })
  }

  // 业主-设施设备新增操作
  addLandlordEquipment(uid: string, data: EquipmentType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantEquipmentList) {
            landlordItem.immigrantEquipmentList = []
          }
          landlordItem.immigrantEquipmentList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 业主-设施设备修改操作
  updateLandlordEquipment(uid: string, data: EquipmentType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === data.uid) {
              item = { ...item, ...data }
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordEquipment-error')
        reject(false)
      }
    })
  }
  // 业主-设施设备删除操作
  deleteLandlordEquipment(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantEquipmentList = landlordItem.immigrantEquipmentList.map((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordEquipment-error')
        reject(false)
      }
    })
  }

  // 业主-企业营收新增操作
  addLandlordManagement(uid: string, data: ManagementType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantManagementList) {
            landlordItem.immigrantManagementList = []
          }
          landlordItem.immigrantManagementList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordManagement-error')
        reject(false)
      }
    })
  }
  // 业主-企业营收修改操作
  updateLandlordManagement(uid: string, data: ManagementType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        if (!data || !data.length) {
          reject(false)
          console.log('企业营收列表缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantManagementList = data.map((item) => {
            if (!item.uid) {
              const itemUid = guid()
              item.uid = itemUid
              item.isDelete = '0'
            }
            return item
          })
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordManagement-error')
        reject(false)
      }
    })
  }
  // 业主-企业营收删除操作
  deleteLandlordManagement(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantManagementList = landlordItem.immigrantManagementList.map(
            (item) => {
              if (item.uid === itemUid) {
                item.isDelete = '1'
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordManagement-error')
        reject(false)
      }
    })
  }

  // 业主-农村专项设施新增操作
  addLandlordFacilities(uid: string, data: FacilitiesType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          if (!landlordItem.immigrantFacilitiesList) {
            landlordItem.immigrantFacilitiesList = []
          }
          landlordItem.immigrantFacilitiesList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordFacilities-error')
        reject(false)
      }
    })
  }
  // 业主-农村专项设施修改操作
  updateLandlordFacilities(uid: string, data: FacilitiesType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantFacilitiesList = landlordItem.immigrantFacilitiesList.map(
            (item) => {
              if (item.uid === data.uid) {
                item = { ...item, ...data }
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'updateLandlordFacilities-error')
        reject(false)
      }
    })
  }
  // 业主-农村专项设施删除操作
  deleteLandlordFacilities(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantFacilitiesList = landlordItem.immigrantFacilitiesList.map(
            (item) => {
              if (item.uid === itemUid) {
                item.isDelete = '1'
              }
              return item
            }
          )
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'deleteLandlordFacilities-error')
        reject(false)
      }
    })
  }
}

export const DataFillController = new DataFill()
