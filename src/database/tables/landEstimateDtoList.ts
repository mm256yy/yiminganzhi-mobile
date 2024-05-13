export interface landEstimateDtoListDDLType {
  createdBy: any
  createdDate: any
  lastModifiedBy: any
  lastModifiedDate: any
  id: Number
  projectId: Number
  status: any
  householdId: Number
  householdType: any
  doorNo: any
  showDoorNo: any
  householder: any
  area: any
  inundationRange: any
  sheetNumber: any
  landNumber: any
  landName: any
  cityCode: any
  areaCode: any
  townCode: any
  villageCode: any
  villagerGroup: any
  rightHolder: any
  landNature: any
  xzdw: any
  landLevelOne: any
  landLevelTwo: any
  shapeArea: Number
  shapeLeng: Number
  avgElevat: any
  minElevat: any
  maxElevat: any
  avgX: any
  minX: any
  maxX: any
  avgY: any
  minY: any
  maxY: any
  remark: any
  isDelete: any
  relationFlag: any
  estimateFlag: any
  relationBy: any
  landOwner: any
  getType: any
  landSea: any
  valuationPrice: Number
  valuationAmount: Number
  compensationAmount: Number
  uid: Number
  addReason: any
  deleteReason: any
  evalIsDelete: any
  areaText: any
  inundationRangeText: any
  cityCodeText: any
  areaCodeText: any
  townCodeText: any
  villageCodeText: any
  landNatureText: any
  landLevelOneText: any
  landLevelTwoText: any
  landTypeText: any
  cbRate: any
  cbNum: any
  getTypeText: any
  reportUserDate: any
  reportUserName: any
  estimateDate: any
  isUpdate: any
}

export const landEstimateDtoListName = 'landEstimateDtoList'
// 需要更新的字段定义 和 字段赋值
export const landEstimateDtoListlds = `'createdBy','createdDate','lastModifiedBy','lastModifiedDate','id','projectId','status','householdId','householdType','doorNo','showDoorNo','householder','area','inundationRange','sheetNumber','landNumber','landName','cityCode','areaCode','townCode','villageCode','villagerGroup','rightHolder','landNature','xzdw','landLevelOne','landLevelTwo','shapeArea','shapeLeng','avgElevat','minElevat','maxElevat','avgX','minX','maxX','avgY','minY','maxY','remark','isDelete','relationFlag','estimateFlag','relationBy','landOwner','getType','landSea','valuationPrice','valuationAmount','compensationAmount','uid','addReason','deleteReason','evalIsDelete','areaText','inundationRangeText','cityCodeText','areaCodeText','townCodeText','villageCodeText','landNatureText','landLevelOneText','landLevelTwoText','landTypeText','cbRate','cbNum','getTypeText','reportUserDate','reportUserName','estimateDate','isUpdate'`
export const getLandEstimateDtoListValues = (
  item: landEstimateDtoListDDLType,
  status: 'default' | 'modify'
) => {
  const m = { keys: '', valiues: '' }
  let key: keyof landEstimateDtoListDDLType
  // for (key in item) {
  //   if (!item[key]) {
  //     item[key] == null
  //   }
  //   if (key != 'isUpdate' && item[key]) {
  //     m = m + `'${item[key]}',`
  //   } else if (key == 'isUpdate') {
  //     m = m + `'${item[key]}'`
  //   } else {
  //     m = m + `'',`
  //   }
  // }
  for (key in item) {
    if (key != 'isUpdate') {
      m.keys += `'${key}',`
      m.valiues += item[key] ? `'${item[key]}',` : `'',`
    } else {
      m.keys += `'${key}'`
      m.valiues += `'${item[key]}'`
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
  'id' text PRIMARY KEY,
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
  'uid' text,
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
  'getTypeText' text,
  'isUpdate' text,
  'reportUserDate' text,
  'reportUserName' text,
  'estimateDate' text
);
`
