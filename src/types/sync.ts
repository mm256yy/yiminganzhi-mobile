import {
  PopulationType,
  TreeType,
  GraveType,
  HouseType,
  AppendantType,
  WillType,
  FamilyIncomeType,
  ImmigrantFileType,
  ManagementType,
  EquipmentType,
  FacilitiesType,
  CompanyType
} from './datafill'
import {
  ProjectType,
  FamilyIncomeConfigType,
  WillConfigType,
  DictConfigType,
  VillageType,
  MainType,
  DistrictType,
  CollectType
} from './common'

// 农户列表
export interface LandlordType {
  // 以下两个字段 为了更好的组成树加上的
  // parentCode = 居民户virutalVillageCode || 其他villageCode
  // code = id
  id: number
  code?: string | number
  landlord?: boolean
  uid: string
  name: string
  sex: string
  card: string
  doorNo: string
  areaCode: string
  areaCodeText?: string
  townCode: string
  townCodeText?: string
  villageCode: string
  villageCodeText?: string
  virutalVillageCode: string
  virutalVillageCodeText?: string
  parentCode?: string
  address: string
  projectId: number
  longitude: string
  latitude: string
  phone: string
  locationType: string
  locationTypeText?: string
  cityCode: string
  reportStatus: string
  hasPropertyAccount: true
  householdNumber: string
  reportDate: any
  reportUser: number
  fillingUpdateDate: string
  inundationRange: string
  altitude: number
  type: MainType
  totalNum?: number
  reportNum?: number
  [key: string]: any

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
  immigrantWill: WillType
  // 家庭收入
  immigrantIncomeList: FamilyIncomeType[]
  // 附件
  immigrantFile: ImmigrantFileType

  // 企业营收
  immigrantManagementList: ManagementType[]
  // 企业设备
  immigrantEquipmentList: EquipmentType[]
  // 农村小型专项及农副业设施信息
  immigrantFacilitiesList: FacilitiesType[]
  // 个体户 / 公司 扩展字段
  company: CompanyType
}

export interface DeleteRecordType {
  type: string
  deleteId: string
  [key: string]: any
}

/**
 * 拉取数据
 * 结构定义
 */

export interface StateType {
  pullTime: string
  peasantHouseholdPushDtoList: LandlordType[]
  deleteRecordList: DeleteRecordType[]
  project: ProjectType[]
  dictValList: DictConfigType[]
  immigrantIncomeConfigList: FamilyIncomeConfigType[]
  immigrantWillConfigList: WillConfigType[]
  immigrantAppendantConfigList: AppendantType[]

  districtTree: any[]
  districtList: DistrictType[]
  villageList: VillageType[]
  collectList: CollectType[]

  peasantHouseholdNum: number
  companyNum: number
  individualNum: number
  villageNum: number
}

export interface PushStateType {
  pullTime: string
  peasantHouseholdPushDtoList: LandlordType[]
  deleteRecordList: DeleteRecordType[]
  villageList: VillageType[]
}
