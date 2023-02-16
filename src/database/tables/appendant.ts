/**
 * 附属物 表字段定义
 */

export interface AppendantDDLType {
  id: number
  content: string
  updatedDate: string
}

export const AppendantTableName = 'appendant'

export const AppendantDDL = `
create table if not exists ${AppendantTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
