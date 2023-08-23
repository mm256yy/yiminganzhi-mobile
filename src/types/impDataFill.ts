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
