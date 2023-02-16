/**
 * 自然村 表字段定义
 */

export interface VillageDDLType {
  uid: string
  parentCode: string
  content: string
  updatedDate: string
  status: string
}

export const VillageTableName = 'village'

export const VillageDDL = `
create table if not exists ${VillageTableName} (
  'uid' text PRIMARY KEY,
  'status' text,
  'content' text,
  'parentCode' text,
  'updatedDate' text DEFAULT NULL
);
`
