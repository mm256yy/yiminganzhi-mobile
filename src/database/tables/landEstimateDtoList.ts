export interface landEstimateDtoListDDLType {
  createdBy: string
  createdDate: string
  lastModifiedBy: string
  lastModifiedDate: string
  id: Number
  projectId: Number
  status: string
  householdId: Number
  householdType: string
  doorNo: string
  showDoorNo: string
  householder: string
  area: string
  inundationRange: string
  sheetNumber: string
  landNumber: string
  landName: string
  cityCode: string
  areaCode: string
  townCode: string
  villageCode: string
  villagerGroup: string
  rightHolder: string
  landNature: string
  xzdw: string
  landLevelOne: string
  landLevelTwo: string
  shapeArea: Number
  shapeLeng: Number
  avgElevat: string
  minElevat: string
  maxElevat: string
  avgX: string
  minX: string
  maxX: string
  avgY: string
  minY: string
  maxY: string
  remark: string
  isDelete: string
  relationFlag: string
  estimateFlag: string
  relationBy: string
  landOwner: string
  getType: string
  landSea: string
  valuationPrice: Number
  valuationAmount: Number
  compensationAmount: Number
  uid: Number
  addReason: string
  deleteReason: string
  evalIsDelete: string
  areaText: string
  inundationRangeText: string
  cityCodeText: string
  areaCodeText: string
  townCodeText: string
  villageCodeText: string
  landNatureText: string
  landLevelOneText: string
  landLevelTwoText: string
  landTypeText: string
  cbRate: string
  cbNum: string
  isUpdate: string
}

export const landEstimateDtoListName = 'landEstimateDtoList'
// 需要更新的字段定义 和 字段赋值
export const landEstimateDtoListlds = `'createdBy','createdDate','lastModifiedBy','lastModifiedDate','id','projectId','status','householdId','householdType','doorNo','showDoorNo','householder','area','inundationRange','sheetNumber','landNumber','landName','cityCode','areaCode','townCode','villageCode','villagerGroup','rightHolder','landNature','xzdw','landLevelOne','landLevelTwo','shapeArea','shapeLeng','avgElevat','minElevat','maxElevat','avgX','minX','maxX','avgY','minY','maxY','remark','isDelete','relationFlag','estimateFlag','relationBy','landOwner','getType','landSea','valuationPrice','valuationAmount','compensationAmount','uid','addReason','deleteReason','evalIsDelete','areaText','inundationRangeText','cityCodeText','areaCodeText','townCodeText','villageCodeText','landNatureText','landLevelOneText','landLevelTwoText','landTypeText','cbRate','cbNum','isUpdate'`
export const getLandEstimateDtoListValues = (item: landEstimateDtoListDDLType, status: 'default' | 'modify') => {
  let m = ''
  let key: keyof landEstimateDtoListDDLType
  for (key in item) {
    if (!item[key]) {
      item[key] == 'null'
    }
    if (key != 'isUpdate') {
      m = m + `'${item[key]}',`
    } else {
      m = m + `'${item[key]}'`
    }

  }
  return m
}


export const landEstimateDtoListDDL = `
create table if not exists ${landEstimateDtoListName} (
  'createdBy' text,
  'createdDate' text,
  'lastModifiedBy' text,
  'lastModifiedDate' text,
  'id' INTEGER DEFAULT NULL,
  'projectId' text,
  'status' text,
  'householdId' text,
  'householdType' text,
  'doorNo' text,
  'showDoorNo' text,
  'householder' text,
  'area' text,
  'inundationRange' text,
  'sheetNumber' text,
  'landNumber' text,
  'landName' text,
  'cityCode' text,
  'areaCode' text,
  'townCode' text,
  'villageCode' text,
  'villagerGroup' text,
  'rightHolder' text,
  'landNature' text,
  'xzdw' text,
  'landLevelOne' text,
  'landLevelTwo' text,
  'shapeArea' text,
  'shapeLeng' text,
  'avgElevat' text,
  'minElevat' text,
  'maxElevat' text,
  'avgX' text,
  'minX' text,
  'maxX' text,
  'avgY' text,
  'minY' text,
  'maxY' text,
  'remark' text,
  'isDelete' text,
  'relationFlag' text,
  'estimateFlag' text,
  'relationBy' text,
  'landOwner' text,
  'getType' text,
  'landSea' text,
  'valuationPrice' text,
  'valuationAmount' text,
  'compensationAmount' text,
  'uid' text PRIMARY KEY,
  'addReason' text,
  'deleteReason' text,
  'evalIsDelete' text,
  'areaText' text,
  'inundationRangeText' text,
  'cityCodeText' text,
  'areaCodeText' text,
  'townCodeText' text,
  'villageCodeText' text,
  'landNatureText' text,
  'landLevelOneText' text,
  'landLevelTwoText' text,
  'landTypeText' text,
  'cbRate' text,
  'cbNum' text,
  'isUpdate' text
);
`