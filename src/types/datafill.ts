// 人口列表
export interface PopulationType {
  id?: number
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
  addReason?: string // 添加原因
  reason?: string // 删除原因

  [key: string]: any

  showDoorNo?: string
  longitude?: string
  latitude?: string
  phone?: string
  locationType?: string
  reportStatus?: string
  fillStatus?: string
  signStatus?: string
  hasPropertyAccount?: boolean
  householdNumber?: string
  reportDate?: string
  reportUser?: number
  signDate?: string
  signUser?: number
  uid?: string
  fillingUpdateDate?: string
  type?: string
  inundationRange?: string
  altitude?: number
  initialVillageCode?: string
  status?: string
  settingWay?: string
  buildingForm?: string
  accountName?: string
  bankName?: string
  bankAccount?: string
  accountRemark?: string

  householdId?: number
  populationSort?: string
  insuranceType?: string
  cardPic?: string
  householdPic?: string
  remark?: string
  otherPic?: string
  populationNature?: string
  checkRemark?: string
  deleteReason?: string
  isDelete?: string
  settingRemark?: string
  productionStatus?: string
  relocateStatus?: string
  productionCompleteTime?: string
  relocateCompleteTime?: string
  productionPic?: string
  relocatePic?: string
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
  landArea: number | string
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
  addReason?: string // 添加原因
  reason?: string // 删除原因
  [key: string]: any

  otherPic?: string
  uid?: string
  homePic?: string
  inundationRange?: string
  altitude?: number
  locationType?: string
  landPic?: string
  houseCadPic?: string
  projectId?: number
  status?: string
  hasEstimate?: string
  situated?: string
  homesteadArea?: number
  constructionLevel?: string
  buildingHeight?: number
  newnessRate?: number
  valuationPrice?: number
  valuationAmount?: number
  compensationAmount?: number
  valuationRemark?: string
  houseNature?: string
  demographicId?: number
  ownersSituation?: string
  deleteReason?: string

  isDelete?: string
  isCompliance?: string // 是否合法，0不合法，1合法
  otherProofPic?: string // 	佐证文件
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

  uid?: string
  inundationRange?: string
  altitude?: number
  projectId?: number
  status?: string
  price?: number
  discountRate?: number
  valuationAmount?: number
  compensationAmount?: number
  valuationRemark?: string

  addReason?: string
  deleteReason?: string
  isDelete?: string
}

// 坟墓类型定义
export interface GraveType {
  id?: number
  uid?: string
  villageDoorNo: string
  villageId: number
  graveType: string
  number: number
  materials: string
  graveYear: string
  gravePosition: string
  remark: string
  registrantName: string
  registrantId: number
  registrantDoorNo: string
  relation: string
  [key: string]: any

  projectId?: number
  status?: string
  graveName?: string
  hasEstimate?: string
  localClassify?: string
  valuationAmount?: number
  compensationAmount?: number
  migrationFee?: number
  otherIncentiveFees?: number
  handleWay?: string
  settingGrave?: string
  settingAddress?: string
  settingRemark?: string

  graveNo?: string
  addReason?: string
  deleteReason?: string
  isDelete?: string
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

  isUpdate?: string
  uid?: string
  inundationRange?: string
  altitude?: number
  projectId?: number
  status?: string
  price?: number
  discountRate?: number
  valuationAmount?: number
  compensationAmount?: number
  valuationRemark?: string
  addReason?: string
  deleteReason?: string
  isDelete?: string
}

export interface WillProductionType {
  id: number
  doorNo: string
  householdId: number
  productionType: string
  number: number
  uid?: string
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
  immigrantWillProductionList: WillProductionType[]
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
export interface ImmigrantFileType {
  doorNo: string
  householdId?: number
  otherPic: string
  id?: number
  uid?: string
  [key: string]: any
}

// 企业/个体户 字段
export interface CompanyType {
  id?: number | null
  doorNo: string
  householdId?: number
  uid?: string
  legalPersonName: string
  legalPersonCard: string
  legalPersonPhone: string
  companyType: string
  companyAddress: string
  licenceType: string
  periodValidity: string
  licenceNo: string
  taxPeriodValidity: string
  taxLicenceNo: string
  taxLicenceCompany: string
  ohterLicence: string
  registerType: string
  establishDate: string
  natureBusiness: string
  industryType: string
  economicNature: string
  registeredAmount: number
  fixedAssetsOriginalValue: number
  fixedAssetsNetValue: number
  regularWorkerNum: number
  temporaryWorkerNum: number
  annualPayroll: number
  averageAnnualOutputValue: number
  averageAnnualProfit: number
  averageAnnualTaxPaid: number
  managementType: string
  productCategory: string
  managementStatus: string
  informationInvolved: string
  treatmentScheme: string
  sellOwnershipArea: number
  sellOccupiedArea: number
  sellRemark: string
  transferOwnershipArea: number
  transferOccupiedArea: number
  transferRemark: string
  rentOwnershipArea: number
  rentOccupiedArea: number
  rentRemark: string
  otherOwnershipArea: number
  otherOccupiedArea: number
  otherRemark: string
  totalOwnershipArea: number
  totalOccupiedArea: number
  remark: string
  licensePic: string
  otherPic: string
  [key: string]: any
}

export interface ManagementType {
  id?: number
  doorNo: string
  householdId?: number
  lastYearAmount: number
  lastTwoYearAmount: number
  lastThreeYearAmount: number
  remark: string
  uid?: string
  name: string
  type: string
  [key: string]: any
}

export interface EquipmentType {
  id?: number
  doorNo: string
  householdId?: number
  surveyId: string
  name: string
  size: string
  unit: string
  number: number
  remark: string
  uid?: string
  purpose: string
  year: string
  amount: number
  moveType: string
  [key: string]: any

  projectId?: number
  status: string
  addReason?: string // 新增原因
  deleteReason?: string // 删除原因
  isDelete?: string // 是否删除，0正常，1已删除
  price?: number // 单价
  discountRate?: number // 折率
  valuationAmount?: number // 评估金额
  compensationAmount?: number // 补偿金额
  valuationRemark?: string // 评估备注
}

export interface FacilitiesType {
  id?: number
  doorNo: string
  householdId?: number
  facilitiesName: string
  facilitiesType: string
  competentUnit: string
  locationType: string
  specificLocation: string
  facilitiesCode: string
  number: number
  unit: string
  completedTime: string
  scopes: string
  benefit: number
  cost: number
  netBal: number
  originalInvest: number
  workersNum: number
  altitude: number
  inundationRang: string
  remark: string
  uid?: string
  [key: string]: any

  projectId?: number
  status?: string

  addReason?: string // 新增原因
  deleteReason?: string // 删除原因
  isDelete?: string // 是否删除，0正常，1已删除
  price?: number // 单价
  discountRate?: number // 折率
  valuationAmount?: number // 评估金额
  compensationAmount?: number // 补偿金额
  valuationRemark?: string // 评估备注
}

export interface TemplateParamsType {
  templateKey: string
  projectId: number
  templateType: string
  templateModule: string
}

// 更新日志
export interface UpdateLogType {
  isUpdate?: string
  id?: number
  createdName: string
  type: string
  operationType: string
  updateJson: string
  name: string
  doorNo: string
  reason?: string
}
