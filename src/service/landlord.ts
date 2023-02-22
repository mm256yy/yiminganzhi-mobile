/**
 * 业主接口列表
 */
import { LandlordController, DistrictTreeController } from '@/controller'
import { MainType, LandlordQuery } from '@/types/common'
import { LandlordType } from '@/types/sync'

// 获取填报页 左侧树
export const getLandlordTreeApi = (type: MainType) => {
  return DistrictTreeController.getLandlordTree(type)
}

// 获取业主列表
export const getLandlordListApi = (type: MainType) => {
  return LandlordController.getList(type)
}

// 分页获取业主列表
export const getLandlordListWithPageApi = (type: MainType, page = 1, pageSize = 20) => {
  return LandlordController.getListWithPage(type, page, pageSize)
}

// 获取业主详情
export const getLandlordItemApi = (uid: string) => {
  return LandlordController.getLandlordByUid(uid)
}

// 新增业主
export const addLandlordApi = (data: Omit<LandlordType, 'id' | 'uid'>) => {
  return LandlordController.addLandlord(data)
}

// 修改业主
export const updateLandlordApi = (data: LandlordType) => {
  return LandlordController.updateLandlord(data)
}

// 删除业主
export const deleteLandlordApi = (uid: string) => {
  return LandlordController.deleteLandlord(uid)
}

// 我的工作 条件查询
export const getSubmitListApi = (data: LandlordQuery) => {
  return LandlordController.getSubmitList(data)
}
