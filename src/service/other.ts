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
  ResettlementController,
  PrintController,
  ImageController
} from '@/controller'
import { OtherDataType } from '@/database'
import { MainType, PrintType } from '@/types/common'

// 获取项目列表
export const getProjectListApi = () => {
  return ProjectController.getList()
}

// 获取统计数据列表
export const getCollectListApi = () => {
  return CollectController.getList()
}

// 获取行政村 下拉树 全量
export const getVillageTreeApi = () => {
  return OtherController.getOtherWithType(OtherDataType.DistrictTree)
}

// 获取行政村/自然村 下拉树
export const getVillageTreeWithoutNullApi = (type?: MainType) => {
  return DistrictTreeController.getVillageTree(type)
}

// 获取自然村 下拉树 过滤了空数据
export const getVirutalVillageTreeApi = () => {
  return DistrictTreeController.getVirutalVillageTree()
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
export const getImgListApi = () => {
  return ImageController.getList()
}

// 批量图片上传
export const batchUploadImgApi = (data: string[]) => {
  return ImageController.batchAddImg(data)
}

// 图片删除
export const deleteImgApi = (url: string) => {
  return ImageController.deleteImg(url)
}

// 获取打印模版
export const getPrintTemplatesApi = (type: PrintType) => {
  return PrintController.getTemplateList(type)
}
