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
  CompanyType,
  UpdateLogType
} from './datafill'
import {
  ProjectType,
  FamilyIncomeConfigType,
  WillConfigType,
  DictConfigType,
  VillageType,
  MainType,
  DistrictType,
  CollectType,
  Top5Type
} from './common'
import {
  AssetHouseFitUpType,
  AssetLandType,
  AssetAppendantType,
  ImmigrantDocumentationType,
  ImmigrantSettleType,
  ImmigrantLandType,
  ImmigrantChooseHouseType,
  ImmigrantCompensationCardType,
  ImmigrantHouseEmptyType,
  ImmigrantLandEmptyType,
  ImmigrantExcessType,
  ImmigrantBuildOneselfType,
  ImmigrantProceduresType,
  SimulateImmigrantSettleType,
  SimulateDemographicType,
  ImmigrantFillingType,
  ImmigrantSelfSeekingType
} from './impDataFill'

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
  otherCode?: string
  address: string
  projectId: number
  longitude: string
  latitude: string
  phone: string
  locationType: string
  locationTypeText?: string
  cityCode: string
  reportStatus: string
  hasPropertyAccount?: boolean
  householdNumber: string
  reportDate: any
  reportUser: number
  fillingUpdateDate: string
  inundationRange: string
  altitude?: number
  type: MainType
  totalNum?: number
  reportNum?: number
  signStatus?: string
  signDate?: any
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
  cityCodeText?: string

  isUpdate?: string
  showDoorNo: string
  fillStatus: string
  signUser: number
  initialVillageCode: string
  status: string
  settingWay: string
  buildingForm: string
  accountName: string
  bankName: string
  bankAccount: string
  accountRemark: string
  householdPic: string
  familyPic: string
  housePic: string
  resettlePic: string
  implementFillStatus: string
  implementEscalationStatus: string
  disposalMeasuresPic: string

  updateLogList: UpdateLogType[]
  assetHouseFitUpList: AssetHouseFitUpType[]
  assetLandList: AssetLandType[]
  assetAppendantList: AssetAppendantType[]
  immigrantDocumentation: any
  immigrantSettle: Partial<ImmigrantSettleType>
  immigrantLand: Partial<ImmigrantLandType>
  immigrantChooseHouseList: ImmigrantChooseHouseType[]
  immigrantCompensationCardList: ImmigrantCompensationCardType[]
  immigrantHouseEmpty: Partial<ImmigrantHouseEmptyType>
  immigrantLandEmpty: Partial<ImmigrantLandEmptyType>
  immigrantExcess: Partial<ImmigrantExcessType>
  immigrantBuildOneselfList: ImmigrantBuildOneselfType[]
  immigrantProceduresList: ImmigrantProceduresType[]

  simulateDemographic: Partial<SimulateDemographicType>[]
  simulateImmigrantSettle: Partial<SimulateImmigrantSettleType>

  warnStatus: string // 预警状态 0正常 1预警 2滞后
  currentProgress: string // 当前进度 1资格认定 2资产评估 3安置确认 4择址确认 5腾空过度 6动迁协议 7搬迁安置 8生产安置 9已完成

  gridmanName: string
  gridmanId: number
  gridmanPhone: number
  householderDoorNo: string
  immigrantFilling: Partial<ImmigrantFillingType>
  immigrantSelfSeeking: Partial<ImmigrantSelfSeekingType>
}
// 农户列表 含有状态
export interface LandlordHasStatusType {
  // 以下两个字段 为了更好的组成树加上的
  // parentCode = 居民户virutalVillageCode || 其他villageCode
  // code = id
  uid: string
  id: number
  name: string
  type: string
  sex: string
  card: string
  doorNo: string
  villageCode: string
  virutalVillageCode: string
  address: string
  projectId: string
  longitude: string
  latitude: string
  phone: string
  locationType: string
  locationTypeText: string
  stageName: string
  lagAddDataStatus: string
  warnAddDataStatus: string
  warnStatus: string // 预警状态 0正常 1预警 2滞后
  stage: string
  padStatus: string
  isPadDelete: string
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
  cityCodeText?: string

  isUpdate?: string
  showDoorNo: string
  fillStatus: string
  signUser: number
  initialVillageCode: string
  status: string
  settingWay: string
  buildingForm: string
  accountName: string
  bankName: string
  bankAccount: string
  accountRemark: string
  householdPic: string
  familyPic: string
  housePic: string
  resettlePic: string
  implementFillStatus: string
  implementEscalationStatus: string
  disposalMeasuresPic: string

  updateLogList: UpdateLogType[]
  assetHouseFitUpList: AssetHouseFitUpType[]
  assetLandList: AssetLandType[]
  assetAppendantList: AssetAppendantType[]
  immigrantDocumentation: any
  immigrantSettle: Partial<ImmigrantSettleType>
  immigrantLand: Partial<ImmigrantLandType>
  immigrantChooseHouseList: ImmigrantChooseHouseType[]
  immigrantCompensationCardList: ImmigrantCompensationCardType[]
  immigrantHouseEmpty: Partial<ImmigrantHouseEmptyType>
  immigrantLandEmpty: Partial<ImmigrantLandEmptyType>
  immigrantExcess: Partial<ImmigrantExcessType>
  immigrantBuildOneselfList: ImmigrantBuildOneselfType[]
  immigrantProceduresList: ImmigrantProceduresType[]

  simulateDemographic: Partial<SimulateDemographicType>[]
  simulateImmigrantSettle: Partial<SimulateImmigrantSettleType>

  currentProgress: string // 当前进度 1资格认定 2资产评估 3安置确认 4择址确认 5腾空过度 6动迁协议 7搬迁安置 8生产安置 9已完成

  gridmanName: string
  gridmanId: number
  gridmanPhone: number
  householderDoorNo: string
  immigrantFilling: Partial<ImmigrantFillingType>
  immigrantSelfSeeking: Partial<ImmigrantSelfSeekingType>
}
export interface AppVersionDtoType {
  id: number
  appId: string // 应用id 前端提供
  title: string // 更新标题
  content: Array<string> // 更新内容
  apkUrl: string // apk包的链接
  version: string // 版本  版本不得低于线上版本
  platform: 'android' | 'ios' // 平台
  createTime: any // 包上传时间 系统生成
  publish: boolean // 发布状态
  remark: string // 备注
}

export interface DeleteRecordType {
  type: string
  deleteId: string
  [key: string]: any
}

interface LabelValueChildrenType {
  label: string
  value: any
  children: LabelValueChildrenType[]
}

export interface ChooseConfigType {
  id?: number
  projectId?: number
  sort: string
  type: string
  name: string
  isOccupy: string
}

export interface HouseConfigType {
  id?: number
  projectId?: number
  isOccupy: string
  level: string
  code: string
  parentCode: string
  name: string
}

export interface ImmigrantCompensationCardConfigType {
  id?: number
  projectId?: number
  name: string
  unit: string
  number: number
  price: number
  type: string
  isUpdate: string
  totalPrice: number
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
  professionalTree: LabelValueChildrenType[]
  upgradation: AppVersionDtoType | null
  immigrantGraveList: GraveType[]
  top5Statistic: Top5Type | null

  peasantHouseholdNum: number
  companyNum: number
  individualNum: number
  villageNum: number
  virutalVillageNum: number

  peasantHouseholdLagNum: number
  peasantHouseholdWarnNum: number

  companyLagNum: number
  companyWarnNum: number

  individualLagNum: number
  individualWarnNum: number

  villageLagNum: number
  villageWarnNum: number

  chooseConfig: ChooseConfigType[]
  houseConfig: HouseConfigType[]
  immigrantCompensationCardConfig: ImmigrantCompensationCardConfigType[]
  rankDtoList: any[]
  feedbackDtoList: any[]
  pgTop: any[]
  evaluatorStatisticsDto: any
  settleAddressList:any[]
  peasantHouseholdDtoList: LandlordHasStatusType[]
}

export interface PushStateType {
  pullTime: string
  peasantHouseholdPushDtoList: LandlordType[]
  deleteRecordList: DeleteRecordType[]
  villageList: VillageType[]
  immigrantGraveList: GraveType[]
  pushStatus?: 'pushEnd' | 'syncEnd'
  feedbackDtoList?: any[]
}

export interface ImgItemType {
  url?: string
  base64?: string
  path?: string
}

// 调查对象接口数据定义
export interface LandlordWithPageType {
  pullTime: string
  peasantHouseholdPushDtoList: LandlordType[]
  lastId: number | null
}
