/**
 * 坟墓 表字段定义
 */

export interface GraveDDLType {
  uid: string

  registrantId: number // 居民户id
  registrantDoorNo: string // 居民户户号

  villageId: number // 村集体id
  villageDoorNo: string // 村集体户号

  content: string
  updatedDate: string
  isDelete: '0' | '1'
  status: 'modify' | 'default'
}

export const GraveTableName = 'grave'

export const GraveDDL = `
create table if not exists ${GraveTableName} (
  'registrantId' INTEGER,
  'registrantDoorNo' text,
  'villageId' INTEGER,
  'villageDoorNo' text,
  'uid' text,
  'content' text,
  'isDelete' text,
  'status' text,
  'updatedDate' text DEFAULT NULL
);
`
