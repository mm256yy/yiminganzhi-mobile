/**
 * 业主表字段定义
 */

import { MainType, ReportStatusEnum } from '@/types/common'
import { LandlordType } from '@/types/sync'
import { getCurrentTimeStamp } from '@/utils'
import dayjs from 'dayjs'

export interface LandlordDDLType {
  uid: string
  id: number
  content: string
  name: string
  doorNo: string
  type: MainType
  reportStatus: ReportStatusEnum
  reportDate: string
  reportUser: string
  areaCode: string
  townCode: string
  villageCode: string
  virutalVillageCode: string
  longitude: string | number
  latitude: string | number
  card: string
  status: 'modify' | 'default'
  isDelete: '0' | '1'
  updatedDate: string
}

export const LandlordTableName = 'landlord'

export const LandlordDDL = `
create table if not exists ${LandlordTableName} (
  'uid' text PRIMARY KEY,
  'id' INTEGER DEFAULT NULL,
  'name' text,
  'doorNo' text,
  'type' text,
  'reportStatus' text,
  'reportDate' text,
  'reportUser' text,
  'content' text,
  'areaCode' text,
  'townCode' text,
  'villageCode' text,
  'virutalVillageCode' text,
  'longitude' text DEFAULT NULL,
  'latitude' text DEFAULT NULL,
  'card' text,
  'status' text,
  'isDelete' text,
  'updatedDate' text DEFAULT NULL
);
`

// 需要更新的字段定义 和 字段赋值
export const landlordFields = `'uid','id','status','doorNo','type','name','reportStatus','reportDate','reportUser','areaCode','townCode','villageCode','virutalVillageCode','content','longitude','latitude','card','updatedDate','isDelete'`
export const getLandlordValues = (item: LandlordType) =>
  `'${item.uid}','${item.id || null}','${item.status}','${item.doorNo}','${item.type}','${
    item.name
  }','${item.reportStatus}','${
    item.reportDate ? dayjs(item.reportDate).format('YYYY-MM-DD HH:mm:ss') : ''
  }','${item.reportUser}','${item.areaCode}','${item.townCode}','${item.villageCode}','${
    item.virutalVillageCode
  }','${JSON.stringify(item)}','${item.longitude || ''}','${item.latitude || ''}','${
    item.card
  }','${getCurrentTimeStamp()}','0'`

// 获取 更新的sql值
export const getLandlordSqlValues = (data: LandlordType) =>
  `status = 'modify',type = '${data.type}',name = '${data.name}',doorNo = '${
    data.doorNo
  }',reportStatus = '${data.reportStatus}',reportDate = '${data.reportDate}',reportUser = '${
    data.reportUser
  }',areaCode = '${data.areaCode}',townCode = '${data.townCode}',villageCode = '${
    data.villageCode
  }',virutalVillageCode = '${data.virutalVillageCode || ''}',content = '${JSON.stringify(
    data
  )}',longitude = '${data.longitude || ''}',latitude = '${data.latitude || ''}',card = '${
    data.card
  }',updatedDate = '${getCurrentTimeStamp()}'`
