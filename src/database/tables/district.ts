/**
 * 市/区/行政村 表字段定义
 */

export interface DistrictDDLType {
  parentCode: string
  content: string
  updatedDate: string
}

export const DistrictTableName = 'district'

export const DistrictDDL = `
create table if not exists ${DistrictTableName} (
  'content' text,
  'parentCode' text PRIMARY KEY,
  'updatedDate' text DEFAULT NULL
);
`
