/**
 * 自然村 表字段定义
 */

export interface VillageDDLType {
  parentCode: string
  content: string
  updatedDate: string
}

export const VillageTableName = 'village'

export const VillageDDL = `
create table if not exists ${VillageTableName} (
  'content' text,
  'parentCode' text PRIMARY KEY,
  'updatedDate' text DEFAULT NULL
);
`
