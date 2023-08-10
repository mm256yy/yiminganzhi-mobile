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
