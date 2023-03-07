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
  CompanyType,
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
  addLandlordPeople(uid: string, data: PopulationType): Promise<boolean> {
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
          if (!landlordItem.demographicList) {
            landlordItem.demographicList = []
          }
          landlordItem.demographicList.push(data)
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
  // 业主-人口修改操作
  updateLandlordPeople(uid: string, data: PopulationType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
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

  // 业主- 附属物新增操作
  addLandlordAppendant(uid: string, data: AppendantType): Promise<boolean> {
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
          if (!landlordItem.immigrantAppendantList) {
            landlordItem.immigrantAppendantList = []
          }
          landlordItem.immigrantAppendantList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordAppendant-error')
        reject(false)
      }
    })
  }
  // 业主-附属物修改操作
  updateLandlordAppendant(uid: string, data: AppendantType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList = landlordItem.immigrantAppendantList.map((item) => {
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

  // 业主- 安置意愿新增操作
  addLandlordWill(uid: string, data: WillType): Promise<boolean> {
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
          if (!landlordItem.immigrantWillList) {
            landlordItem.immigrantWillList = []
          }
          landlordItem.immigrantWillList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordWill-error')
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
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantWillList = landlordItem.immigrantWillList.map((item) => {
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
        console.log(error, 'updateLandlordWill-error')
        reject(false)
      }
    })
  }
  // 业主-安置意愿删除操作
  deleteLandlordWill(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantWillList = landlordItem.immigrantWillList.map((item) => {
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
        console.log(error, 'deleteLandlordWill-error')
        reject(false)
      }
    })
  }

  // 业主- 果木新增操作
  addLandlordTree(uid: string, data: TreeType): Promise<boolean> {
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
          if (!landlordItem.immigrantTreeList) {
            landlordItem.immigrantTreeList = []
          }
          landlordItem.immigrantTreeList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordTree-error')
        reject(false)
      }
    })
  }
  // 业主-果木修改操作
  updateLandlordTree(uid: string, data: TreeType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList = landlordItem.immigrantTreeList.map((item) => {
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
        if (landlordItem) {
          landlordItem.immigrantHouseList = landlordItem.immigrantHouseList.map((item) => {
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
        console.log(error, 'deleteLandlordHouse-error')
        reject(false)
      }
    })
  }

  // 业主- 家庭收入新增操作
  addLandlordFamilyIncome(uid: string, data: FamilyIncomeType): Promise<boolean> {
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
          if (!landlordItem.immigrantIncomeList) {
            landlordItem.immigrantIncomeList = []
          }
          landlordItem.immigrantIncomeList.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordFamilyIncome-error')
        reject(false)
      }
    })
  }
  // 业主-家庭收入修改操作
  updateLandlordFamilyIncome(uid: string, data: FamilyIncomeType[]): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !data || !data.length) {
          reject(false)
          console.log('核心字段缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          // 每次都是重置
          landlordItem.immigrantIncomeList = data
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
  // 业主-家庭收入删除操作
  deleteLandlordFamilyIncome(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantIncomeList = landlordItem.immigrantIncomeList.map((item) => {
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
        console.log(error, 'deleteLandlordFamilyIncome-error')
        reject(false)
      }
    })
  }

  // 业主-附件新增操作
  addLandlordImmigrantFile(uid: string, data: ImmigrantFileType): Promise<boolean> {
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
          if (!landlordItem.immigrantFile) {
            landlordItem.immigrantFile = []
          }
          landlordItem.immigrantFile.push(data)
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordImmigrantFile-error')
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
          landlordItem.immigrantFile = landlordItem.immigrantFile.map((item) => {
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
        console.log(error, 'updateLandlordImmigrantFile-error')
        reject(false)
      }
    })
  }

  // 业主-附件删除操作
  deleteLandlordImmigrantFile(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid || !itemUid) {
          reject(false)
          console.log('uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantFile = landlordItem.immigrantFile.map((item) => {
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
        console.log(error, 'deleteLandlordImmigrantFile-error')
        reject(false)
      }
    })
  }

  // 业主-企业/个体户 新增操作
  addLandlordCompany(uid: string, data: any): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const itemUid = guid()
        data.company.uid = itemUid
        data.company.isDelete = '0'
        let landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem = { ...landlordItem, ...data }
        } else {
          reject(false)
          console.log('业主信息查询失败')
          return
        }
        // 更新数据
        const updateRes = await this.updateLandlord(landlordItem as LandlordType)
        updateRes ? resolve(true) : reject(false)
      } catch (error) {
        console.log(error, 'addLandlordCompany-error')
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
        let landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem = { ...landlordItem, ...data }
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
  updateLandlordManagement(uid: string, data: ManagementType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        if (!uid) {
          reject(false)
          console.log('业主uid缺失')
          return
        }
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantManagementList = landlordItem.immigrantManagementList.map(
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
