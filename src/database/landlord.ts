/**
 * 农户表字段定义
 */

export interface LandlordDDLType {
  uid: string
  content: string
  status: 'modify' | 'default'
  isDelete: '0' | '1'
  updatedDate: string
}

export const LandlordTableName = 'landlord'

export const LandlordDDL = `
create table if not exists ${LandlordTableName} (
  'uid' text PRIMARY KEY,
  'content' text,
  'status' text,
  'isDelete' text,
  'updatedDate' text DEFAULT NULL
);
`
