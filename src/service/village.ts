/**
 * 自然村 接口列表
 */
import { VillageController } from '@/controller'
import { PageQueryType, VillageType } from '@/types/common'

// 获取自然村列表
export const getVillageListApi = () => {
  return VillageController.getList()
}

// 分页获取自然村列表
export const getVillageListWithPageApi = (data: PageQueryType & { name: string }) => {
  return VillageController.getListWithPage(data)
}

// 新增自然村
export const addVillageApi = (data: Partial<VillageType>) => {
  return VillageController.add(data)
}

// 修改自然村
export const updateVillageApi = (data: Partial<VillageType>) => {
  return VillageController.update(data)
}

// 修改自然村
export const deleteVillageApi = (uid: string) => {
  return VillageController.deleteVillage(uid)
}

// 获取单个自然村详情
export const getVillageItemApi = (uid: string) => {
  return VillageController.getVillageByUid(uid)
}
