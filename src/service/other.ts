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
  ImageController,
  FeedbackDtoListController,
  landEstimateDtoListFill,
  ImpLandlordController
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

// 获取土地自然村
export const getLandVirutalVillageTreeApi = () => {
  return DistrictTreeController.getLandVirutalVillageTree()
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

// 新增问题反馈
export const addOtherItemApi = (data: any) => {
  return FeedbackDtoListController.addFeedbackDtoList(data)
}

// 修改问题反馈
export const updateOtherItemApi = (data: any) => {
  return FeedbackDtoListController.updateFeedbackDtoList(data)
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

// 获取首页top5
export const getStatisticApi = (type: OtherDataType) => {
  return OtherController.getOtherWithType(type)
}

// 获取消息通知数据
export const getNotifyDtoList = () => {
  return OtherController.getOtherWithType(OtherDataType.notifyDtoList)
}

// 获取安置点详情
export const getResettleDetail = (type: OtherDataType) => {
  const result = OtherController.getOtherWithType(type)
  console.log(result, '安置点详情数据')
  return result
}

/**
 * 实施阶段配置
 */
// 获取地块配置
export const getChooseConfigApi = () => {
  return OtherController.getOtherWithType(OtherDataType.ChooseConfig)
}

// 获取幢号房号配置
export const getHouseConfigApi = () => {
  return OtherController.getOtherWithType(OtherDataType.HouseConfig)
}

// 获取移民建卡配置
export const getCompensationCardConfigApi = () => {
  return OtherController.getOtherWithType(OtherDataType.ImmigrantCompensationCardConfig)
}

// 获取实施阶段 首页统计信息
export const getImpHomeCollectApi = () => {
  return OtherController.getOtherWithType(OtherDataType.ImpHomeCollect)
}

// 获取资产评估-首页统计信息
export const getImpHomeCollectDtoApi = () => {
  return OtherController.getOtherWithType(OtherDataType.EvaluatorStatisticsDto)
}
// 获取资产评估-土地关联列表
export const getLandEstimateDtoListApi = (data?: any) => {
  return landEstimateDtoListFill.getLandlordListBySearch(data)
}
// 获取资产评估-农户信息
export const getLandPeasantHouseholdDtoListApi = () => {
  return OtherController.getOtherWithType(OtherDataType.landPeasantHouseholdDtoList)
}
//保存 updateLandlord 更新
export const updateLandlord = (data?: any) => {
  return landEstimateDtoListFill.updateLandlord(data)
}
//评估状态修改
export const updateEstimateFlag = (data?: any) => {
  return landEstimateDtoListFill.updateEstimateFlag(data)
}
export const getDictObjsApi = (e: any) => {
  return DictionariesController.getDictObjs(e)
}
// 获取资产评估-土地关联数量
export const getLandlordListBySearchTitleApi = () => {
  return landEstimateDtoListFill.getLandlordListBySearchTitle()
}
// 获取资产评估-土地关联数量(已评估，未评估，我的评估)
export const getLandlordListBySearchTitleTotleApi = (data?: any) => {
  return landEstimateDtoListFill.getLandlordListBySearchTitleTotle(data)
}
// 农户模糊查询
export const getOtherWithTypeSetApi = (data: any) => {
  return OtherController.getOtherWithTypeSet(data)
}
// 获取果木树
export const gettreeConfigDtoListApi = () => {
  return OtherController.getOtherWithType(OtherDataType.treeConfigDtoList)
}
export const updatepic = (data: any) => {
  return ImpLandlordController.updatepic(data)
}
