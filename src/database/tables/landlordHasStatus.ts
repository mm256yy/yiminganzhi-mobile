/**
 * 业主表字段定义
 */

import { MainType, ReportStatusEnum } from '@/types/common'
import { LandlordHasStatusType } from '@/types/sync'
import { getCurrentTimeStamp } from '@/utils'

export interface LandlordHasStatusDDLType {
  uid: string
  id: number
  name: string
  sex: string
  type: string
  card: MainType
  doorNo: ReportStatusEnum
  townCode: string
  villageCode: string
  areaCode: string
  virutalVillageCode: string // 预警状态
  address: string
  projectId: string // 当前进程 1资格认定 2资产评估 3安置确认 4择址确认 5腾空过度 6动迁协议 7搬迁安置 8生产安置 9已完成
  longitude: string | number
  latitude: string | number
  locationType : string,
  locationTypeText : string
  stageName : string
  lagAddDataStatus : string
  warnAddDataStatus: string
  warnStatus : string
  stage : string
  currentProgress : string
  padStatus : string
  isPadDelete : string 
  status : string 
  updatedDate : string 
}

export const LandlordHasStatusTableName = 'landlordHasStatus'

export const LandlordHasStatusDDL = `
create table if not exists ${LandlordHasStatusTableName} (
  'uid' text PRIMARY KEY,
  'id' INTEGER DEFAULT NULL,
  'name' text,
  'sex'  text,
  'type'  text,
  'card'  text,
  'doorNo' text,
  'townCode' text,
  'villageCode' text, 
  'virutalVillageCode' text,
  'address' text, 
  'projectId' text, 
  'longitude' text DEFAULT NULL,
  'latitude' text DEFAULT NULL,
  'phone' text,
  'locationType' text,
  'locationTypeText' text,
  'stageName' text,
  'lagAddDataStatus' text,
  'warnAddDataStatus' text,
  'warnStatus' text,
  'stage' text,
  'currentProgress' text,
  'padStatus' text DEFAULT 'default',
  'isPadDelete' text DEFAULT '0',
  'status' text,
  'updatedDate' text DEFAULT NULL
);
`

// 需要更新的字段定义 和 字段赋值
export const landlordHasStatusFields = `'uid','id','name','type','sex','card','doorNo','villageCode','virutalVillageCode','address','projectId','longitude','latitude','phone','locationType','locationTypeText','stageName','lagAddDataStatus','warnAddDataStatus','warnStatus','stage','currentProgress','padStatus','isPadDelete' ,'status','updatedDate' `
// status 字段为 当前数据是否有变更的状态
export const getLandlordHasStatusValues = (item: LandlordHasStatusType, status: 'default' | 'modify') =>
  `'${item.uid}','${item.id}','${item.name}','${item.type}','${item.sex}','${item.card}','${item.doorNo}','${item.villageCode}','${item.virutalVillageCode}','${item.address}','${item.projectId}','${item.longitude}','${item.latitude}','${item.phone}','${item.locationType}','${item.locationTypeText}','${item.stageName}','${item.lagAddDataStatus}','${item.warnAddDataStatus}','${item.warnStatus }','${item.stage}','${item.currentProgress}','${item.padStatus}','${item.isPadDelete}','${item.status}','${getCurrentTimeStamp()}'`

// 获取 更新的sql值
export const getLandlordHasStatusSqlValues = (data: LandlordHasStatusType) =>
  `padStatus = 'modify',name = '${data.name}',type = '${data.type}',sex = '${data.sex}',card = '${
    data.card
  }',doorNo = '${data.doorNo}',villageCode = '${data.villageCode}',virutalVillageCode = '${
    data.virutalVillageCode
  }',address = '${data.address}',projectId = '${data.projectId}',longitude = '${
    data.longitude
  }',latitude = '${data.latitude}',phone = '${data.phone}',locationType = '${
    data.locationType
  }',locationTypeText = '${
    data.locationTypeText
  }',stageName = '${data.stageName}',lagAddDataStatus = '${
    data.lagAddDataStatus || ''
  }',warnAddDataStatus = '${data.warnAddDataStatus}',warnStatus = '${data.warnStatus }',stage = '${data.stage}',currentProgress = '${data.currentProgress}',isPadDelete = '${data.isPadDelete}',updatedDate = '${getCurrentTimeStamp()}'`
