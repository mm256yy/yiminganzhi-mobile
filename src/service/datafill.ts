/**
 * 填报相关接口
 */
import { DataFillController, GraveController } from '@/controller'
import {
  PopulationType,
  HouseType,
  AppendantType,
  WillType,
  TreeType,
  GraveType,
  FamilyIncomeType,
  ImmigrantFileType,
  // CompanyType,
  EquipmentType,
  FacilitiesType,
  ManagementType
} from '@/types/datafill'

/**
 * 添加人口
 * @param uid 业主uid
 * @param data 人口信息
 * @returns
 */
export const addLandlordPeopleApi = (uid: string, data: PopulationType) => {
  return DataFillController.addLandlordPeople(uid, data)
}

/**
 * 更新人口
 * @param uid 业主uid
 * @param data 人口信息
 * @returns
 */
export const updateLandlordPeopleApi = (uid: string, data: PopulationType) => {
  return DataFillController.updateLandlordPeople(uid, data)
}

/**
 * 删除人口
 * @param uid 业主uid
 * @param itemId 人口uid
 * @returns
 */
export const deleteLandlordPeopleApi = (uid: string, itemId: string, reason?: string) => {
  return DataFillController.deleteLandlordPeople(uid, itemId, reason)
}

// --------------
/**
 * 添加房屋
 * @param uid 业主uid
 * @param data 房屋信息
 * @returns
 */
export const addLandlordHouseApi = (uid: string, data: HouseType) => {
  return DataFillController.addLandlordHouse(uid, data)
}

/**
 * 更新房屋
 * @param uid 业主uid
 * @param data 房屋信息
 * @returns
 */
export const updateLandlordHouseApi = (uid: string, data: HouseType) => {
  return DataFillController.updateLandlordHouse(uid, data)
}

/**
 * 删除房屋
 * @param uid 业主uid
 * @param itemId 房屋uid
 * @param reason 删除原因（填报阶段没有此参数，复核阶段有此参数）
 * @returns
 */
export const deleteLandlordHouseApi = (uid: string, itemId: string, reason?: string) => {
  return DataFillController.deleteLandlordHouse(uid, itemId, reason)
}
// ---------------

/**
 * 更新附属物
 * @param uid 业主uid
 * @param data 附属物信息
 * @returns
 */
export const updateLandlordAppendantApi = (uid: string, data: AppendantType[]) => {
  return DataFillController.updateLandlordAppendant(uid, data)
}

/**
 * 删除附属物
 * @param uid 业主uid
 * @param itemId 附属物uid
 * @returns
 */
export const deleteLandlordAppendantApi = (uid: string, itemId: string) => {
  return DataFillController.deleteLandlordAppendant(uid, itemId)
}

/**
 * 更新安置意愿
 * @param uid 业主uid
 * @param data 安置意愿信息
 * @returns
 */
export const updateLandlordWillApi = (uid: string, data: WillType) => {
  return DataFillController.updateLandlordWill(uid, data)
}

/**
 * 更新果木信息
 * @param uid 业主uid
 * @param data 果木信息
 * @returns
 */
export const updateLandlordTreeApi = (uid: string, data: TreeType[]) => {
  return DataFillController.updateLandlordTree(uid, data)
}

/**
 * 删除果木信息
 * @param uid 业主uid
 * @param itemId 果木uid
 * @returns
 */
export const deleteLandlordTreeApi = (uid: string, itemId: string) => {
  return DataFillController.deleteLandlordTree(uid, itemId)
}
// ---------------

/**
 * 添加坟墓
 * @param uid 业主uid
 * @param data 坟墓信息
 * @returns
 */
export const addLandlordGraveApi = (uid: string, data: GraveType) => {
  return GraveController.addGrave(data)
}

/**
 * 更新坟墓
 * @param uid 业主uid
 * @param data 坟墓信息
 * @returns
 */
export const updateLandlordGraveApi = (uid: string, data: GraveType) => {
  return GraveController.updateGrave(data)
}

/**
 * 删除坟墓信息
 * @param uid 业主uid
 * @param itemId 坟墓uid
 * @returns
 */
export const deleteLandlordGraveApi = (uid: string, itemId: string) => {
  return GraveController.deleteGrave(itemId)
}
// ---------------

/**
 * 更新家庭收入
 * @param uid 业主uid
 * @param data 家庭收入信息
 * @returns
 */
export const updateLandlordFamilyIncomeApi = (uid: string, data: FamilyIncomeType[]) => {
  return DataFillController.updateLandlordFamilyIncome(uid, data)
}
// ---------------

/**
 * 更新附件
 * @param uid 业主uid
 * @param data 附件信息
 * @returns
 */
export const updateLandlordImmigrantFileApi = (uid: string, data: ImmigrantFileType) => {
  return DataFillController.updateLandlordImmigrantFile(uid, data)
}

// ---------------

/**
 * 更新企业/个体户
 * @param uid 业主uid
 * @param data 企业/个体户信息
 * @returns
 */
export const updateLandlordCompanyApi = (uid: string, data: any) => {
  return DataFillController.updateLandlordCompany(uid, data)
}

/**
 * 删除企业/个体户
 * @param uid 业主uid
 * @returns
 */
export const deleteLandlordCompanyApi = (uid: string) => {
  return DataFillController.deleteLandlordCompany(uid)
}

// ---------------

/**
 * 添加企业营收
 * @param uid 业主uid
 * @param data 企业营收信息
 * @returns
 */
// export const addLandlordManagementApi = (uid: string, data: ManagementType) => {
//   return DataFillController.addLandlordManagement(uid, data)
// }

/**
 * 更新企业营收
 * @param uid 业主uid
 * @param data 企业营收信息
 * @returns
 */
export const updateLandlordManagementApi = (uid: string, data: ManagementType[]) => {
  return DataFillController.updateLandlordManagement(uid, data)
}

/**
 * 删除企业营收
 * @param uid 业主uid
 * @param itemId 企业营收uid
 * @returns
 */
export const deleteLandlordManagementApi = (uid: string, itemId: string) => {
  return DataFillController.deleteLandlordManagement(uid, itemId)
}

// ---------------

/**
 * 添加农村专项设施
 * @param uid 业主uid
 * @param data 农村专项设施信息
 * @returns
 */
export const addLandlordFacilitiesApi = (uid: string, data: FacilitiesType) => {
  return DataFillController.addLandlordFacilities(uid, data)
}

/**
 * 更新农村专项设施
 * @param uid 业主uid
 * @param data 农村专项设施信息
 * @returns
 */
export const updateLandlordFacilitiesApi = (uid: string, data: FacilitiesType) => {
  return DataFillController.updateLandlordFacilities(uid, data)
}

/**
 * 删除农村专项设施
 * @param uid 业主uid
 * @param itemId 农村专项设施uid
 * @returns
 */
export const deleteLandlordFacilitiesApi = (uid: string, itemId: string) => {
  return DataFillController.deleteLandlordFacilities(uid, itemId)
}

// ---------------

/**
 * 添加设施设备
 * @param uid 业主uid
 * @param data 设施设备信息
 * @returns
 */
export const addLandlordEquipmentApi = (uid: string, data: EquipmentType) => {
  return DataFillController.addLandlordEquipment(uid, data)
}

/**
 * 更新设施设备
 * @param uid 业主uid
 * @param data 设施设备信息
 * @returns
 */
export const updateLandlordEquipmentApi = (uid: string, data: EquipmentType) => {
  return DataFillController.updateLandlordEquipment(uid, data)
}

/**
 * 删除设施设备
 * @param uid 业主uid
 * @param itemId 设施设备uid
 * @returns
 */
export const deleteLandlordEquipmentApi = (uid: string, itemId: string) => {
  return DataFillController.deleteLandlordEquipment(uid, itemId)
}
