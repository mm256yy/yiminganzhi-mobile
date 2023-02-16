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
  GraveType
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

export class DataFill extends Landlord {
  constructor() {
    super()
  }

  // 居民户-人口新增操作
  async addLandlordPeople(uid: string, data: PopulationType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordPeople-error')
    }
  }
  // 居民户-人口修改操作
  async updateLandlordPeople(uid: string, data: PopulationType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordPeople-error')
    }
  }
  // 居民户-人口删除操作
  async deleteLandlordPeople(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordPeople-error')
    }
  }

  // 居民户- 附属物新增操作
  async addLandlordAppendant(uid: string, data: AppendantType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordAppendant-error')
    }
  }
  // 居民户-附属物修改操作
  async updateLandlordAppendant(uid: string, data: AppendantType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'updateLandlordAppendant-error')
    }
  }
  // 居民户-附属物删除操作
  async deleteLandlordAppendant(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'deleteLandlordAppendant-error')
    }
  }

  // 居民户- 安置意愿新增操作
  async addLandlordWill(uid: string, data: WillType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordWill-error')
    }
  }
  // 居民户-安置意愿修改操作
  async updateLandlordWill(uid: string, data: WillType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'updateLandlordWill-error')
    }
  }
  // 居民户-安置意愿删除操作
  async deleteLandlordWill(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'deleteLandlordWill-error')
    }
  }

  // 居民户- 果木新增操作
  async addLandlordTree(uid: string, data: TreeType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordTree-error')
    }
  }
  // 居民户-果木修改操作
  async updateLandlordTree(uid: string, data: TreeType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'updateLandlordTree-error')
    }
  }
  // 居民户-果木删除操作
  async deleteLandlordTree(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'deleteLandlordTree-error')
    }
  }

  // 居民户- 坟墓新增操作
  async addLandlordGrave(uid: string, data: GraveType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordGrave-error')
    }
  }
  // 居民户-坟墓修改操作
  async updateLandlordGrave(uid: string, data: GraveType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'updateLandlordGrave-error')
    }
  }
  // 居民户-坟墓删除操作
  async deleteLandlordGrave(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'deleteLandlordGrave-error')
    }
  }

  // 居民户- 房屋新增操作
  async addLandlordHouse(uid: string, data: HouseType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordHouse-error')
    }
  }
  // 居民户-房屋修改操作
  async updateLandlordHouse(uid: string, data: HouseType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'updateLandlordHouse-error')
    }
  }
  // 居民户-房屋删除操作
  async deleteLandlordHouse(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'deleteLandlordHouse-error')
    }
  }

  // 居民户- 家庭收入新增操作
  async addLandlordFamilyIncome(uid: string, data: FamilyIncomeType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'addLandlordFamilyIncome-error')
    }
  }
  // 居民户-家庭收入修改操作
  async updateLandlordFamilyIncome(uid: string, data: FamilyIncomeType) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'updateLandlordFamilyIncome-error')
    }
  }
  // 居民户-家庭收入删除操作
  async deleteLandlordFamilyIncome(uid: string, itemUid: string) {
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
      return updateRes
    } catch (error) {
      console.log(error, 'deleteLandlordFamilyIncome-error')
    }
  }
}

export const DataFillController = new Landlord()
