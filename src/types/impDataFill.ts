// 房屋装修 assetHouseFitUpList
export interface AssetHouseFitUpType {
  isUpdate?: string
  id?: number
  doorNo: string
  householdId: number
  houseNo: string
  houseId: number
  fitUpType: string
  fitUpName: string
  unit: string
  number: number
  price: number
  discountRate: number
  valuationAmount: number
  compensationAmount: number
  remark: string
  uid?: string
  projectId?: number
  status?: string
  addReason?: string
  deleteReason?: string
  isDelete?: string
}

// 土地基本情况 assetLandList
export interface AssetLandType {
  isUpdate?: string
  id?: number
  doorNo: string
  householdId: number
  surveyId: string
  landNumber: string
  landName: string
  groupName: string
  locationType: string
  growers: string
  landArea: number
  landType: string
  landOwner: string
  getType: string
  landSea: string
  valuationPrice: number
  valuationAmount: number
  compensationAmount: number
  remark: string
  uid?: string
  projectId?: number
  status?: string
  addReason?: string
  deleteReason?: string
  isDelete?: string
}

// 土地青苗及附着物 assetAppendantList
export interface AssetAppendantType {
  isUpdate?: string
  id?: number
  doorNo: string
  householdId: number
  surveyId: string
  landNumber: string
  name: string
  size: string
  number: number
  price: number
  rate: number
  valuationAmount: number
  compensationAmount: number
  remark: string
  uid?: string
  projectId?: number
  status?: string
  addReason?: string
  deleteReason?: string
  isDelete?: string
}

// 归档文件 immigrantDocumentation
export interface ImmigrantDocumentationType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  produceVerifyPic: string
  produceOtherPic: string
  relocateVerifyPic: string
  relocateOtherPic: string
  graveVerifyPic: string
  graveOtherPic: string
  graveChoosePic: string
  graveChooseOtherPic: string
  houseEmptyPic: string
  houseEmptyOtherPic: string
  landEmptyPic: string
  landEmptyOtherPic: string
  excessVerifyPic: string
  excessAgreementPic: string
  excessVerifyOtherPic: string
  buildOneselfPic: string
  buildOneselfCheckPic: string
  buildOneselfOtherPic: string
  flatAgreementPic: string
  flatMeasurementPic: string
  flatOtherPic: string
  agriculturePic: string
  agricultureOtherPic: string
  compensationCardPic: string
  compensationCardOtherPic: string
  houseEstimatePic: string
  landEstimatePic: string
  agreementPic: string
  agreementOtherPic: string
  devicePic: string
  specialPic: string
  findOneSelfPic: string
  findOneSelfOtherPic: string
  [key: string]: any
}

// 模拟安置 搬迁安置
export interface SimulateImmigrantSettleType {
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  peopleNum: number
  houseAreaType: string
  houseArea: number
  typeOneNum: number
  typeTwoNum: number
  typeThreeNum: number
  typeFourNum: number
  settleAddress: string
  areaType: string
  preorderAmount: number
  compensationAmount: number
  differenceAmount: number
}

// 模拟安置 生产安置
export interface SimulateDemographicType {
  id?: number
  doorNo: string
  projectId?: number
  uid?: string
  status?: string
  settingWay: string
  settingRemark: string
  demographicId: number
}

// 搬迁安置确认 immigrantSettle
export interface ImmigrantSettleType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  peopleNum: number
  houseAreaType: string
  houseArea: number
  typeOneNum: number
  typeTwoNum: number
  typeThreeNum: number
  typeFourNum: number
  settleAddress: string
  areaType: string
  preorderAmount: number
  compensationAmount: number
  differenceAmount: number
}

// 生产用地 immigrantLand
export interface ImmigrantLandType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  settleAddress: string
  lotteryOrder: string
  placeOrder: string
  eachPieceLand: number
  landNo: string
  landArea: string
  landPic: string
}

// 选房择址 immigrantChooseHouseList
export interface ImmigrantChooseHouseType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  settleAddress: string
  lotteryOrder: string
  placeOrder: string
  eachPieceLand: number
  landNo: string
  landArea: string
  houseAreaType: string
  area: string
  houseNo: string
  roomNo: string
  storeroomNo: string
  lotteryOrderPic: string
  placeOrderPic: string
  chooseHousePic: string
  otherPic: string
  lotteryOrderVerifyPic: string
  placeOrderVerifyPic: string
  carNo: string
  [key: string]: any
}

// 移民建卡 immigrantCompensationCardList
export interface ImmigrantCompensationCardType {
  isUpdate?: string
  id?: number
  doorNo: string
  name: string
  unit: string
  number: number
  remark: string
  uid?: string
  projectId?: number
  status?: string
  price: number
  totalPrice: number
  isVerify: string
  type: string
  [key: string]: any
}

// 房屋腾空 immigrantHouseEmpty
export interface ImmigrantHouseEmptyType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  isHouseEmpty: string
  houseEmptyDate: string
  houseEmptyOpinion: string
}

// 土地腾空 immigrantLandEmpty
export interface ImmigrantLandEmptyType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  isLandEmpty: string
  landEmptyDate: string
  landEmptyOpinion: string
}

// 过渡安置 immigrantExcess
export interface ImmigrantExcessType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  isExcess: string
  excessStartDate: string
  excessEndDate: string
  excessAddress: string
}

// 自建房 immigrantBuildOneselfList
export interface ImmigrantBuildOneselfType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  completeDate: string
  completePic: string
  name: string
  type: string
  isComplete: string
  [key: string]: any
}

// 相关手续 immigrantProceduresList
export interface ImmigrantProceduresType {
  isUpdate?: string
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  completeDate: string
  completePic: string
  name: string
  type: string
  needHandle: string
  isComplete: string
  [key: string]: any
}

// 填报状态

// householdPicStatus	居民户信息完成状态
// houseMainStatus	房屋主体评估
// houseRenovationStatus	房屋装修评估
// appendageStatus	附属物评估
// treeStatus	果木评估
// landStatus	土地评估
// graveStatus	坟墓评估
// estimateeStatus	评估总状态
// populationStatus	人口核定状态
// propertyStatus	产权状态
// qualificationStatus	资格认定总状态
// productionArrangementStatus	生产安置状态
// relocateArrangementStatus	搬迁安置状态
// graveArrangementStatus	坟墓安置状态
// arrangementStatus	安置确认总状态
// landUseStatus	用地状态
// chooseHouseStatus	择房状态
// chooseGraveStatus	坟墓择址状态
// chooseStatus	择址确认总状态
// cardStatus	移民建卡总状态
// houseSoarStatus	房屋腾空状态
// landSoarStatus	土地腾空状态
// excessStatus	过度安置状态
// excessSoarStatus	过度腾空总状态
// buildOneselfStatus	自建房状态
// flatsStatus	公寓房状态
// centralizedSupportStatus	集中供养状态
// relocateArrangementAllStatus	搬迁安置总状态
// agricultureArrangementStatus	农业安置状态
// retirementStatus	养老保险状态
// selfEmploymentStatus	自谋职业状态
// productionArrangementAllStatus	生产安置总状态
// proceduresStatus	相关手续总状态
// agreementStatus	协议总状态
// deviceStatus	设施设备评估状态
// specialStatus	小型专项及农副业设施状态
// disposalMeasuresStatus	集体资产处置办法状态
export interface ImmigrantFillingType {
  id?: number
  doorNo: string
  uid?: string
  projectId?: number
  status?: string
  householdPicStatus: string
  houseMainStatus: string
  houseRenovationStatus: string
  appendageStatus: string
  treeStatus: string
  landStatus: string
  graveStatus: string
  estimateeStatus: string
  populationStatus: string
  propertyStatus: string
  qualificationStatus: string
  productionArrangementStatus: string
  relocateArrangementStatus: string
  graveArrangementStatus: string
  arrangementStatus: string
  landUseStatus: string
  chooseHouseStatus: string
  chooseGraveStatus: string
  chooseStatus: string
  cardStatus: string
  houseSoarStatus: string
  landSoarStatus: string
  excessStatus: string
  excessSoarStatus: string
  buildOneselfStatus: string
  flatsStatus: string
  centralizedSupportStatus: string
  relocateArrangementAllStatus: string
  agricultureArrangementStatus: string
  retirementStatus: string
  selfEmploymentStatus: string
  productionArrangementAllStatus: string
  proceduresStatus: string
  agreementStatus: string
  deviceStatus: string
  specialStatus: string
  disposalMeasuresStatus: string
  selfSeekingStatus: string
  isUpdate?: string
}

// 自谋出路
export interface ImmigrantSelfSeekingType {
  id?: number
  doorNo?: string
  uid?: string
  projectId?: number
  status?: string
  selfSeekingDate: string
  selfSeekingPic: string
  isUpdate?: string
}
