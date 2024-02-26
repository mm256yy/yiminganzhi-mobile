// 项目类型定义
export type ProjectType = {
  id: number
  name: string
  description?: string
  dingCorpId?: number
  showName: string
  reservoirCode: string
  projectType: string
  townCode: string
  reservoirName: string
  districtTree: string[]
  status: MainStage
}

// SURVEY("实物调查","survey"),
// REVIEW("实物复核","review"),

// 家庭收入配置类型定义
export type FamilyIncomeConfigType = {
  id?: number
  name: string
  type: string
  sort: string
}

// 安置意愿配置信息
export type WillConfigType = {
  id: number
  projectId: number
  type: string
  way: string
  area: string
}

// 附属物配置信息
export type AppendantType = {
  id?: number
  name: string
  size: string
  unit: string
}

export type DictDetailType = {
  id?: number
  dictId: number
  projectId: number
  label: string
  value: string
  sort: string
}

// 字典类型定义
export type DictConfigType = {
  id: number
  name: string
  dictGroup: string
  remark: string
  dictValList: DictDetailType[] | null
}

export enum MainType {
  PeasantHousehold = 'PeasantHousehold',
  Company = 'Company',
  IndividualHousehold = 'IndividualHousehold',
  Village = 'Village'
}

export enum DistrictTypeEnum {
  Country = 'Country',
  Township = 'Township',
  Village = 'Village',
  naturalVillage = 'naturalVillage'
}

export enum ReportStatusEnum {
  ReportSucceed = 'ReportSucceed',
  UnReport = 'UnReport'
}

// 签字状态
export enum SignStatusEnum {
  SignSucceed = 'SignSucceed',
  UnSign = 'UnSign'
}

// 项目进行到的阶段，survey: 调查填报阶段， review: 复核阶段, implementation: 实施阶段
export enum MainStage {
  survey = 'survey',
  review = 'review',
  implementation = 'implementation'
}

/**
 * 复核修改记录公共传参
 * company 企业/个体户 基本概况
 * immigrantManagementList 企业营收
 * immigrantEquipmentList 企业设备
 * immigrantFacilitiesList 农村小型专项及农副业设施信息
 * 以下的值，居民户、企业、个体户、村集体都共用
 * demographicList 人口信息
 * immigrantAppendantList 附属物信息
 * immigrantTreeList 零星（林）果木
 * immigrantGraveList 坟墓信息
 * immigrantHouseList 房屋信息
 * immigrantWill 安置意愿信息
 * immigrantIncomeList 家庭收入信息
 */
export enum ReviewCategory {
  company = 'company',
  immigrantManagementList = 'immigrantManagementList',
  immigrantEquipmentList = 'immigrantEquipmentList',
  immigrantFacilitiesList = 'immigrantFacilitiesList',
  demographicList = 'demographicList',
  immigrantAppendantList = 'immigrantAppendantList',
  immigrantTreeList = 'immigrantTreeList',
  immigrantGraveList = 'immigrantGraveList',
  immigrantHouseList = 'immigrantHouseList',
  immigrantWill = 'immigrantWill',
  immigrantIncomeList = 'immigrantIncomeList',
  immigrantOtherList = 'immigrantOtherList',
  immigrantInfrastructureList = 'immigrantInfrastructureList'
}

export interface ReportParamsType {
  uid: string
  isCheck: boolean
  type: MainType
}

// 数据统计 类型定义
export type CollectType = {
  totalNum: number
  reportNum: number
  submitNum: number
  type: MainType
  villageName: string
  [key: string]: any
}

// 其他 类型定义
export type OtherType = {
  [key: string]: any
}

// 行政区划 类型定义
export type DistrictType = {
  [key: string]: any
  id: number
  parentId: number
  code: string
  name: string
  shortName: string
  districtType: DistrictTypeEnum
  latitude: number
  longitude: number
  address: string
  creditCode: string
  orgType: string
  introduction: string
  hasChild: true
  zoom: number
  level: number
  parentCode: string
  fullName: string
  totalNum?: number
  reportNum?: number
}

// 自然村类型定义
export interface VillageType {
  id: number
  uid: string
  address: string
  code: string
  introduction: string
  latitude: number
  longitude: number
  name: string
  parentCode: string
  villageCodeText?: string
  townCodeText?: string
  areaCodeText?: string
  projectId: number
  totalNum?: number
  reportNum?: number
  [key: string]: any
}

// 业主筛选
export interface LandlordQuery {
  name: string
  timeArray: string[]
  userId: number
}

// 根据行政村刷选
export interface LandlordSearchType {
  name?: string
  type: MainType
  doorNo?: string
  areaCode?: string
  townCode?: string
  villageCode?: string
  virutalVillageCode?: string
  page?: number
  pageSize?: number
  warnStatus?: string
}

// 分页类型
export interface PageQueryType {
  page: number
  pageSize: number
}

// 打印的类别
export enum PrintType {
  print = 'print', // 居民户
  printCompany = 'printCompany', // 企业
  printIndividualHousehold = 'printIndividualHousehold', // 个体户
  printCollective = 'printCollective' // 村集体
}

export interface Top5ItemType {
  name: string
  number: number
}
// top5
export interface Top5Type {
  homeReportTop: Top5ItemType[]
  homeReportTopToday: Top5ItemType[]
  homeSignTop: Top5ItemType[]
  homeSignTopToday: Top5ItemType[]
}

// 角色代码
export enum RoleCodeType {
  administrators = 'administrators', // 项目管理员
  investigator = 'investigator', // 实物调查员
  implementation = 'implementation', // 移民实施员
  assessor = 'assessor', // 资产评估-房屋
  reviewer = 'reviewer', // 实物复核员
  assessorland = 'assessorland', // 资产评估-土地
  implementleader = 'implementleader' //实施组长
}

// 安置方式
export enum HouseAreaType {
  homestead = 'homestead',
  flat = 'flat',
  oneself = 'oneself',
  concentrate = 'concentrate'
}

// 信息填报反馈
export interface FeedbackMessage {
  id: string
  feedbackId: string
  remark: string
  title: string
  status: string
  createdDate: any
  creater: string
}


// 信息填报
export interface CommentType {
  id: string,
  projectId: string,
  doorNo: string,
  householder: string,
  type: string,
  typeText: string,
  remark: string,
  status: string,
  statusText: string,
  reader: any,
  feedbackPic: any,
  readerId: any,
  createdDate: any,
  creater: string,
  createdBy: string,
  isSelf: any,
  uid: string,
  feedbackMessageList: any,
  [key: string]: any
}
