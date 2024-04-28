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
  reportUserDate: string
  reportUser: string
  reportUserName:string
  reviewReportStatus:ReportStatusEnum
  reviewReportDate: string
  reviewReportUser: string
  areaCode: string
  townCode: string
  villageCode: string

  warnStatus: string // 预警状态
  currentProgress: string // 当前进程 1资格认定 2资产评估 3安置确认 4择址确认 5腾空过度 6动迁协议 7搬迁安置 8生产安置 9已完成

  virutalVillageCode: string
  longitude: string | number
  latitude: string | number
  card: string
  padStatus: 'modify' | 'default'
  isPadDelete: '0' | '1'
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
  'reportUserDate' text,
  'reportUser' text,
  'reportUserName' text,
  'reviewReportStatus' text,
  'reviewReportDate' text,
  'reviewReportUser' text,
  'signStatus' text,
  'signDate' text,
  'content' text,
  'areaCode' text,
  'townCode' text,
  'villageCode' text,
  'warnStatus' text,
  'currentProgress' text,
  'virutalVillageCode' text,
  'longitude' text DEFAULT NULL,
  'latitude' text DEFAULT NULL,
  'card' text,
  'padStatus' text DEFAULT 'default',
  'isPadDelete' text DEFAULT '0',
  'updatedDate' text DEFAULT NULL,
  'houseAllStatus' text,
  'isDelete' text DEFAULT '0',
  'placementWay' text
);
`

// 需要更新的字段定义 和 字段赋值
export const landlordFields = `'uid','id','padStatus','doorNo','type','name','reportStatus','reportDate','reportUserDate','reportUser','reportUserName','reviewReportStatus','reviewReportDate','reviewReportUser','signStatus','signDate','areaCode','townCode','villageCode','warnStatus','currentProgress','virutalVillageCode','content','longitude','latitude','card','updatedDate','isPadDelete','houseAllStatus','isDelete'`
// status 字段为 当前数据是否有变更的状态
export const getLandlordValues = (item: LandlordType, status: 'default' | 'modify') =>
  `'${item.uid}','${item.id || null}','${status}','${item.doorNo}','${item.type}','${item.name}','${
    item.reportStatus
  }','${item.reportDate ? dayjs(item.reportDate).format('YYYY-MM-DD HH:mm:ss') : ''}','${item.reportUserDate ? dayjs(item.reportUserDate).format('YYYY-MM-DD HH:mm:ss') : ''}','${
    item.reportUser
  }','${
    item.reportUserName
  }','${
    item.reviewReportStatus
  }','${item.reviewReportDate ? dayjs(item.reviewReportDate).format('YYYY-MM-DD HH:mm:ss') : ''}','${
    item.reviewReportUser
  }','${item.signStatus}','${
    item.signDate ? dayjs(item.signDate).format('YYYY-MM-DD HH:mm:ss') : ''
  }','${item.areaCode}','${item.townCode}','${item.villageCode}','${item.warnStatus}','${
    item.currentProgress
  }','${item.virutalVillageCode}','${JSON.stringify(item)}','${item.longitude || ''}','${
    item.latitude || ''
  }','${item.card}','${getCurrentTimeStamp()}','0','${item.houseAllStatus}','${item.isDelete}'`

// 获取 更新的sql值
export const getLandlordSqlValues = (data: LandlordType) =>
  `padStatus = 'modify',type = '${data.type}',name = '${data.name}',doorNo = '${
    data.doorNo
  }',reportStatus = '${data.reportStatus}',reportDate = '${data.reportDate}',reportUserDate = '${data.reportUserDate}',reportUser = '${
    data.reportUser
  }',reportUserName = '${
    data.reportUserName
  }',reviewReportStatus = '${data.reviewReportStatus}',reviewReportDate = '${data.reviewReportDate}',reviewReportUser = '${
    data.reviewReportUser
  }',signStatus = '${data.signStatus}',signDate = '${data.signDate}',areaCode = '${
    data.areaCode
  }',townCode = '${data.townCode}',villageCode = '${data.villageCode}',warnStatus = '${
    data.warnStatus
  }',currentProgress = '${data.currentProgress}',virutalVillageCode = '${
    data.virutalVillageCode || ''
  }',content = '${JSON.stringify(data)}',longitude = '${data.longitude || ''}',latitude = '${
    data.latitude || ''
  }',card = '${data.card}',placementWay= '${
    data.placementWay
  }',updatedDate = '${getCurrentTimeStamp()}',houseAllStatus = '${
    data.houseAllStatus
  }',isDelete = '${data.isDelete}'`
