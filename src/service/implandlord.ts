/**
 * 实施阶段
 * 调查对象接口列表
 */
import { ImpLandlordController, Landlord } from '@/controller'
import { LandlordSearchType } from '@/types/common'

/**
 * 获取调查对象详情
 * 资产评估专用
 * @param uid
 * @returns 详情
 */
export const getEvaLandlordItemApi = (uid: string) => {
  return ImpLandlordController.getEvaLandlordByUid(uid)
}

/**
 * 获取调查对象详情
 * 其他小阶段使用
 * @param uid
 * @returns 详情
 */
export const getImpLandlordItemApi = (uid: string) => {
  return ImpLandlordController.getImpLandlordByUid(uid)
}

/**
 * 调查对象管理 条件查询
 * @param data
 * @returns 列表
 */
export const getImpLandlordListBySearchApi = (data?: LandlordSearchType) => {
  return ImpLandlordController.getLandlordListBySearch(data)
}

/**
 * 调查对象管理 基础信息保存
 * @param data
 * @returns boolean
 */
export const saveImpLandlordItemApi = (data: Partial<Landlord>) => {
  return ImpLandlordController.updateBaseLandlord(data)
}
