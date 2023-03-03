/**
 * 业主表字段定义
 */

import { MainType, ReportStatusEnum } from '@/types/common'

export interface LandlordDDLType {
  uid: string
  content: string
  name: string
  type: MainType
  reportStatus: ReportStatusEnum
  reportDate: string
  reportUser: string
  villageCode: string
  status: 'modify' | 'default'
  isDelete: '0' | '1'
  updatedDate: string
}

export const LandlordTableName = 'landlord'

export const LandlordDDL = `
create table if not exists ${LandlordTableName} (
  'uid' text PRIMARY KEY,
  'name' text,
  'type' text,
  'reportStatus' text,
  'reportDate' text,
  'reportUser' text,
  'content' text,
  'villageCode' text,
  'status' text,
  'isDelete' text,
  'updatedDate' text DEFAULT NULL
);
`
