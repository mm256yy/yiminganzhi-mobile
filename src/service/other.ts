/**
 * 接口列表
 */
import {
  ProjectController,
  CollectController,
  DistrictTreeController,
  OtherController,
  AppendantController,
  FamilyIncomeController,
  DictionariesController,
  ResettlementController
} from '@/controller'
import { ImageController } from '@/controller/image'
import { OtherDataType, ImageDDLType } from '@/database'

// 获取项目列表
export const getProjectListApi = () => {
  return ProjectController.getList()
}

// 获取统计数据列表
export const getCollectListApi = () => {
  return CollectController.getList()
}

// 获取行政村 下拉树
export const getVillageTreeApi = () => {
  return OtherController.getOtherWithType(OtherDataType.DistrictTree)
}

// 获取自然村 下拉树
export const getVirutalVillageTreeApi = () => {
  return DistrictTreeController.getVillageTree()
}

// 附属物配置列表
export const getAppendantListApi = () => {
  return AppendantController.getList()
}

// 家庭收入配置列表
export const getFamilyIncomeListApi = () => {
  return FamilyIncomeController.getList()
}

// 安置意愿配置
export const getWillListApi = () => {
  return ResettlementController.getList()
}

// 获取字典对象
export const getDictObjApi = () => {
  return DictionariesController.getDictObj()
}

// 获取other
export const getOtherItemApi = (type: OtherDataType) => {
  return OtherController.getOtherWithType(type)
}

// 获取图片列表 [{url: xxxx, base64: ''}]
export const getImgList = () => {
  return ImageController.getList()
}

// 图片上传
export const uploadImg = (data: Pick<ImageDDLType, 'file' | 'url'>) => {
  return ImageController.add(data)
}

// 批量图片上传
export const batchUploadImg = (data: Pick<ImageDDLType, 'file' | 'url'>[]) => {
  return ImageController.batchAddImg(data)
}
