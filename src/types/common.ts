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
}

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
  name: string
  type: MainType
  villageCode: string
  page: number
  pageSize: number
}
