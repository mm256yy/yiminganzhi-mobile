/**
 * 提供居民户 - 数据填报 相关的增删改功能
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
  ImmigrantFileType
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
export class DataFill extends Landlord {
  constructor() {
    super()
  }

  // 居民户-人口新增操作
  addLandlordPeople(uid: string, data: PopulationType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.demographicList.push(data)
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
  // 居民户-人口修改操作
  updateLandlordPeople(uid: string, data: PopulationType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.demographicList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-人口删除操作
  deleteLandlordPeople(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.demographicList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户- 附属物新增操作
  addLandlordAppendant(uid: string, data: AppendantType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList.push(data)
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
  // 居民户-附属物修改操作
  updateLandlordAppendant(uid: string, data: AppendantType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-附属物删除操作
  deleteLandlordAppendant(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantAppendantList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户- 安置意愿新增操作
  addLandlordWill(uid: string, data: WillType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantWillList.push(data)
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
  // 居民户-安置意愿修改操作
  updateLandlordWill(uid: string, data: WillType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantWillList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-安置意愿删除操作
  deleteLandlordWill(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantWillList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户- 果木新增操作
  addLandlordTree(uid: string, data: TreeType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList.push(data)
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
  // 居民户-果木修改操作
  updateLandlordTree(uid: string, data: TreeType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-果木删除操作
  deleteLandlordTree(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantTreeList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户- 坟墓新增操作
  addLandlordGrave(uid: string, data: GraveType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantGraveList.push(data)
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
  // 居民户-坟墓修改操作
  updateLandlordGrave(uid: string, data: GraveType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantGraveList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-坟墓删除操作
  deleteLandlordGrave(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantGraveList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户- 房屋新增操作
  addLandlordHouse(uid: string, data: HouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantHouseList.push(data)
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
  // 居民户-房屋修改操作
  updateLandlordHouse(uid: string, data: HouseType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantHouseList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-房屋删除操作
  deleteLandlordHouse(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantHouseList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户- 家庭收入新增操作
  addLandlordFamilyIncome(uid: string, data: FamilyIncomeType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantIncomeList.push(data)
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
  // 居民户-家庭收入修改操作
  updateLandlordFamilyIncome(uid: string, data: FamilyIncomeType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantIncomeList.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-家庭收入删除操作
  deleteLandlordFamilyIncome(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantIncomeList.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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

  // 居民户-附件新增操作
  addLandlordImmigrantFile(uid: string, data: ImmigrantFileType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const itemUid = guid()
        data.uid = itemUid
        data.isDelete = '0'
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantFile.push(data)
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
  // 居民户-附件修改操作
  updateLandlordImmigrantFile(uid: string, data: ImmigrantFileType): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantFile.forEach((item) => {
            if (item.uid === data.uid) {
              item = data
            }
          })
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
  // 居民户-附件删除操作
  deleteLandlordImmigrantFile(uid: string, itemUid: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      try {
        const landlordItem = await this.getLandlordByUid(uid)
        if (landlordItem) {
          landlordItem.immigrantFile.forEach((item) => {
            if (item.uid === itemUid) {
              item.isDelete = '1'
            }
          })
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
}

export const DataFillController = new DataFill()
