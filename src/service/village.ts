/**
 * 自然村 接口列表
 */
import { VillageController } from '@/controller'
import { VillageType } from '@/types/common'

// 获取自然村列表
export const getVillageListApi = () => {
  return VillageController.getList()
}

// 分页获取自然村列表
export const getVillageListWithPageApi = (page = 1, pageSize = 20) => {
  return VillageController.getListWithPage(page, pageSize)
}

// 新增自然村
export const addVillageApi = (data: VillageType) => {
  return VillageController.add(data)
}

// 修改自然村
export const updateVillageApi = (data: VillageType) => {
  return VillageController.update(data)
}

// 获取单个自然村详情
export const getVillageItemApi = (uid: string) => {
  return VillageController.getVillageByUid(uid)
}
