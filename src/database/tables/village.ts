/**
 * 自然村 表字段定义
 */

export interface VillageDDLType {
  uid: string
  parentCode: string
  name: string
  content: string
  updatedDate: string
  isPadDelete: '0' | '1'
  padStatus: 'modify' | 'default'
}

export const VillageTableName = 'village'

export const VillageDDL = `
create table if not exists ${VillageTableName} (
  'uid' text PRIMARY KEY,
  'padStatus' text,
  'content' text,
  'parentCode' text,
  'isPadDelete' text,
  'name' text,
  'updatedDate' text DEFAULT NULL
);
`
