/**
 * 业主接口列表
 */
import { LandlordController, DistrictTreeController } from '@/controller'
import { MainType, LandlordQuery, LandlordSearchType, ReportParamsType } from '@/types/common'
import { LandlordType } from '@/types/sync'

// 获取填报页 左侧树
export const getLandlordTreeApi = (type: MainType) => {
  return DistrictTreeController.getLandlordTree(type)
}

// 获取业主基础信息列表
export const getLandlordListApi = (type: MainType) => {
  return LandlordController.getList(type)
}

// 获取业主基础信息列表
export const getLandlordListWithMapApi = (type: MainType) => {
  return LandlordController.getListWithMap(type)
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
  return LandlordController.updateBaseLandlord(data)
}

// 删除业主
export const deleteLandlordApi = (uid: string) => {
  return LandlordController.deleteLandlord(uid)
}

// 我的工作 条件查询
export const getSubmitListApi = (data: LandlordQuery) => {
  return LandlordController.getSubmitList(data)
}

// 调查对象管理 条件查询
export const getLandlordListBySearchApi = (data?: LandlordSearchType) => {
  return LandlordController.getLandlordListBySearch(data)
}

// 首页统计信息
export const getHomeCollectionApi = () => {
  return LandlordController.getHomeCollection()
}

// 填报完成
export const reportDataApi = (query: ReportParamsType) => {
  return LandlordController.reportData(query)
}

// 打印数据获取
export const getPrintLandlordApi = (uids: string[], templateIds: number[]) => {
  return LandlordController.getLandlordByUidWithPrint(uids, templateIds)
}
