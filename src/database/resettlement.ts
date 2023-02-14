/**
 * 安置意愿配置表字段定义
 */

export interface ResettlementDDLType {
  id: number
  content: string
  updatedDate: string
}

export const ResettlementTableName = 'resettlement'

export const ResettlementDDL = `
create table if not exists ${ResettlementTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
