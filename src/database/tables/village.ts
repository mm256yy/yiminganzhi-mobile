/**
 * 自然村 表字段定义
 */

export interface VillageDDLType {
  uid: string
  parentCode: string
  name: string
  content: string
  updatedDate: string
  isDelete: '0' | '1'
  status: 'modify' | 'default'
}

export const VillageTableName = 'village'

export const VillageDDL = `
create table if not exists ${VillageTableName} (
  'uid' text PRIMARY KEY,
  'status' text,
  'content' text,
  'parentCode' text,
  'isDelete' text,
  'name' text,
  'updatedDate' text DEFAULT NULL
);
`
