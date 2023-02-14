import {
  PopulationType,
  TreeType,
  GraveType,
  HouseType,
  AppendantType,
  WillType,
  FamilyIncomeType
} from './datafill'
import { ProjectType, FamilyIncomeConfigType, WillConfigType, DictConfigType } from './common'

// 农户列表
export interface LandlordType {
  id: number
  uid: string
  name: string
  sex: string
  card: string
  doorNo: string
  townCode: string
  villageCode: string
  virutalVillageCode: string
  address: string
  projectId: 0
  longitude: string
  latitude: string
  phone: string
  locationType: string
  cityCode: string
  areaCode: string
  reportStatus: string
  hasPropertyAccount: true
  householdNumber: string
  reportDate: string
  reportUser: number

  // 人口
  demographicList: PopulationType[]
  // 附属物
  immigrantAppendantList: AppendantType[]
  // 果木
  immigrantTreeList: TreeType[]
  // 坟墓
  immigrantGraveList: GraveType[]
  // 房屋
  immigrantHouseList: HouseType[]
  // 安置意愿
  immigrantWillList: WillType[]
  // 家庭收入
  immigrantIncomeList: FamilyIncomeType[]
}

/**
 * 拉取数据
 * 结构定义
 */

export interface PullDataType {
  pullTime: string
  peasantHouseholdPushDtoList: LandlordType[]
}

export interface StateType {
  pullTime: string
  peasantHouseholdPushDtoList: LandlordType[]
  project: ProjectType[]
  dict: DictConfigType[]
  immigrantIncomeConfigList: FamilyIncomeConfigType[]
  immigrantWillConfigList: WillConfigType[]
}
