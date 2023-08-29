/**
 * 实施阶段
 * 填报相关接口
 */
import { ImpDataFillController, GraveController } from '@/controller'
import {
  PopulationType,
  HouseType,
  AppendantType,
  TreeType,
  GraveType,
  EquipmentType,
  FacilitiesType
} from '@/types/datafill'
import {
  ImmigrantDocumentationType,
  AssetHouseFitUpType,
  AssetLandType,
  AssetAppendantType,
  ImmigrantLandType,
  ImmigrantSettleType,
  ImmigrantHouseEmptyType,
  ImmigrantLandEmptyType,
  ImmigrantExcessType,
  ImmigrantChooseHouseType,
  ImmigrantCompensationCardType,
  ImmigrantBuildOneselfType,
  ImmigrantProceduresType,
  SimulateImmigrantSettleType,
  SimulateDemographicType,
  ImmigrantFillingType,
  ImmigrantSelfSeekingType
} from '@/types/impDataFill'

/**
 * 添加人口
 * @param uid 调查对象uid
 * @param data 人口信息
 * @returns
 */
export const addImpLandlordPeopleApi = (uid: string, data: PopulationType) => {
  return ImpDataFillController.addLandlordPeople(uid, data)
}

/**
 * 更新人口
 * 批量
 * @param uid 调查对象uid
 * @param list 人口信息
 * @returns
 */
export const updateImpLandlordPeopleBatchApi = (uid: string, data: PopulationType[]) => {
  return ImpDataFillController.updateLandlordPeopleBatch(uid, data)
}

/**
 * 更新人口
 * @param uid 调查对象uid
 * @param data 人口信息
 * @returns
 */
export const updateImpLandlordPeopleApi = (uid: string, data: Partial<PopulationType>) => {
  return ImpDataFillController.updateLandlordPeople(uid, data)
}

/**
 * 删除人口
 * @param uid 调查对象uid
 * @param itemId 人口uid
 * @returns
 */
export const deleteImpLandlordPeopleApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordPeople(uid, itemId, reason)
}

// --------------

/**
 * 更新 模拟安置 生产安置
 * @param uid
 * @param data
 * @returns
 */
export const updateImpLandlordSimulateDemographicApi = (
  uid: string,
  data: Partial<SimulateDemographicType>[]
) => {
  return ImpDataFillController.updateImpLandlordSimulateDemographic(uid, data)
}

// --------------

/**
 * 更新 模拟安置 搬迁安置
 * @param uid
 * @param data
 * @returns
 */
export const updateImpLandlordSimulateImmigrantSettleApi = (
  uid: string,
  data: Partial<SimulateImmigrantSettleType>
) => {
  return ImpDataFillController.updateImpLandlordSimulateImmigrantSettle(uid, data)
}

// --------------

/**
 * 添加附属物
 * @param uid 调查对象uid
 * @param data 附属物信息
 * @returns
 */
export const addImpLandlordAppendantApi = (uid: string, data: AppendantType) => {
  return ImpDataFillController.addLandlordAppendant(uid, data)
}

/**
 * 更新附属物
 * 批量
 * @param uid 调查对象uid
 * @param data 附属物信息
 * @returns
 */
export const updateImpLandlordAppendantApi = (uid: string, data: AppendantType) => {
  return ImpDataFillController.updateLandlordAppendant(uid, data)
}

/**
 * 更新附属物
 * 批量
 * @param uid 调查对象uid
 * @param data 附属物信息
 * @returns
 */
export const updateImpLandlordAppendantBatchApi = (uid: string, data: AppendantType[]) => {
  return ImpDataFillController.updateLandlordAppendantBatch(uid, data)
}

/**
 * 删除附属物
 * @param uid 调查对象uid
 * @param itemId 附属物uid
 * @returns
 */
export const deleteImpLandlordAppendantApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordAppendant(uid, itemId, reason)
}

// -----------

/**
 * 添加房屋
 * @param uid 调查对象uid
 * @param data 房屋信息
 * @returns
 */
export const addImpLandlordHouseApi = (uid: string, data: HouseType) => {
  return ImpDataFillController.addLandlordHouse(uid, data)
}

/**
 * 更新房屋
 * @param uid 调查对象uid
 * @param data 房屋信息
 * @returns
 */
export const updateImpLandlordHouseApi = (uid: string, data: HouseType) => {
  return ImpDataFillController.updateLandlordHouse(uid, data)
}

/**
 * 删除房屋
 * @param uid 调查对象uid
 * @param itemId 房屋uid
 * @param reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 * @returns
 */
export const deleteImpLandlordHouseApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordHouse(uid, itemId, reason)
}

// ---------------

/**
 * 添加果木信息
 * @param uid 调查对象uid
 * @param data 果木信息
 * @returns
 */
export const addImpLandlordTreeApi = (uid: string, data: TreeType) => {
  return ImpDataFillController.addLandlordTree(uid, data)
}

/**
 * 更新果木信息
 * 批量
 * @param uid 调查对象uid
 * @param list 果木信息
 * @returns
 */
export const updateImpLandlordTreeBatchApi = (uid: string, data: TreeType[]) => {
  return ImpDataFillController.updateLandlordTreeBatch(uid, data)
}

/**
 * 更新果木信息
 * @param uid 调查对象uid
 * @param list 果木信息
 * @returns
 */
export const updateImpLandlordTreeApi = (uid: string, data: TreeType) => {
  return ImpDataFillController.updateLandlordTree(uid, data)
}

/**
 * 删除果木信息
 * @param uid 调查对象uid
 * @param itemId 果木uid
 * @returns
 */
export const deleteImpLandlordTreeApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordTree(uid, itemId, reason)
}

// ---------------

/**
 * 添加房屋装修信息
 * @param uid 调查对象uid
 * @param data 房屋装修
 * @returns
 */
export const addImpLandlordHouseFitUpApi = (uid: string, data: AssetHouseFitUpType) => {
  return ImpDataFillController.addLandlordHouseFitUp(uid, data)
}

/**
 * 更新房屋装修
 * 批量
 * @param uid 调查对象uid
 * @param list 房屋装修
 * @returns
 */
export const updateImpLandlordHouseFitUpBatchApi = (uid: string, data: AssetHouseFitUpType[]) => {
  return ImpDataFillController.updateLandlordHouseFitUpBatch(uid, data)
}

/**
 * 更新房屋装修
 * @param uid 调查对象uid
 * @param data 房屋装修
 * @returns
 */
export const updateImpLandlordHouseFitUpApi = (uid: string, data: AssetHouseFitUpType) => {
  return ImpDataFillController.updateLandlordHouseFitUp(uid, data)
}

/**
 * 删除房屋装修
 * @param uid 调查对象uid
 * @param itemId 房屋装修uid
 * @returns
 */
export const deleteImpLandlordHouseFitUpApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordHouseFitUp(uid, itemId, reason)
}

// -------------

/**
 * 获取坟墓
 * @param uid 调查对象uid
 */
export const getImpLandlordGraveItemApi = (uid: string) => {
  return GraveController.getGraveByUid(uid)
}

/**
 * 添加坟墓

 * @param data 坟墓信息
 * @returns
 */
export const addImpLandlordGraveApi = (data: GraveType) => {
  return GraveController.addGrave(data)
}

/**
 * 更新坟墓
 * @param data 坟墓信息
 * @returns
 */
export const updateImpLandlordGraveApi = (data: GraveType) => {
  return GraveController.updateGrave(data)
}

/**
 * 删除坟墓信息
 * @param uid 坟墓uid
 * @param reason 理由
 * @returns
 */
export const deleteImpLandlordGraveApi = (uid: string, reason?: string) => {
  return GraveController.impDeleteGrave(uid, reason)
}

// ---------------

/**
 * 添加设施设备
 * @param uid 调查对象uid
 * @param data 设施设备信息
 * @returns
 */
export const addImpLandlordEquipmentApi = (uid: string, data: EquipmentType) => {
  return ImpDataFillController.addLandlordEquipment(uid, data)
}

/**
 * 更新设施设备
 * @param uid 调查对象uid
 * @param data 设施设备信息
 * @returns
 */
export const updateImpLandlordEquipmentApi = (uid: string, data: EquipmentType) => {
  return ImpDataFillController.updateLandlordEquipment(uid, data)
}

/**
 * 删除设施设备
 * @param uid 调查对象uid
 * @param itemId 设施设备uid
 * @returns
 */
export const deleteImpLandlordEquipmentApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordEquipment(uid, itemId, reason)
}

// -------------

/**
 * 添加农村专项设施
 * @param uid 调查对象uid
 * @param data 农村专项设施信息
 * @returns
 */
export const addImpLandlordFacilitiesApi = (uid: string, data: FacilitiesType) => {
  return ImpDataFillController.addLandlordFacilities(uid, data)
}

/**
 * 更新农村专项设施
 * @param uid 调查对象uid
 * @param data 农村专项设施信息
 * @returns
 */
export const updateImpLandlordFacilitiesApi = (uid: string, data: FacilitiesType) => {
  return ImpDataFillController.updateLandlordFacilities(uid, data)
}

/**
 * 删除农村专项设施
 * @param uid 调查对象uid
 * @param itemId 农村专项设施uid
 * @returns
 */
export const deleteImpLandlordFacilitiesApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordFacilities(uid, itemId, reason)
}

// ---------------

/**
 * 添加土地基本情况
 * @param uid 调查对象uid
 * @param data 土地基本情况
 * @returns
 */
export const addImpLandlordAssetLandApi = (uid: string, data: AssetLandType) => {
  return ImpDataFillController.addLandlordAssetLand(uid, data)
}

/**
 * 更新土地基本情况
 * 批量
 * @param uid 调查对象uid
 * @param list 土地基本情况
 * @returns
 */
export const updateImpLandlordAssetLandBatchApi = (uid: string, data: AssetLandType[]) => {
  return ImpDataFillController.updateLandlordAssetLandBatch(uid, data)
}

/**
 * 更新土地基本情况
 * @param uid 调查对象uid
 * @param data 土地基本情况
 * @returns
 */
export const updateImpLandlordAssetLandApi = (uid: string, data: AssetLandType) => {
  return ImpDataFillController.updateLandlordAssetLand(uid, data)
}

/**
 * 删除土地基本情况
 * @param uid 调查对象uid
 * @param itemId 土地基本情况uid
 * @returns
 */
export const deleteImpLandlordAssetLandApi = (uid: string, itemId: string, reason?: string) => {
  return ImpDataFillController.deleteLandlordAssetLand(uid, itemId, reason)
}

// ------

/**
 * 添加 土地青苗及附着物
 * @param uid 调查对象uid
 * @param data 土地青苗及附着物
 * @returns
 */
export const addImpLandlordAssetAppendantApi = (uid: string, data: AssetAppendantType) => {
  return ImpDataFillController.addLandlordAssetAppendant(uid, data)
}

/**
 * 更新 土地青苗及附着物
 * @param uid 调查对象uid
 * @param data 土地青苗及附着物
 * @returns
 */
export const updateImpLandlordAssetAppendantApi = (uid: string, data: AssetAppendantType) => {
  return ImpDataFillController.updateLandlordAssetAppendant(uid, data)
}

/**
 * 更新 土地青苗及附着物
 * 批量
 * @param uid 调查对象uid
 * @param list 土地青苗及附着物
 * @returns
 */
export const updateImpLandlordAssetAppendantBatchApi = (
  uid: string,
  data: AssetAppendantType[]
) => {
  return ImpDataFillController.updateLandlordAssetAppendantBatch(uid, data)
}

/**
 * 删除 土地青苗及附着物
 * @param uid 调查对象uid
 * @param itemId 土地青苗及附着物 uid
 * @returns
 */
export const deleteImpLandlordAssetAppendantApi = (
  uid: string,
  itemId: string,
  reason?: string
) => {
  return ImpDataFillController.deleteLandlordAssetAppendant(uid, itemId, reason)
}

// ------

/**
 * 更新 归档信息
 * @param uid 调查对象uid
 * @param data 归档信息
 * @returns
 */
export const updateImpLandlordDocumentationApi = (
  uid: string,
  data: Partial<ImmigrantDocumentationType>
) => {
  return ImpDataFillController.updateLandlordDocumentation(uid, data)
}

// -------

/**
 * 更新 生产用地
 * @param uid 调查对象uid
 * @param data 生产用地
 * @returns
 */
export const updateImpLandlordImmigrantLandApi = (
  uid: string,
  data: Partial<ImmigrantLandType>
) => {
  return ImpDataFillController.updateLandlordImmigrantLand(uid, data)
}

// -------

/**
 * 更新 搬迁安置确认
 * @param uid 调查对象uid
 * @param data 搬迁安置确认
 * @returns
 */
export const updateImpLandlordRelocateResettleApi = (
  uid: string,
  data: Partial<ImmigrantSettleType>
) => {
  return ImpDataFillController.updateLandlordRelocateResettle(uid, data)
}

// -------

/**
 * 更新 房屋腾空
 * @param uid 调查对象uid
 * @param data 房屋腾空
 * @returns
 */
export const updateImpLandlordHouseEmptyApi = (
  uid: string,
  data: Partial<ImmigrantHouseEmptyType>
) => {
  return ImpDataFillController.updateLandlordHouseEmpty(uid, data)
}

// -------

/**
 * 更新 土地腾空
 * @param uid 调查对象uid
 * @param data 土地腾空
 * @returns
 */
export const updateImpLandlordLandEmptyApi = (
  uid: string,
  data: Partial<ImmigrantLandEmptyType>
) => {
  return ImpDataFillController.updateLandlordLandEmpty(uid, data)
}

// -------

/**
 * 更新 过渡安置
 * @param uid 调查对象uid
 * @param data 过渡安置
 * @returns
 */
export const updateImpLandlordExcessApi = (uid: string, data: Partial<ImmigrantExcessType>) => {
  return ImpDataFillController.updateLandlordExcess(uid, data)
}

// -------

/**
 * 更新 选房择址
 * 批量
 * @param uid 调查对象uid
 * @param list 选房择址
 * @returns
 */
export const updateImpLandlordChooseHouseBatchApi = (
  uid: string,
  data: ImmigrantChooseHouseType[]
) => {
  return ImpDataFillController.updateLandlordChooseHouseBatch(uid, data)
}

/**
 * 更新 选房择址
 * @param uid 调查对象uid
 * @param data 选房择址
 * @returns
 */
export const updateImpLandlordChooseHouseApi = (uid: string, data: ImmigrantChooseHouseType) => {
  return ImpDataFillController.updateLandlordChooseHouse(uid, data)
}

// -------

/**
 * 更新 移民建卡
 * 批量
 * @param uid 调查对象uid
 * @param data 移民建卡
 * @returns
 */
export const updateImpLandlordCompensationCardBatchApi = (
  uid: string,
  data: ImmigrantCompensationCardType[]
) => {
  return ImpDataFillController.updateLandlordCompensationCardBatch(uid, data)
}

/**
 * 更新 移民建卡
 * @param uid 调查对象uid
 * @param data 移民建卡
 * @returns
 */
export const updateImpLandlordCompensationCardApi = (
  uid: string,
  data: ImmigrantCompensationCardType
) => {
  return ImpDataFillController.updateLandlordCompensationCard(uid, data)
}

// -------

/**
 * 更新 自建房
 * @param uid 调查对象uid
 * @param itemUid 自建房 uid
 * @param data 自建房
 * @returns
 */
export const updateImpLandlordBuildSelfApi = (
  uid: string,
  itemUid: string,
  data: Partial<ImmigrantBuildOneselfType>
) => {
  return ImpDataFillController.updateLandlordBuildSelf(uid, itemUid, data)
}

// -------

/**
 * 更新 相关手续
 * @param uid 调查对象uid
 * @param itemUid 相关手续 uid
 * @param data 相关手续
 * @returns
 */
export const updateImpLandlordProceduresApi = (
  uid: string,
  itemUid: string,
  data: Partial<ImmigrantProceduresType>
) => {
  return ImpDataFillController.updateLandlordProcedures(uid, itemUid, data)
}

// -------

/**
 * 更新 填报状态
 * @param uid 调查对象uid
 * @param data 各阶段填报状态
 * @returns
 */
export const updateImpLandlordImmigrantFillingApi = (
  uid: string,
  data: Partial<ImmigrantFillingType>
) => {
  return ImpDataFillController.updateImpLandlordImmigrantFilling(uid, data)
}

// -------

/**
 * 更新 自谋出路
 * @param uid 调查对象uid
 * @param data 自谋出路参数
 */
export const updateImpLandlordImmigrantSelfSeekingApi = (
  uid: string,
  data: Partial<ImmigrantSelfSeekingType>
) => {
  return ImpDataFillController.updateImpLandlordImmigrantSelfSeeking(uid, data)
}
