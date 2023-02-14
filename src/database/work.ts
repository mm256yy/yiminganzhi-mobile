/**
 * 统计表字段定义
 */

export interface WorkDDLType {
  id: number
  content: string
  updatedDate: string
}

export const WorkTableName = 'work'

export const WorkDDL = `
create table if not exists ${WorkTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
