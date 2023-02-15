// 人口列表
export interface PopulationType {
  id: number
  name: string
  sex: string
  card: string
  relation: string
  doorNo: string
  townCode: string
  villageCode: string
  virutalVillageCode: string
  address: string
  birthday: string
  nation: string
  censusRegister: string
  education: string
  marital: string
  censusType: string
  populationType: string
  occupation: string
  company: string
  comeTime: string
  comeCause: string
  comeAddressTime: string
  comeAddressCause: string
  fromTown: string
  fromAddress: string
  projectId: number
  cityCode: string
  areaCode: string
  cityCodeText: string
  areaCodeText: string
  townCodeText: string
  villageText: string
  virutalVillageText: string
  insured: boolean
  [key: string]: any
}

// 房屋类型定义
export interface HouseType {
  id: number
  doorNo: string
  householdId: number
  houseNo: string
  propertyType: string
  usageType: string
  houseType: string
  constructionType: string
  storeyNumber: number
  completedTime: string
  propertyNo: string
  landNo: string
  landType: string
  landArea: number
  storeyHeight: number
  houseHeight: number
  outerWallType: string
  interiorWallType: string
  groundType: string
  roofType: string
  roofMaterialsType: string
  doorsWindowsType: string
  waterElectricityType: string
  formula: string
  longitude: string
  latitude: string
  housePic: string
  remark: string
  [key: string]: any
}

// 果木类型定义
export interface TreeType {
  id: number
  doorNo: string
  householdId: number
  surveyId: number
  name: string
  usageType: string
  size: string
  unit: string
  number: number
  remark: string
  [key: string]: any
}

// 坟墓类型定义
export interface GraveType {
  id: number
  doorNo: string
  householdId: number
  graveType: string
  number: number
  materials: string
  graveYear: string
  gravePosition: string
  remark: string
  [key: string]: any
}

// 附属物
export interface AppendantType {
  id: number
  doorNo: string
  householdId: number
  surveyId: string
  name: string
  size: string
  unit: string
  number: number
  remark: string
  [key: string]: any
}

// 安置意愿类型定义
export interface WillType {
  id: number
  doorNo: string
  householdId: number
  familyNum: number | string
  countryNum: number | string
  unCountryNum: number | string
  opinion: string
  productionType: string
  removalType: string
  [key: string]: any
}

// 家庭收入
export interface FamilyIncomeType {
  id: number
  doorNo: string
  householdId: number
  sort: string
  type: string
  name: string
  amount: number
  remark: string
  [key: string]: any
}

// 附件类型定义
export interface ImmigrantFile {
  doorNo: string
  householdId: number
  otherPic: string
  id: number
  uid: string
  [key: string]: any
}
