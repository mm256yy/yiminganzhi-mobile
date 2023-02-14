/**
 * 统计表字段定义
 */

export interface CollectDDLType {
  id: number
  content: string
  updatedDate: string
}

export const CollectTableName = 'collect'

export const CollectDDL = `
create table if not exists ${CollectTableName} (
  'id' INTEGER PRIMARY KEY AUTOINCREMENT,
  'content' text,
  'updatedDate' text DEFAULT NULL
);
`
